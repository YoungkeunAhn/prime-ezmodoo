import axios from 'axios'
import _, { cloneDeep, find, findIndex, flatten, map, set } from 'lodash'
import { Column, ColumnEditorOptions } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import React, { useCallback, useEffect, useState } from 'react'
import SortableList from 'react-easy-sort'
import { BASE_URL } from 'src/api/ApiConfig'
import { numberEditor, textEditor } from 'src/hooks/data-table-hooks/EditorHooks'
import { ContentProductItem, HeaderInfo, StockInfo, TradeInfo } from 'src/types/product-manage'
import { marketTemplate } from '../../../../hooks/dropdown/ValueTemplate'
import { ecommerceList } from '../ProductManageList'
import ContentHeader from './ContentHeader'
import ListViewDistributionInfo from './ListViewDistributionInfo'
import ListViewSupplierInfo from './ListViewSupplierInfo'
import ManageListItem from './ManageListItem'
import StockInfoTable from './StockInfoTable'
import TradeInfoTable from './TradeInfoTable'

type TabId = 'EXPAND' | 'LIST'

type Props = {
    open: boolean
    pk?: string
    onClose: () => void
}

type JetObjType = Record<string, { productCode: string; qty: number }>

const initTradeInfo: TradeInfo = {
    company: {
        address: '',
        bizId: '',
        faxNo: '',
        name: '',
        telNo: '',
        stieUrl1: '',
        stieUrl2: '',
    },
    officer: {
        email: '',
        name: '',
    },
    memo: '',
}

const initStockInfo: StockInfo = {
    trade: {
        lwh: {
            width: 0,
            length: 0,
            height: 0,
        },
        cbm: 0,
        receiptPeriod: 0,
        gwt: 0,
        nwt: 0,
        qtyPerBox: 0,
        tariffRate: 0,
    },
    enSkuMaterial: '',
    enSkuName: '',
}

const initHeaderInfo: HeaderInfo = {
    managerName: '',
    createdAt: '',
    currencyCost: 0,
    applyExchangeRateCost: 0,
    productsName: '',
}

const initContentProductItem: ContentProductItem = {
    pk: '',
    barcode: '',
    skuId: '',
    itemId: '',
    itemImageUrls: [],
    itemOptions: [],
    itemName: '',
    marketId: '',
    productName: '',
    productPk: '',
    qrcode: '',
    sellerPk: '',
    sellerName: '',
    memo: '',
    salePrice: 0,
    sellPrice: 0,
    couponPrice: 0,
    commissionRate: 0,
    deliveryCharge: 0,
    optionalCharge: 0,
    calcPrice: 0,
    profit: 0,
    profitRate: 0,
    stockUnitId: '',
    stockQty: 0,
    totalQty: 0,
    availableQty: 0,
    disusedQty: 0,
    reorderPeriod: 0,
    purchasePrice: 0,
    hasBarcode: null,
    hasCarton: null,
    units: [],
}

type Image = {
    index: number
    file: File
}

