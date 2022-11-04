import axios from 'axios'
import { cloneDeep, set } from 'lodash'
import { Column, ColumnEditorOptions } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import React, { useCallback, useEffect, useState } from 'react'
import SortableList from 'react-easy-sort'
import { BASE_URL } from 'src/api/ApiConfig'
import { numberEditor, textEditor } from 'src/hooks/data-table-hooks/EditorHooks'
import { Product, StockInfo, TradeInfo } from 'src/types/product-manage'
import { sellShopSelectTemplate } from '../../../../hooks/dropdown/ValueTemplate'
import { ecommerceList } from '../ProductManageList'
import ContentHeader from './ContentHeader'
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

function ProductDialog(props: Props) {
    const { open, pk, onClose } = props
    const [tabId, setTabId] = useState<TabId>('EXPAND')
    const [productList, setProductList] = useState<Product[]>([])
    const [tradeInfo, setTradeInfo] = useState<TradeInfo>(initTradeInfo)
    const [stockInfo, setStockInfo] = useState<StockInfo>(initStockInfo)
    // const [jetObj, setJetObj] = useState<JetObjType>()

    const onClickListView = () => {
        setTabId('LIST')
    }

    const onClickExpandView = () => {
        setTabId('EXPAND')
    }

    const onChangeTradeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTradeInfo((prev) => set(cloneDeep(prev), event.target.name, event.target.value))
    }

    const onChangeStockInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStockInfo((prev) => set(cloneDeep(prev), event.target.name, event.target.value))
    }

    const fakeHeaderInfo = {
        manager: '안영근',
        createAt: '2021-12-06 16:08:50',
        title: '로지 토끼 슬리퍼',
    }

    const onClickAddBtn = () => {
        setProductList((prev) =>
            prev.concat([
                {
                    pk: '',
                    productId: '',
                    productName: '',
                    sellerPk: '',
                    sellerName: '',
                    marketId: '',
                    marketName: '',
                    memo: '',
                    attrs: [],
                    items: [],
                },
            ])
        )
    }

    const ModalHeader = () => {
        return (
            <div className="flex justify-between items-center p-0">
                <span></span>
                <div className="flex items-center space-x-2">
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">제트입고요청</button>
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">발주요청</button>
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">저장</button>
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]" onClick={onClose}>
                        닫기
                    </button>
                </div>
            </div>
        )
    }

    const sellShopBodyTemplate = (rowData: any, option?: any) => {
        return <Dropdown className="w-full border-none mt-1" value={rowData.sellShop} options={ecommerceList} valueTemplate={sellShopSelectTemplate(rowData.sellShop)} itemTemplate={sellShopSelectTemplate} />
    }

    const rowReorder = (event: any) => {
        setProductList(event.value)
    }

    const loadProduct = useCallback(async () => {
        try {
            if (pk !== '') {
                const { data } = await axios.get(BASE_URL + 'products/' + pk)
                console.log(data)
            }
        } catch (err) {}
    }, [pk])

    useEffect(() => {
        loadProduct()
    }, [loadProduct, pk])

    return (
        <Dialog header={ModalHeader} visible={open} onHide={onClose} className="max-w-[1500px] w-full min-w-[500px] h-full" closable={false}>
            <div className="h-full">
                <ContentHeader manager={fakeHeaderInfo.manager} createdAt={fakeHeaderInfo.createAt} title={fakeHeaderInfo.title} />
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
                                {productList.map((product, idx) => (
                                    <ManageListItem key={idx} />
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
                    <div className="flex flex-col">
                        <DataTable value={productList} onRowReorder={rowReorder} className="border-t-4 border-t-[#0D3157] border h-[60vh]">
                            <Column align="center" rowReorder headerStyle={{ width: '10px' }} />
                            <Column align="center" selectionMode="multiple" selectionAriaLabel="id" headerStyle={{ width: '10px' }} field="id"></Column>
                            <Column align="center" className="text-[12px]" field="seller" header="판매사" />
                            <Column align="center" className="text-[12px]" field="sellShop" header="판매처" headerStyle={{ width: '130px' }} body={sellShopBodyTemplate} />
                            <Column align="center" className="text-[12px]" field="productCode" header="상품코드" editor />
                            <Column align="center" className="text-[12px]" field="optionId" header="옵션ID" editor={(options: ColumnEditorOptions) => textEditor(options)} />
                            <Column align="center" className="text-[12px]" field="options.0" header="옵션1" editor={(options: ColumnEditorOptions) => textEditor(options)} />
                            <Column align="center" className="text-[12px]" field="options.1" header="옵션2" editor={(options: ColumnEditorOptions) => textEditor(options)} />
                            <Column align="center" className="text-[12px]" field="stock" header="창고재고량" editor={(options: ColumnEditorOptions) => numberEditor(options)} />
                            <Column align="center" className="text-[12px]" field="usableStock" header="가용재고량" editor={(options: ColumnEditorOptions) => numberEditor(options)} />
                            <Column align="center" className="text-[12px]" field="coupangStock" header="쿠팡창고재고량" editor={(options: ColumnEditorOptions) => numberEditor(options)} />
                            {/* <Column align="center" className="text-[12px]" field="zetRequestStock" header="제트배송-입고요청수량" body={jetQtyBodyTemplate} /> */}
                            <Column align="center" className="text-[12px]" field="purchaseStock" header="발주(매입)수량" />
                        </DataTable>

                        {/* <ListViewSupplierInfo /> */}
                        {/* <ListViewDistributionInfo /> */}
                    </div>
                )}
            </div>
        </Dialog>
    )
}

export default ProductDialog
