import React from 'react'
import { IVendor } from 'src/types/product-manage'
import CommonInfoTableRow from './CommonInfoTableRow'

type Props = {
    info: IVendor
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function VendorInfoTable(props: Props) {
    const { info, onChange } = props
    const { company, linkUrls, officer } = info

    return (
        <table className="text-[12px] w-[400px] border-t-0 table-fixed relative -right-[1px] border mb-4">
            <tr className="h-[32px] bg-[#305496] text-white">
                <th colSpan={2}>
                    <div className=" h-[32px] rounded-r-[40px] flex justify-center items-center w-full">공급사 정보</div>
                </th>
            </tr>
            <CommonInfoTableRow title="공급사명" name="company.name" value={company.name} onChange={onChange} />
            <CommonInfoTableRow title="대표자" name="officer.name" value={officer.name} onChange={onChange} />
            <CommonInfoTableRow title="사업자등록번호" name="company.bizId" value={company.bizId} onChange={onChange} />
            <CommonInfoTableRow title="팩스번호" name="company.faxNo" value={company.faxNo} onChange={onChange} />
            <CommonInfoTableRow title="대표번호" name="company.telNo" value={company.telNo} onChange={onChange} />
            <CommonInfoTableRow title="대표이메일주소" name="officer.email" value={officer.email} onChange={onChange} />
            <CommonInfoTableRow title="주소" name="company.address" value={company.address} onChange={onChange} />
            <CommonInfoTableRow title="URL1" name="linkUrls.0" value={linkUrls[0]} onChange={onChange} />
            <CommonInfoTableRow title="URL2" name="linkUrls.1" value={linkUrls[1]} onChange={onChange} />
        </table>
    )
}

export default VendorInfoTable
