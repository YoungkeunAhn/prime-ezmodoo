import axios from 'axios'
import { cloneDeep, findIndex, flatten, map, set, xor } from 'lodash'
import { DataTableRowReorderParams } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { DropdownChangeParams } from 'primereact/dropdown'
import React, { useCallback, useEffect, useState } from 'react'
import { BASE_URL } from 'src/api/ApiConfig'
import { ContentProductItem, HeaderInfo, ITrade, IVendor } from 'src/types/product-manage'
import ContentHeader from './ContentHeader'
import ProductExpandView from './expend-view/ProductExpandView'

import ProductListView from './list-view/ProductListView'

type TabId = 'EXPAND' | 'LIST'

type Props = {
    open: boolean
    pk?: string
    onClose: () => void
}

const initVendorInfo: IVendor = {
    company: {
        address: '',
        bizId: '',
        faxNo: '',
        name: '',
        telNo: '',
    },
    officer: {
        email: '',
        name: '',
    },
    memo: '',
    linkUrls: [],
}

const initTradeInfo: ITrade = {
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
    marketBarcode: '',
    marketSkuId: '',
    marketQrcode: '',
    itemId: '',
    itemImageUrls: [''],
    itemOptions: ['', ''],
    itemName: '',
    marketId: '',
    productName: '',
    productPk: '',
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
    file: File | string
}

