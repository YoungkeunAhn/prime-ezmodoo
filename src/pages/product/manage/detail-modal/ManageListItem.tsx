import { Checkbox } from 'primereact/checkbox'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { SortableKnob, SortableItem } from 'react-easy-sort'

type Props = {
    id?: any
}

function ManageListItem() {
    return (
        <div className="border">
            <SortableItem>
                <div className="grid overflow-hidden grid-cols-12 grid-rows-none gap-0">
                    <div className="row-span-6 col-span-4 border-r border-b flex flex-col">
                        <div className="flex items-cetner">
                            <div className="h-auto flex justify-center items-center border-r w-[40px] hover:cursor-move">
                                <SortableKnob>
                                    <i className="pi pi-align-justify" />
                                </SortableKnob>
                            </div>
                            <div className="h-auto flex justify-center items-center border-r w-[40px]">
                                <Checkbox className="ml-1 mt-1" />
                            </div>

                            <img src="http://im.imama.kr/imama/imgs/tokki.jpg" alt="test" className="h-[127px] max-w-[140px] object-contain m-auto" />
                            <div className="flex flex-col justify-between items-center p-2">
                                <button className="border text-gray-400 px-2 py-1 rounded text-[11px]">메모추가/수정</button>
                                <div className="flex flex-col items-center text-gray-400">
                                    <span>대표이미지</span>
                                    <span>(500*500 px)</span>
                                </div>
                            </div>
                            <div style={{ borderTop: '0px solid #7DB3C1', borderRight: '15px solid #7DB3C1', borderBottom: '15px solid transparent', borderLeft: '15px solid trasparent', width: 0, height: 0 }}> </div>
                        </div>
                        <div className="flex justify-evenly items-center border-t pt-1 w-full h-[32px]">
                            <InputText className="w-full p-1 border-none h-full pl-3 text-center" placeholder="옵션명" />
                        </div>
                        <div className="flex justify-evenly items-center border-t w-full pt-1">
                            <div className="flex items-center">
                                <Checkbox inputId="url" />
                                <label htmlFor="url">URL저장</label>
                            </div>
                            <input type="file" name="" id="" />
                        </div>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r h-[32px]">
                        <span>상품명</span>
                    </div>
                    <div className="col-span-6 border-b pt-1">
                        <InputText value={'로지 토끼 슬리퍼'} className="w-full p-1 border-none h-full pl-3" />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span className="">판매사</span>
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <Dropdown className="h-[27px] border-none w-full" />
                    </div>
                    <div className="col-span-2 p-1 flex justify-center items-center font-bold bg-[#F8F9FB] border-b border-r">
                        <span className="">판매처</span>
                    </div>
                    <div className="col-span-2 border-b p-1 h-[32px]">
                        <Dropdown className="h-[27px] border-none w-full" />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>상품코드</span>
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputText className="w-full p-1 border-none h-full pl-3" />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>옵션ID</span>
                    </div>
                    <div className="col-span-2 border-b">
                        <InputText className="w-full p-1 border-none h-full pl-3" />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>옵션1</span>
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputText className="w-full p-1 border-none h-full pl-3" />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>옵션2</span>
                    </div>
                    <div className="col-span-2 border-b">
                        <InputText className="w-full p-1 border-none h-full pl-3" />
                    </div>

                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span className="">상품바코드</span>
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputText className="w-full p-1 border-none h-full pl-3" />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span className="">바코드부착여부</span>
                    </div>
                    <div className="col-span-2 border-b p-1 h-[32px]">
                        <Dropdown className="h-[27px] border-none w-full" />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span className="">SKU.NO</span>
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputText className="w-full p-1 border-none h-full pl-3" />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span className="">카톤박스 기획여부</span>
                    </div>
                    <div className="col-span-2 border-b p-1 h-[32px]">
                        <Dropdown className="h-[27px] border-none w-full" />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r h-[32px]">
                        <span>입고가격</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>판매가격</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>할인쿠폰금액</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>배송비</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>판매수수료 (%)</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b">
                        <span>정산금액</span>
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                    <div className="col-span-2 border-b h-[32px]">
                        <InputNumber className="p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r h-[32px]">
                        <span>판매이익</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>판매이익율 (%)</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>창고재고량</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>가용창고재고량</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>쿠팡창고재고량</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b">
                        <span>불량수량</span>
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                    <div className="col-span-2 border-b h-[32px]">
                        <InputNumber className="p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-r h-[32px]">
                        <span className="">제트배송-입고요청수량</span>
                    </div>
                    <div className="col-span-4 border-r">
                        <InputNumber className="p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-r">
                        <span className="">발주(매입)수량</span>
                    </div>
                    <div className="col-span-4">
                        <InputNumber className="p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                </div>
            </SortableItem>
        </div>
    )
}

export default ManageListItem
