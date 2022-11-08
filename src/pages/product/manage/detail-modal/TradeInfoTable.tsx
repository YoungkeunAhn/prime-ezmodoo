import React from 'react'
import { TradeInfo } from 'src/types/product-manage'
import CommonInfoTableRow from './CommonInfoTableRow'

type Props = {
    info: TradeInfo
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function TradeInfoTable(props: Props) {
    const { info, onChange } = props

    return (
        <table className="text-[12px] w-[400px] border-t-0 table-fixed relative -right-[1px] border mb-4">
            <tr className="h-[32px] bg-[#305496] text-white">
                <th colSpan={2}>
                    <div className=" h-[32px] rounded-r-[40px] flex justify-center items-center w-full">공급사 정보</div>
                </th>
            </tr>
            <CommonInfoTableRow title="공급사명" name="company.name" value={info.company.name} onChange={onChange} />
            <CommonInfoTableRow title="대표자" name="officer.name" value={info.officer.name} onChange={onChange} />
            <CommonInfoTableRow title="사업자등록번호" name="company.bizId" value={info.company.bizId} onChange={onChange} />
            <CommonInfoTableRow title="팩스번호" name="company.faxNo" value={info.company.faxNo} onChange={onChange} />
            <CommonInfoTableRow title="대표번호" name="company.telNo" value={info.company.telNo} onChange={onChange} />
            <CommonInfoTableRow title="대표이메일주소" name="officer.email" value={info.officer.email} onChange={onChange} />
            <CommonInfoTableRow title="주소" name="company.address" value={info.company.address} onChange={onChange} />
            <CommonInfoTableRow title="URL1" name="company.stieUrl1" value={info.company.stieUrl1} onChange={onChange} />
            <CommonInfoTableRow title="URL2" name="company.stieUrl2" value={info.company.stieUrl2} onChange={onChange} />
        </table>
    )
}

export default TradeInfoTable
