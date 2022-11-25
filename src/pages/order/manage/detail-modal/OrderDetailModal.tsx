import { Dialog } from 'primereact/dialog'
import { DropdownChangeParams } from 'primereact/dropdown'
import { InputNumberChangeParams } from 'primereact/inputnumber'
import React, { useState } from 'react'
import OrderTableRow from 'src/components/order-manage/dialog/OrderTableRow'
import TradeInfoTable from 'src/components/product-manage/dialog/expend-view/StockInfoTable'
import VendorInfoTable from 'src/components/product-manage/dialog/expend-view/VendorInfoTable'
import { ITrade, IVendor } from 'src/types/product-manage'
import ContentHeader from './ContentHeader'
import OrderDetailListItem from '../../../../components/order-manage/list-item-box/OrderProductsItem'

type TabId = 'EXPAND' | 'LIST'

type Props = {
    open: boolean
    onClose: () => void
    data: any
}

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
        value: '1',
    },
    {
        label: '박스',
        value: '2',
    },
]

const fakeVendorInfo: IVendor = {
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
const fakeTradeInfo: ITrade = {
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
    receiptPeriod: 0,
    tariffRate: 0,
}

const fakeOrderInfo = {
    orderDate: '2022-11-22',
    orderQty: null,
    creditDate: '2022-11-22',
    totalCost: null,
    creditInfo: '',
    deliverInfo: '',
    arrivalDate: '2022-11-22',
    postDate: '2022-11-22',

    comePlace: '',
    deliveryCharge: null,
    deleveryNumberInfo: '',

    orderNumber: '',
    pakingState: '',
    mdMemo: '',
    tradeMemo: '',
}

function OrderProductItem(props: Props) {
    const { open, onClose } = props
    const [orderInfo, setOrderInfo] = useState(fakeOrderInfo)

    const fakeHeaderInfo = {
        manager: '안영근',
        createAt: '2021-12-06 16:08:50',
        title: '로지 토끼 슬리퍼',
    }

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
                                <VendorInfoTable info={fakeVendorInfo} onChange={() => {}} />
                                <TradeInfoTable info={fakeTradeInfo} onChange={() => {}} />
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
                                />
                                <OrderTableRow
                                    title="결제일"
                                    type="date"
                                    name="creditDate"
                                    value={orderInfo.creditDate}
                                    onChange={onChangeOrderText}
                                />

                                <OrderTableRow
                                    title="구매총금액"
                                    type="number"
                                    name="totalCost"
                                    numberValue={orderInfo.totalCost}
                                    onChange={onChangeOrderNumber}
                                    currencySymbol="￥"
                                    digitLength={2}
                                />
                                <OrderTableRow
                                    title="결제정보"
                                    type="dropdown"
                                    name="creditInfo"
                                    value={orderInfo.creditInfo}
                                    onChange={onChangeOrderText}
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
                                    onChange={onChangeOrderText}
                                    options={comePlaceOptions}
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
                                    title="운송장정보"
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
