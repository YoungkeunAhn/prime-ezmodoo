import { Dialog } from 'primereact/dialog'
import { DropdownChangeParams } from 'primereact/dropdown'
import { InputNumberChangeParams } from 'primereact/inputnumber'
import React, { useState, useEffect, useCallback } from 'react'
import OrderTableRow from 'src/components/order/manage/dialog/OrderTableRow'
import { ITrade, IVendor, ProductsGruop } from 'src/types/product-manage'
import ContentHeader from './ContentHeader'
import OrderDetailListItem from './list-item-box/OrderProductsItem'
import VendorInfoTable from 'src/components/product/manage/dialog/expend-view/VendorInfoTable'
import TradeInfoTable from 'src/components/product/manage/dialog/expend-view/StockInfoTable'
import axios from 'axios'
import { BASE_URL } from 'src/api/ApiConfig'

type TabId = 'EXPAND' | 'LIST'

const creditInfoOptions = [
    {
        label: '선택',
        value: '',
    },
    {
        label: '업체확인중',
        value: '1',
    },
    {
        label: '재고없음',
        value: '2',
    },
    {
        label: '연락안됨',
        value: '3',
    },
    {
        label: '결제완료',
        value: '4',
    },
]

const deliverInfoOptions = [
    {
        label: '선택',
        value: '',
    },
    {
        label: '결제예정 - 일반제품',
        value: '1',
    },
    {
        label: '결제예정 - 의류제품',
        value: '2',
    },
    {
        label: '결제예정 - 샘플',
        value: '3',
    },
    {
        label: '결제완료 - 일반제품',
        value: '4',
    },
    {
        label: '결제완료 - 의류제품',
        value: '5',
    },
    {
        label: '결제완료 - 샘플',
        value: '6',
    },
    {
        label: '중국창고',
        value: '7',
    },
    {
        label: '마린창고',
        value: '8',
    },
    {
        label: '청도창고',
        value: '9',
    },
    {
        label: '심천창고',
        value: '10',
    },
    {
        label: '석도항',
        value: '11',
    },
    {
        label: '인천항',
        value: '12',
    },
    {
        label: '입고예정',
        value: '13',
    },
    {
        label: '본사도착',
        value: '14',
    },
]

const comePlaceOptions = [
    {
        label: '선택',
        value: '',
    },
    {
        label: '심천',
        value: '1',
    },
    {
        label: '광저우',
        value: '2',
    },
    {
        label: '통관',
        value: '3',
    },
    {
        label: '이우',
        value: '4',
    },
    {
        label: '배대지',
        value: '5',
    },
]

const pakingStateOptions = [
    {
        label: '선택',
        value: '',
    },
    {
        label: '파렛트',
        value: 'palette',
    },
    {
        label: '박스',
        value: 'box',
    },
]

const fakeHeaderInfo = {
    manager: '안영근',
    createAt: '2021-12-06 16:08:50',
    title: '로지 토끼 슬리퍼',
}

const initVendor: IVendor = {
    company: {
        address: '',
        bizId: '',
        faxNo: '',
        name: '',
        telNo: '',
    },
    linkUrls: ['', ''],
    officer: {
        email: '',
        name: '',
    },
}
const initTrade: ITrade = {
    cbm: 0,
    enSkuMaterial: '',
    enSkuName: '',
    gwt: 0,
    lwh: {
        height: 0,
        length: 0,
        width: 0,
    },
    nwt: 0,
    qtyPerBox: 0,
    boxPerPalette: 10,
    tariffRate: 0,
}

const initOrder = {
    orderDate: '',
    orderQty: 0,
    creditDate: '',
    totalCost: null,
    creditInfo: '',
    deliverInfo: '',
    arrivalDate: '',
    postDate: '',

    comePlace: '',
    deliveryCharge: null,
    deleveryNumberInfo: '',

    orderNumber: '',
    pakingState: '',
    mdMemo: '',
    tradeMemo: '',
}

