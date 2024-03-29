import numeral from 'numeral'
import { InputNumber } from 'primereact/inputnumber'
import { Tooltip } from 'primereact/tooltip'
import React from 'react'
import { HeaderInfo } from './OrderDetailModal'

type Props = {
    headerInfo: HeaderInfo
}

function ContentHeader(props: Props) {
    const { headerInfo } = props
    const { manager, createdAt, productName, cost, exchangeRate, latestCost } = headerInfo

    return (
        <div className="grid grid-cols-10 text-[12px] border">
            <div className="h-[30px] p-2 border-b border-r text-center font-bold bg-[#F8F9FB]">담당자</div>
            <div className="h-[30px] p-2 border-b border-r text-center bg-[#F8F9FB] text-[#667084]">{manager}</div>
            <div className="h-[30px] p-2 border-b border-r text-center font-bold bg-[#F8F9FB]">등록일</div>
            <div className="h-[30px] p-2 border-b border-r text-center bg-[#F8F9FB] text-[#667084]">{createdAt}</div>
            <div className="h-[30px] p-2 border-b border-r text-center font-bold bg-[#F8F9FB]">수입가</div>
            <div
                className="h-[30px] p-2 border-b border-r text-center bg-[#F8F9FB] text-[#667084] flex items-center"
                data-pr-tooltip="A Disabled Button"
            >
                <span>¥</span>
                <InputNumber
                    name="cost"
                    value={cost}
                    inputStyle={{ background: 'none', textAlign: 'left', width: '-webkit-fill-available' }}
                    inputClassName="border-none outline-none text-left"
                    className="h-[18px] border-none outline-none text-white p-0 pl-2 text-left w-fit mr-2"
                    style={{ width: '-webkit-fill-available' }}
                    minFractionDigits={2}
                    format
                />
            </div>
            <div className="h-[30px] p-2 border-b border-r text-center font-bold bg-[#F8F9FB]">최근 수입가</div>
            <div
                className="h-[30px] p-2 border-b border-r text-center bg-[#F8F9FB] text-[#667084] recently-price"
                data-pr-tooltip="A Disabled Button"
            >
                ¥ {numeral(latestCost).format('0,0')}
            </div>
            <div className="h-[30px] p-2 border-b border-r text-center font-bold bg-[#F8F9FB]">환율 적용가</div>
            <div className="h-[30px] p-2 border-b text-center bg-[#F8F9FB] text-[#667084]">₩ {cost || 0 * exchangeRate}</div>
            <div className="h-[30px] p-2 border-b border-r text-center bg-[#0D3157] text-white">상품그룹명</div>
            <div className="h-[30px] p-2 bg-[#0D3157] text-white col-span-9">{productName}</div>
            <Tooltip target=".recently-price" position="bottom" />
        </div>
    )
}

export default ContentHeader
