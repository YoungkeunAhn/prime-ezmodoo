import React, { useState } from 'react'
import { IVendor } from 'src/types/product-manage'
import { VendorGridBoxItem } from './GridBoxItem'

type Props = {
    vendorInfo: IVendor
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function VendorInfoBox(props: Props) {
    const { vendorInfo, onChange } = props
    const [open, setOpen] = useState<boolean>(true)
    const { company, linkUrls, officer } = vendorInfo

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

                <VendorGridBoxItem title="공급사명" name="company.name" value={company.name} onChange={onChange} />
                <VendorGridBoxItem title="대표자" name="officer.name" value={officer.name} onChange={onChange} />
                <VendorGridBoxItem title="사업자등록번호" name="company.bizId" value={company.bizId} onChange={onChange} />
                <VendorGridBoxItem title="대표번호" name="company.telNo" value={company.telNo} onChange={onChange} />
                <VendorGridBoxItem title="팩스번호" name="company.faxNo" value={company.faxNo} onChange={onChange} />
                <VendorGridBoxItem title="대표이메일주소" name="officer.email" value={officer.email} onChange={onChange} />
                <VendorGridBoxItem title="주소" cols={3} name="company.address" value={company.address} onChange={onChange} />
                <VendorGridBoxItem title="URL1" name="linkUrls.0" value={linkUrls[0]} onChange={onChange} />
                <VendorGridBoxItem title="URL2" name="linkUrls.1" value={linkUrls[1]} onChange={onChange} />
            </div>
        </div>
    )
}

export default VendorInfoBox
