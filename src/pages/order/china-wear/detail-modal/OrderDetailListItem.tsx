import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React from 'react'

function OrderDetailListItem() {
    return (
        <li className="border">
            <div className="grid overflow-hidden grid-cols-12 grid-rows-none gap-0">
                <div className="row-span-6 col-span-2 border-r border-b flex flex-col">
                    <div className="flex items-cetner">
                        <img src="http://im.imama.kr/imama/imgs/tokki.jpg" alt="test" className="h-[159px] max-w-[150px] object-contain m-auto" />
                    </div>
                    <div className="flex justify-evenly items-center border-t pt-1 w-full h-[32px]">
                        <InputText className="w-full p-1 border-none h-full pl-3 text-center" placeholder="옵션명" disabled />
                    </div>
                </div>
                <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r h-[32px]">
                    <span>상품명</span>
                </div>
                <div className="col-span-8 border-b pt-1">
                    <InputText value={'로지 토끼 슬리퍼'} className="w-full p-1 border-none h-full pl-3" />
                </div>
                <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                    <span className="">판매사</span>
                </div>
                <div className="col-span-3 border-b border-r h-[32px]">
                    <Dropdown className="h-[27px] border-none w-full" />
                </div>
                <div className="col-span-2 p-1 flex justify-center items-center font-bold bg-[#F8F9FB] border-b border-r">
                    <span className="">판매처</span>
                </div>
                <div className="col-span-3 border-b p-1 h-[32px]">
                    <Dropdown className="h-[27px] border-none w-full" />
                </div>
                <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                    <span>상품코드</span>
                </div>
                <div className="col-span-3 border-b border-r h-[32px]">
                    <InputText className="w-full p-1 border-none h-full pl-3" />
                </div>
                <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                    <span>옵션ID</span>
                </div>
                <div className="col-span-3 border-b">
                    <InputText className="w-full p-1 border-none h-full pl-3" />
                </div>
                <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                    <span>옵션1</span>
                </div>
                <div className="col-span-3 border-b border-r h-[32px]">
                    <InputText className="w-full p-1 border-none h-full pl-3" />
                </div>
                <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                    <span>옵션2</span>
                </div>
                <div className="col-span-3 border-b">
                    <InputText className="w-full p-1 border-none h-full pl-3" />
                </div>

                <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                    <span className="">상품바코드</span>
                </div>
                <div className="col-span-3 border-b border-r h-[32px]">
                    <InputText className="w-full p-1 border-none h-full pl-3" />
                </div>
                <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                    <span className="">바코드부착여부</span>
                </div>
                <div className="col-span-3 border-b p-1 h-[32px]">
                    <Dropdown className="h-[27px] border-none w-full" />
                </div>
                <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                    <span className="">카톤박스 기획여부</span>
                </div>
                <div className="col-span-3 border-b border-r h-[32px]">
                    <InputText className="w-full p-1 border-none h-full pl-3" />
                </div>
                <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                    <span className="">발주(매입)수량</span>
                </div>
                <div className="col-span-3 border-b p-1 h-[32px]">
                    <Dropdown className="h-[27px] border-none w-full" />
                </div>
            </div>
        </li>
    )
}

export default OrderDetailListItem