const productsGroup: ProductsGruop[] = [
    {
        pk: '1234',
        createdAt: '2023-02-14',
        deletedAt: '',
        isDeleted: false,
        isVisible: true,
        isSales: true,

        managerName: '테스트',
        managerId: '',
        managerPk: '',
        productsCode: '',
        productsId: '',
        productsLinkUrls: ['', ''],
        productImageUrl: '',
        productsName: '로지토끼슬리퍼',
        products: [
            {
                pk: 'p1234',
                productId: '',
                productName: '로지토끼슬리퍼',
                sellerPk: '',
                sellerName: '아이마마',
                marketId: '',
                marketName: '쿠팡-로켓',
                attrs: [],
                items: [
                    {
                        cnItemName: '',
                        commissionRate: 10,
                        couponPrice: 1000,
                        deliveryCharge: 0,
                        isDeleted: false,
                        isVisible: true,
                        itemDetails: [],
                        itemId: '24234',
                        itemImageUrls: ['http://api.ezmodoo.com/files/63d8a7702c85d_d6a32f9149ba68b7_1617bbfc4af261cb31de93e76a5f7b1dc93f9c5c_jpg'],
                        itemName: '',
                        itemOptions: ['노랑', '라지'],
                        marketBarcode: '23423423423',
                        marketQrcode: '',
                        marketSkuId: '234234234',
                        memo: '',
                        optionalCharge: 0,
                        pk: '63e9d511649513298e0bd4b9',
                        salePrice: 10000,
                        sellPrice: 0,
                        stockQty: 0,
                        units: [
                            {
                                barcode: '',
                                enSkuMaterial: '',
                                enSkuName: '',
                                hscode: '',
                                memo: '',
                                pk: '63e9e86c649513298e0bd4bf',
                                qrcode: '',
                                skuAttr: {},
                                skuId: '',
                                skuName: '33333333333',
                                stock: { totalQty: 0, disusedQty: 0, availableQty: 0, locations: ['x-1-1', 'y-1-1', 'z-1-1'] },
                                createdAt: '2023-02-14',
                                image: '',
                                order: {
                                    lastReceiptDate: '',
                                    lastReceiptPrice: 0,
                                    lastReceiptQty: 0,
                                    totalReceiptPrice: 0,
                                },
                                skuCode: '',
                                trade: {
                                    cbm: 0,
                                    costPrice: 0,
                                    currencyCost: 12,
                                    currencyUnit: 'CNY',
                                    gwt: 0,
                                    hasBarcode: '',
                                    hasCarton: null,
                                    lwh: { width: 0, height: 0, length: 0 },
                                    nwt: 0,
                                    purchasePrice: 0,
                                    qtyPerBox: 0,
                                    receiptPeriod: 0,

                                    tariffCode: 'NFA1',
                                    tariffRate: 0,
                                    vendors: [],
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
]

type Props = {
    pk: string
    open: boolean
    onClose: () => void
    data?: any
}

function OrderProductItem(props: Props) {
    const { pk, open, onClose } = props
    const [orderInfo, setOrderInfo] = useState(initOrder)
    const [tradeInfo, setTradeInfo] = useState<ITrade>(initTrade)
    const [vendorInfo, setVendorInfo] = useState<IVendor>(initVendor)

    const onChangeOrderText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderInfo((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const onChangeOrderDropdown = (event: DropdownChangeParams) => {
        setOrderInfo((prev) => ({
            ...prev,
            [event.target.name]: event.value,
        }))
    }

    const onChangeOrderNumber = (event: InputNumberChangeParams) => {
        if (event.originalEvent.target.name === 'orderQty') {
        }
        setOrderInfo((prev) => ({
            ...prev,
            [event.originalEvent.target.name]: event.value,
        }))
    }

    const ModalHeader = () => {
        return (
            <div className="flex justify-between items-center p-0">
                <span></span>
                <div className="flex items-center space-x-2">
                    {/* <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">제트입고요청</button>
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">발주요청</button> */}
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">저장</button>
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]" onClick={onClose}>
                        닫기
                    </button>
                </div>
            </div>
        )
    }

    const getOrder = useCallback(async () => {
        try {
            const { data } = await axios.get(BASE_URL + 'orders/' + pk)

            if (data) {
                setOrderInfo(data.order)
                setTradeInfo(data.trade)
                setVendorInfo(data.vendor)
            }
        } catch (err) {
            console.error(err)
        }
    }, [pk])

    useEffect(() => {
        getOrder()
    }, [getOrder])

    return (
        <Dialog header={ModalHeader} visible={open} onHide={onClose} className="max-w-[1500px] w-full min-w-[500px]" closable={false}>
            <div className="flex space-x-2">
                <div className="">
                    <ContentHeader manager={fakeHeaderInfo.manager} createdAt={fakeHeaderInfo.createAt} title={fakeHeaderInfo.title} />

                    <div className="flex space-x-2">
                        <div className="flex flex-col">
                            <ul className="text-[12px] max-h-[42vh] overflow-y-auto manage-list border mt-2 py-2 p-1">
                                <OrderDetailListItem />
                                <OrderDetailListItem />
                                <OrderDetailListItem />
                            </ul>
                            <div className="grid grid-cols-2 mt-2 w-full gap-1">
                                <VendorInfoTable info={vendorInfo} onChange={() => {}} />
                                <TradeInfoTable info={tradeInfo} onChange={() => {}} />
                            </div>
                        </div>

                        <div className="text-sm flex flex-col mt-2 h-auto">
                            <div className="col-span-3 rounded-t-[10px] bg-[#146BCE] text-white flex justify-center items-center h-[32px]">
                                발주정보수정
                            </div>
                            <div className="grid grid-cols-3 border w-[450px] flex-1">
                                <OrderTableRow
                                    title="발주일자"
                                    type="date"
                                    name="orderDate"
                                    value={orderInfo.orderDate}
                                    onChange={onChangeOrderText}
                                />
                                <OrderTableRow
                                    title="발주수량"
                                    type="number"
                                    name="orderQty"
                                    numberValue={orderInfo.orderQty}
                                    onChange={onChangeOrderNumber}
                                    mark="ea"
                                    disabled
                                />
                                <OrderTableRow
                                    title={orderInfo.pakingState === 'palette' ? '파레트수량(총수량)' : '박스수량(총수량)'}
                                    type="text"
                                    name=""
                                    value={
                                        orderInfo.pakingState === 'palette'
                                            ? `${orderInfo.orderQty ?? 0 / tradeInfo.boxPerPalette / tradeInfo.qtyPerBox} (${
                                                  orderInfo.orderQty ?? ''
                                              })`
                                            : `${orderInfo.orderQty / tradeInfo.qtyPerBox} (${orderInfo.orderQty ?? ''})`
                                    }
                                    onChange={() => {}}
                                    disabled
                                    mark="ea"
                                />

                                <OrderTableRow
                                    title="중국내륙운송비"
                                    type="number"
                                    name="deliveryCharge"
                                    numberValue={orderInfo.deliveryCharge}
                                    onChange={onChangeOrderNumber}
                                    currencySymbol="￥"
                                />
                                <OrderTableRow
                                    title="구매총금액"
                                    type="number"
                                    name="totalCost"
                                    numberValue={orderInfo.totalCost}
                                    onChange={onChangeOrderNumber}
                                    currencySymbol="￥"
                                    digitLength={2}
                                    disabled
                                />
                                <OrderTableRow
                                    title="결제일"
                                    type="date"
                                    name="creditDate"
                                    value={orderInfo.creditDate}
                                    onChange={onChangeOrderText}
                                />
                                <OrderTableRow
                                    title="결제정보"
                                    type="dropdown"
                                    name="creditInfo"
                                    value={orderInfo.creditInfo}
                                    onChange={onChangeOrderDropdown}
                                    options={creditInfoOptions}
                                />
                                <OrderTableRow
                                    title="배송정보"
                                    type="dropdown"
                                    name="deliverInfo"
                                    value={orderInfo.deliverInfo}
                                    onChange={onChangeOrderDropdown}
                                    options={deliverInfoOptions}
                                />

                                <OrderTableRow
                                    title="본사도착예정일"
                                    type="date"
                                    name="arrivalDate"
                                    value={orderInfo.arrivalDate}
                                    onChange={onChangeOrderText}
                                />
                                <OrderTableRow
                                    title="공장출고예정일"
                                    type="date"
                                    name="postDate"
                                    value={orderInfo.postDate}
                                    onChange={onChangeOrderText}
                                />

                                <OrderTableRow
                                    title="중국입고장소"
                                    type="dropdown"
                                    name="comePlace"
                                    value={orderInfo.comePlace}
                                    onChange={onChangeOrderDropdown}
                                    options={comePlaceOptions}
                                />

                                <OrderTableRow
                                    title="운송장번호"
                                    type="text"
                                    name="deleveryNumberInfo"
                                    value={orderInfo.deleveryNumberInfo}
                                    onChange={onChangeOrderText}
                                />
                                <OrderTableRow
                                    title="주문번호"
                                    type="text"
                                    name="orderNumber"
                                    value={orderInfo.orderNumber}
                                    onChange={onChangeOrderText}
                                />
                                <OrderTableRow
                                    title="패킹상태"
                                    type="dropdown"
                                    name="pakingState"
                                    value={orderInfo.pakingState}
                                    onChange={onChangeOrderDropdown}
                                    options={pakingStateOptions}
                                />

                                <OrderTableRow title="MD메모" type="textarea" name="mdMemo" value={orderInfo.mdMemo} onChange={onChangeOrderText} />
                                <OrderTableRow
                                    title="무역메모"
                                    type="textarea"
                                    name="tradeMemo"
                                    value={orderInfo.tradeMemo}
                                    onChange={onChangeOrderText}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default OrderProductItem
