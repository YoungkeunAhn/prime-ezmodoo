import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'

function ExpandViewDistributionInfo() {
    const [open, setOpen] = useState<boolean>(true)

    const onToogleOpen = () => {
        setOpen(!open)
    }
    return (
        <div className="mt-2">
            <button className="mb-2 bg-[#305496] text-white flex justify-left items-center h-[32px] w-[245px] rounded-r-[40px] pl-6 space-x-3" onClick={onToogleOpen}>
                {open ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}
                <span className="font-bold text-sm">상품 물류정보</span>
            </button>
            <div className={`grid overflow-hidden grid-cols-6 grid-rows-none border text-sm ${open ? 'h-[128px]' : 'h-[0px] overflow-hidden border-none'}`} style={{ transition: 'height 0.5s' }}>
                <div className="col-span-6 bg-[#EFF2F6] font-bold text-center border-b h-[32px] flex items-center justify-center">상품물류 정보</div>
                <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">카톤사이즈</div>
                <div className="flex items-center border-b border-r">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">박스 입수량</div>
                <div className="flex items-center border-b border-r">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">박스당 CBM</div>
                <div className="flex items-center border-b">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">Net W/T (개당 상품순중량)</div>
                <div className="flex items-center border-b border-r">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">상품 영문명</div>
                <div className="flex items-center border-b border-r">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">재질 영문명</div>
                <div className="flex items-center border-b">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-r h-[32px] flex items-center justify-center">상품 총중량</div>
                <div className="flex items-center border-r">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-r h-[32px] flex items-center justify-center">관세율</div>
                <div className="flex items-center border-r">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-r h-[32px] flex items-center justify-center">발주 후 입고기간</div>
                <div className="flex items-center">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
            </div>
        </div>
    )
}

export default ExpandViewDistributionInfo
