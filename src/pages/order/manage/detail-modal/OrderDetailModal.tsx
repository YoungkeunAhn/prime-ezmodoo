import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useState } from 'react'
import CommonInfoTable from './CommonInfoTable'
import ContentHeader from './ContentHeader'
import OrderDetailListItem from './OrderDetailListItem'

type TabId = 'EXPAND' | 'LIST'

type Props = {
    open: boolean
    onClose: () => void
    data: any
}

function OrderDetailModal(props: Props) {
    const { open, onClose, data } = props
    const [tabId, setTabId] = useState<TabId>('EXPAND')

    const fakeHeaderInfo = {
        manager: '안영근',
        createAt: '2021-12-06 16:08:50',
        title: '로지 토끼 슬리퍼',
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
                            <div className="flex mt-2">
                                <div>
                                    <CommonInfoTable title="공급사정보" content={[]} />
                                </div>
                                <div>
                                    <CommonInfoTable title="상품물류 정보" content={[]} />
                                </div>
                            </div>
                        </div>

                        <div className="text-sm flex flex-col mt-2">
                            <div className="col-span-3 rounded-t-[10px] bg-[#146BCE] text-white flex justify-center items-center h-[32px]">발주정보수정</div>
                            <div className="grid grid-cols-3 border w-[400px]">
                                <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">발주일자</div>
                                <div className="col-span-2 border-b">
                                    <InputText className="w-full border-none h-[32px]" />
                                </div>
                                <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">발주수량</div>
                                <div className="col-span-2 border-b">
                                    <InputText className="w-full border-none h-[32px]" />
                                </div>
                                <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">결제일</div>
                                <div className="col-span-2 border-b">
                                    <InputText className="w-full border-none h-[32px]" />
                                </div>
                                <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">구매총금액</div>
                                <div className="col-span-2 border-b">
                                    <InputText className="w-full border-none h-[32px]" />
                                </div>
                                <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">결제정보 </div>
                                <div className="col-span-2 border-b">
                                    <Dropdown className="h-[32px] border-none w-full" />
                                </div>
                                <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">배송정보</div>
                                <div className="col-span-2 border-b">
                                    <Dropdown className="h-[32px] border-none w-full" />
                                </div>
                                <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">본사도착예정일</div>
                                <div className="col-span-2 border-b">
                                    <InputText type="date" className="w-full border-none h-[32px]" />
                                </div>
                                <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">공장출고예정일</div>
                                <div className="col-span-2 border-b">
                                    <InputText type="date" className="w-full border-none h-[32px]" />
                                </div>
                                <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">중국입고장소</div>
                                <div className="col-span-2 border-b">
                                    <InputText className="w-full border-none h-[32px]" />
                                </div>
                                <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">중국내륙운송비</div>
                                <div className="col-span-2 border-b">
                                    <InputText className="w-full border-none h-[32px]" />
                                </div>
                                <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">운송장정보</div>
                                <div className="col-span-2 border-b">
                                    <InputText className="w-full border-none h-[32px]" />
                                </div>
                                <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">주문번호</div>
                                <div className="col-span-2 border-b">
                                    <InputText className="w-full border-none h-[32px]" />
                                </div>
                                <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">패킹상태</div>
                                <div className="col-span-2 border-b">
                                    <Dropdown className="h-[32px] border-none w-full" />
                                </div>
                                <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">MD메모</div>
                                <div className="col-span-2 border-b h-[134px] overflow-y-auto">
                                    <InputTextarea className="w-full border-none h-full" rows={4} autoResize />
                                </div>
                                <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">무역메모</div>
                                <div className="col-span-2 border-b h-[134px] overflow-y-auto">
                                    <InputTextarea className="w-full border-none h-full" rows={4} autoResize />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default OrderDetailModal