function ProductDialog(props: Props) {
    const { open, pk, onClose } = props
    const [tabId, setTabId] = useState<TabId>('EXPAND')
    const [productItemList, setProductItemList] = useState<ContentProductItem[]>([initContentProductItem])
    const [tradeInfo, setTradeInfo] = useState<TradeInfo>(initTradeInfo)
    const [stockInfo, setStockInfo] = useState<StockInfo>(initStockInfo)
    const [headerInfo, setHeaderInfo] = useState<HeaderInfo>(initHeaderInfo)
    const [imageList, setImageList] = useState<Image[]>([])

    const closeModal = () => {
        onClose()
        setHeaderInfo(initHeaderInfo)
    }

    const onClickListView = () => {
        setTabId('LIST')
    }

    const onClickExpandView = () => {
        setTabId('EXPAND')
    }

    const onChangeTradeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTradeInfo((prev) => set(cloneDeep(prev), event.target.name, event.target.value))
        console.log(tradeInfo)
    }

    const onChangeStockInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStockInfo((prev) => set(cloneDeep(prev), event.target.name, event.target.value))
        console.log(stockInfo)
    }

    const onChangeHeaderInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeaderInfo((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const onChangeProductItemText = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setProductItemList(productItemList.map((item, idx) => (idx === index ? { ...item, [event.target.name]: event.target.value } : item)))
    }

    const onChangePurchasePrice = (value: number | null, index: number) => {
        if (value) {
            setProductItemList(
                productItemList.map((item, idx) =>
                    idx === index
                        ? {
                              ...item,
                              purchasePrice: value,
                              profit: Math.floor(item.calcPrice - value),
                              profitRate: (item.calcPrice - value) / item.salePrice,
                          }
                        : item
                )
            )
        }
    }

    const onChangeSalePrice = (value: number | null, index: number) => {
        if (value) {
            setProductItemList(
                productItemList.map((item, idx) =>
                    idx === index
                        ? {
                              ...item,
                              salePrice: value,
                              calcPrice: Math.floor((value * (100 - item.commissionRate)) / 100 - item.deliveryCharge),
                              profit: Math.floor((value * (100 - item.commissionRate)) / 100 - item.deliveryCharge - item.purchasePrice),
                              profitRate: Math.floor((value * (100 - item.commissionRate)) / 100 - item.deliveryCharge - item.purchasePrice) / value,
                          }
                        : item
                )
            )
        }
    }

    const onChangeDeliveryCharge = (value: number | null, index: number) => {
        if (value) {
            setProductItemList(
                productItemList.map((item, idx) =>
                    idx === index
                        ? {
                              ...item,
                              deliveryCharge: value,
                              calcPrice: (item.salePrice * (100 - item.commissionRate)) / 100 - value,
                              profit: (item.salePrice * (100 - item.commissionRate)) / 100 - value - item.purchasePrice,
                              profitRate: ((item.salePrice * (100 - item.commissionRate)) / 100 - value - item.purchasePrice) / item.salePrice,
                          }
                        : item
                )
            )
        }
    }

    const onChangeCommissionRate = (value: number | null, index: number) => {
        if (value) {
            setProductItemList(
                productItemList.map((item, idx) =>
                    idx === index
                        ? {
                              ...item,
                              commissionRate: value,
                              calcPrice: (item.salePrice * (100 - value)) / 100 - item.deliveryCharge,
                              profit: (item.salePrice * (100 - value)) / 100 - item.deliveryCharge - item.purchasePrice,
                              profitRate: ((item.salePrice * (100 - value)) / 100 - item.deliveryCharge - item.purchasePrice) / item.salePrice,
                          }
                        : item
                )
            )
        }
    }

    const onChangeDropdown = (event: DropdownChangeParams, index: number) => {
        setProductItemList(
            productItemList.map((item, idx) =>
                idx === index
                    ? {
                          ...item,
                          [event.target.name]: event.target.value,
                      }
                    : item
            )
        )
    }

    const onChangeImage = (file: File, index: number) => {
        const foundIndex = findIndex(imageList, { index })
        if (foundIndex > -1) {
            setImageList((prev) => prev.map((obj, idx) => (idx === foundIndex ? { ...obj, file } : obj)))
        } else {
            setImageList((prev) => prev.concat({ index, file }))
        }

        const imageUrl = URL.createObjectURL(file)
        setProductItemList((prev) => prev.map((item, idx) => (idx === index ? { ...item, itemImageUrls: [imageUrl] } : item)))
    }

    const onClickAddBtn = () => {
        setProductItemList((prev) => prev.concat([initContentProductItem]))
    }

    const sellShopBodyTemplate = (rowData: any, option?: any) => {
        return <Dropdown className="w-full border-none mt-1" value={rowData[option.field]} options={ecommerceList} valueTemplate={marketTemplate(rowData[option.field])} itemTemplate={marketTemplate} />
    }

    const rowReorder = (event: any) => {
        setProductItemList(event.value)
    }

    const saveProductGroup = async () => {
        try {
            const formData = new FormData()

            const data = {
                productItemList,
                headerInfo,
                tradeInfo,
                stockInfo,
            }

            formData.append('data', JSON.stringify(data))
            imageList.forEach((image) => formData.append(image.index.toString(), image.file))

            await axios.post(BASE_URL + 'products', formData)

            alert('저장이 완료되었습니다.')
        } catch (err) {
            console.error(err)
            alert('저장실패')
        }
    }

    const loadProduct = useCallback(async () => {
        try {
            if (pk !== '') {
                const { data } = await axios.get(BASE_URL + 'products/' + pk)

                const { managerName, createdAt, productsName } = data
                const currencyCost = data.products[0].items[0].units[0].trade.currencyCost
                const applyExchangeRateCost = currencyCost * 202

                setHeaderInfo({ managerName, createdAt, currencyCost, productsName, applyExchangeRateCost })

                const productItems = flatten(
                    map(data.products, function (product) {
                        return map(product.items, function (item) {
                            const { pk, productName, sellerName, marketId } = product
                            const { skuId } = item.units[0]
                            const { totalQty, availableQty, disusedQty } = item.units[0].stock
                            const { reorderPeriod, purchasePrice, hasBarcode, hasCarton } = item.units[0].trade

                            const calcPrice = Math.floor((item.salePrice / 100) * (100 - item.commissionRate) - item.deliveryCharge)
                            const profit = Math.floor(calcPrice - purchasePrice)
                            const profitRate = profit / item.salePrice

                            return { ...item, productPk: pk, productName, sellerName, marketId, stockUnitId: skuId, totalQty, availableQty, disusedQty, reorderPeriod, calcPrice, profit, profitRate, purchasePrice, hasBarcode, hasCarton }
                        })
                    })
                )

                setProductItemList(productItems)
            }
        } catch (err) {}
    }, [pk])

    useEffect(() => {
        loadProduct()
    }, [loadProduct, pk])

    const ModalHeader = () => {
        return (
            <div className="flex justify-between items-center p-0">
                <span></span>
                <div className="flex items-center space-x-2">
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">제트입고요청</button>
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">발주요청</button>
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]" onClick={saveProductGroup}>
                        저장
                    </button>
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]" onClick={closeModal}>
                        닫기
                    </button>
                </div>
            </div>
        )
    }

    return (
        <Dialog header={ModalHeader} visible={open} onHide={closeModal} className="max-w-[1500px] w-full min-w-[500px] h-full" closable={false}>
            <div className="h-full">
                <ContentHeader data={headerInfo} onChange={onChangeHeaderInfo} />
                <div className="flex items-center p-1 space-x-2">
                    <button className="px-1.5 border border-[#707070] rounded text-[#707070]">
                        <i className="pi pi-angle-double-down text-[10px]" />
                    </button>
                    <button className="px-1.5 border border-[#707070] rounded text-[#707070]">
                        <i className="pi pi-angle-down text-[10px]" />
                    </button>
                    <button className="px-1.5 border border-[#707070] rounded text-[#707070]">
                        <i className="pi pi-angle-double-up text-[10px]" />
                    </button>
                    <button className="px-1.5 border border-[#707070] rounded text-[#707070]">
                        <i className="pi pi-angle-up text-[10px]" />
                    </button>
                    <button style={{ lineHeight: '1.1rem' }} className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]" onClick={onClickAddBtn}>
                        추가
                    </button>
                    <button style={{ lineHeight: '1.1rem' }} className="p-1.5 min-w-[60px] border border-[#707070] rounded text-[#A10C0C] text-[12px] ">
                        삭제
                    </button>
                    <button style={{ lineHeight: '1.1rem' }} className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]">
                        복사
                    </button>
                    {pk && (
                        <>
                            <button onClick={onClickExpandView} style={{ lineHeight: '1.1rem' }} className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]">
                                펼쳐보기
                            </button>
                            <button onClick={onClickListView} style={{ lineHeight: '1.1rem' }} className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]">
                                리스트형식보기
                            </button>
                            <button style={{ lineHeight: '1.1rem' }} className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]">
                                <i className="fa-regular fa-eye-slash mr-1"></i>
                                <span>숨김처리</span>
                            </button>
                            <button style={{ lineHeight: '1.1rem' }} className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]">
                                <i className="fa-regular fa-eye mr-1"></i>
                                <span>모든옵션보기</span>
                            </button>
                        </>
                    )}
                </div>
                {tabId === 'EXPAND' && (
                    <div className="flex border-t-4 border-[#0D3157] h-auto">
                        <div className="min-w-[1050px]">
                            <SortableList onSortEnd={() => {}} draggedItemClassName="dragged" className="text-[12px] max-h-[76vh] overflow-y-auto manage-list">
                                {productItemList.map((productItem, idx) => (
                                    <ManageListItem
                                        key={idx}
                                        idx={idx}
                                        productItem={productItem}
                                        onChangeText={onChangeProductItemText}
                                        onChangePurchasePrice={onChangePurchasePrice}
                                        onChangeSalePrice={onChangeSalePrice}
                                        onChangeDeliveryCharge={onChangeDeliveryCharge}
                                        onChangeCommissionRate={onChangeCommissionRate}
                                        onChangeDropdown={onChangeDropdown}
                                        onChangeImage={onChangeImage}
                                    />
                                ))}
                            </SortableList>
                        </div>
                        <div className="ml-2 h-auto flex flex-col justify-between">
                            <div className="w-[400px]">
                                <TradeInfoTable info={tradeInfo} onChange={onChangeTradeInfo} />
                            </div>
                            <div className="w-[400px]">
                                <StockInfoTable info={stockInfo} onChange={onChangeStockInfo} />
                            </div>
                        </div>
                    </div>
                )}
                {tabId === 'LIST' && (
                    <div className="flex flex-col pb-2">
                        <DataTable value={productItemList} onRowReorder={rowReorder} className="border-t-4 border-t-[#0D3157] border h-[60vh]">
                            <Column align="center" rowReorder headerStyle={{ width: '10px' }} />
                            <Column align="center" selectionMode="multiple" selectionAriaLabel="id" headerStyle={{ width: '10px' }} field="id"></Column>
                            <Column align="center" className="text-[12px]" field="sellerName" header="판매사" />
                            <Column align="center" className="text-[12px]" field="marketId" header="판매처" headerStyle={{ width: '130px' }} body={sellShopBodyTemplate} />
                            <Column align="center" className="text-[12px]" field="stockUnitId" header="재고코드" editor />
                            <Column align="center" className="text-[12px]" field="itemId" header="옵션ID" editor={(options: ColumnEditorOptions) => textEditor(options)} />
                            <Column align="center" className="text-[12px]" field="itemOptions.0" header="옵션1" editor={(options: ColumnEditorOptions) => textEditor(options)} />
                            <Column align="center" className="text-[12px]" field="itemOptions.1" header="옵션2" editor={(options: ColumnEditorOptions) => textEditor(options)} />
                            <Column align="center" className="text-[12px]" field="totalQty" header="창고재고량" editor={(options: ColumnEditorOptions) => numberEditor(options)} />
                            <Column align="center" className="text-[12px]" field="availableQty" header="가용재고량" editor={(options: ColumnEditorOptions) => numberEditor(options)} />
                            <Column align="center" className="text-[12px]" field="stockQty" header="쿠팡창고재고량" editor={(options: ColumnEditorOptions) => numberEditor(options)} />
                            <Column align="center" className="text-[12px]" field="jetRequestStock" header="제트배송-입고요청수량" />
                            <Column align="center" className="text-[12px]" field="purchaseStock" header="발주(매입)수량" />
                        </DataTable>

                        <ListViewSupplierInfo />
                        <ListViewDistributionInfo />
                    </div>
                )}
            </div>
        </Dialog>
    )
}

export default ProductDialog
