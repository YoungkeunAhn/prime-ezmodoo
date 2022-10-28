import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'

function ListViewSupplierInfo() {
    const [open, setOpen] = useState<boolean>(true)

    const onToogleOpen = () => {
        setOpen(!open)
    }
    return (
        <div className="mt-10">
            <button className="mb-2 bg-[#305496] text-white flex justify-left items-center h-[32px] w-[245px] rounded-r-[40px] pl-6 space-x-3" onClick={onToogleOpen}>
                {open ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}
                <span className="font-bold text-sm">공급사 정보</span>
            </button>
            <div className={`grid overflow-hidden grid-cols-4 grid-rows-none border text-sm ${open ? 'h-[192px]' : 'h-[0px] overflow-hidden border-none'}`} style={{ transition: 'height 0.5s' }}>
                <div className="col-span-4 bg-[#EFF2F6] font-bold text-center border-b h-[32px] flex items-center justify-center">공급사 정보</div>
                <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">공급사명</div>
                <div className="flex items-center border-b border-r">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">대표자</div>
                <div className="flex items-center border-b">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">사업자등록번호</div>
                <div className="flex items-center border-b border-r">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">대표번호</div>
                <div className="flex items-center border-b">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">팩스번호</div>
                <div className="flex items-center border-b border-r">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">대표이메일주소</div>
                <div className="flex items-center border-b">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">주소</div>
                <div className="flex items-center border-b col-span-3">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">URL1</div>
                <div className="flex items-center border-r">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
                <div className="bg-[#F8F9FB] font-bold text-center border-r h-[32px] flex items-center justify-center">URL2</div>
                <div className="flex items-center">
                    <InputText className="border-none h-[30px] pl-2 w-full" />
                </div>
            </div>
        </div>
    )
}

export default ListViewSupplierInfo