function ProductDialog(props: Props) {
    const { open, pk, onClose } = props
    const [tabId, setTabId] = useState<TabId>('EXPAND')
    const [productItemList, setProductItemList] = useState<ContentProductItem[]>([initContentProductItem])
    const [vendorInfo, setVendorInfo] = useState<IVendor>(initVendorInfo)
    const [tradeInfo, setTradeInfo] = useState<ITrade>(initTradeInfo)
    const [headerInfo, setHeaderInfo] = useState<HeaderInfo>(initHeaderInfo)
    const [imageList, setImageList] = useState<Image[]>([])
    const [checkList, setCheckList] = useState<string[]>([])

    const closeModal = useCallback(() => {
        onClose()
        setHeaderInfo(initHeaderInfo)
        setProductItemList([initContentProductItem])
        setVendorInfo(initVendorInfo)
        setTradeInfo(initTradeInfo)
        setImageList([])
        setCheckList([])
    }, [onClose])

    const onClickListView = () => {
        setTabId('LIST')
    }

    const onClickExpandView = () => {
        setTabId('EXPAND')
    }

    const onClickAddBtn = () => {
        setProductItemList((prev) => prev.concat([initContentProductItem]))
    }

    const rowReorder = (event: DataTableRowReorderParams) => {
        setProductItemList(event.value)
    }

    const onChangeVendor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVendorInfo((prev) => set(cloneDeep(prev), event.target.name, event.target.value))
    }

    const onChangeTrade = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTradeInfo((prev) => set(cloneDeep(prev), event.target.name, event.target.value))
    }

    const onChangeHeaderInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeaderInfo((prev) => ({ ...prev, [event.target.name]: event.target.value }))
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

    const onChangeImage = (file: File | string, index: number) => {
        const foundIndex = findIndex(imageList, { index })
        if (foundIndex > -1) {
            setImageList((prev) => prev.map((obj, idx) => (idx === foundIndex ? { ...obj, file } : obj)))
        } else {
            setImageList((prev) => prev.concat({ index, file }))
        }

        if (typeof file !== 'string') {
            const imageUrl = URL.createObjectURL(file)
            setProductItemList((prev) => prev.map((item, idx) => (idx === index ? { ...item, itemImageUrls: [imageUrl] } : item)))
        } else {
            const image = new Image(100, 100)
            image.src = file
            image.onload = function () {
                if (image.complete) {
                    setProductItemList((prev) => prev.map((item, idx) => (idx === index ? { ...item, itemImageUrls: [file] } : item)))
                }
            }
            image.onerror = function () {
                alert('올바르지 않은 URL이거나 올바르지 않은 이미지 입니다.')
            }
        }
    }

    const onChangeOptionsInput = (event: React.ChangeEvent<HTMLInputElement>, index: number, optionIndex: number) => {
        console.log(event.target.value)
        setProductItemList((prev) =>
            prev.map((item, idx) =>
                idx === index
                    ? { ...item, itemOptions: item.itemOptions.map((option, idx) => (idx === optionIndex ? event.target.value : option)) }
                    : item
            )
        )
    }

    const onToggleCheckbox = (pk: string) => {
        setCheckList((prev) => xor(prev, [pk]))
    }

    const saveProductGroup = useCallback(async () => {
        try {
            const formData = new FormData()

            const data = {
                productItemList,
                headerInfo,
                vendorInfo: vendorInfo,
                tradeInfo: tradeInfo,
            }

            formData.append('data', JSON.stringify(data))
            imageList.forEach((image) => formData.append(image.index.toString(), image.file))

            if (pk) {
                await axios.post(BASE_URL + 'products?_method=PATCH', formData)
            } else {
                await axios.post(BASE_URL + 'products', formData)
            }

            alert('저장이 완료되었습니다.')

            closeModal()
        } catch (err) {
            console.error(err)
            alert('저장실패')
        }
    }, [closeModal, headerInfo, tradeInfo, vendorInfo, imageList, pk, productItemList])

    const deleteProduct = useCallback(async () => {
        try {
            if (checkList.length > 0) {
                // eslint-disable-next-line no-restricted-globals
                if (confirm('삭제하시겠습니까?')) {
                    await axios.post(BASE_URL + `products/${pk}?_method=DELETE`, checkList)
                }
            }

            alert('삭제되었습니다.')

            setProductItemList((prev) => prev.filter((it) => !checkList.includes(it.pk)))
        } catch (err) {
            console.error(err)
        }
    }, [pk, checkList])

    const loadProduct = useCallback(async () => {
        try {
            if (pk && pk !== '') {
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

                            return {
                                ...item,
                                itemImageUrls: [...item.itemImageUrls, item.itemImageUrls[0]],
                                productPk: pk,
                                productName,
                                sellerName,
                                marketId,
                                stockUnitId: skuId,
                                totalQty,
                                availableQty,
                                disusedQty,
                                reorderPeriod,
                                calcPrice,
                                profit,
                                profitRate,
                                purchasePrice,
                                hasBarcode,
                                hasCarton,
                            }
                        })
                    })
                )

                setProductItemList(productItems)
            }
        } catch (err) {}
    }, [pk])

    useEffect(() => {
        loadProduct()
    }, [loadProduct])

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
                    <button
                        style={{ lineHeight: '1.1rem' }}
                        className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]"
                        onClick={onClickAddBtn}
                    >
                        추가
                    </button>
                    <button
                        style={{ lineHeight: '1.1rem' }}
                        className="p-1.5 min-w-[60px] border border-[#707070] rounded text-[#A10C0C] text-[12px]"
                        onClick={deleteProduct}
                    >
                        삭제
                    </button>
                    <button style={{ lineHeight: '1.1rem' }} className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]">
                        복사
                    </button>
                    {pk && (
                        <>
                            <button
                                onClick={onClickExpandView}
                                style={{ lineHeight: '1.1rem' }}
                                className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]"
                            >
                                펼쳐보기
                            </button>
                            <button
                                onClick={onClickListView}
                                style={{ lineHeight: '1.1rem' }}
                                className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]"
                            >
                                리스트형식보기
                            </button>
                            <button
                                style={{ lineHeight: '1.1rem' }}
                                className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]"
                            >
                                <i className="fa-regular fa-eye-slash mr-1"></i>
                                <span>숨김처리</span>
                            </button>
                            <button
                                style={{ lineHeight: '1.1rem' }}
                                className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]"
                            >
                                <i className="fa-regular fa-eye mr-1"></i>
                                <span>모든옵션보기</span>
                            </button>
                        </>
                    )}
                </div>
                {tabId === 'EXPAND' && (
                    <ProductExpandView
                        checkList={checkList}
                        productItemList={productItemList}
                        vendorInfo={vendorInfo}
                        tradeInfo={tradeInfo}
                        onChangeVendor={onChangeVendor}
                        onChangeTrade={onChangeTrade}
                        onChangeCommissionRate={onChangeCommissionRate}
                        onChangeDeliveryCharge={onChangeDeliveryCharge}
                        onChangeDropdown={onChangeDropdown}
                        onChangeImage={onChangeImage}
                        onChangeProductItemText={onChangeProductItemText}
                        onChangePurchasePrice={onChangePurchasePrice}
                        onChangeSalePrice={onChangeSalePrice}
                        onToggleCheckbox={onToggleCheckbox}
                        onChangeOptionsInput={onChangeOptionsInput}
                    />
                )}
                {tabId === 'LIST' && (
                    <ProductListView
                        productItemList={productItemList}
                        checkList={checkList}
                        rowReorder={rowReorder}
                        onChangeDropdown={onChangeDropdown}
                        vendorInfo={vendorInfo}
                        tradeInfo={tradeInfo}
                        onChangeVendor={onChangeVendor}
                        onChangeTrade={onChangeTrade}
                        onToggleCheckbox={onToggleCheckbox}
                    />
                )}
            </div>
        </Dialog>
    )
}

export default ProductDialog
