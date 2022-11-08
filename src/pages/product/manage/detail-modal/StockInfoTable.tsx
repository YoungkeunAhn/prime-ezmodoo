import { InputText } from 'primereact/inputtext'
import React from 'react'
import { StockInfo } from 'src/types/product-manage'
import CommonInfoTableRow from './CommonInfoTableRow'
import WithMarkCommonTableRow from './WithMarkCommonTableRow'

type Props = {
    info: StockInfo
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function StockInfoTable(props: Props) {
    const { info, onChange } = props

    return (
        <table className="text-[12px] w-[400px] border-t-0 table-fixed relative -right-[1px] border">
            <tr className="h-[32px] bg-[#305496] text-white">
                <th colSpan={2}>
                    <div className=" h-[32px] rounded-r-[40px] flex justify-center items-center w-full">상품물류 정보</div>
                </th>
            </tr>

            <CommonInfoTableRow title="상품 영문명" name="enSkuName" value={info.enSkuName} onChange={onChange} />
            <CommonInfoTableRow title="재질 영문명" name="enSkuMaterial" value={info.enSkuMaterial} onChange={onChange} />
            <tr className="border-b h-[32px]">
                <th className="border-r bg-[#F8F9FB] text-left p-2 pl-3">카톤사이즈</th>
                <td className="text-[#667084]">
                    <div className="p-inputgroup border-none">
                        <div className="w-full flex items-center">
                            <InputText className="border-none w-full px-2 py-1 text-center" name="trade.lwh.width" value={info.trade.lwh.width || ''} onChange={onChange} placeholder="가로" />
                            *
                            <InputText className="border-none w-full px-2 py-1 text-center" name="trade.lwh.length" value={info.trade.lwh.length || ''} onChange={onChange} placeholder="세로" />
                            *
                            <InputText className="border-none w-full px-2 py-1 text-center" name="trade.lwh.height" value={info.trade.lwh.height || ''} onChange={onChange} placeholder="높이" />
                        </div>
                        <span className="p-inputgroup-addon h-[32px] bg-[#F8F9FB] border-none ml-1">cm</span>
                    </div>
                </td>
            </tr>
            <WithMarkCommonTableRow title="박스당 CBM" name="trade.cbm" value={info.trade.cbm} onChange={onChange} mark="cbm" />
            <WithMarkCommonTableRow title="발주 후 입고기간" name="trade.receiptPeriod" value={info.trade.receiptPeriod} onChange={onChange} mark="일" />
            <WithMarkCommonTableRow title="박스 입수량" name="trade.qtyPerBox" value={info.trade.qtyPerBox} onChange={onChange} mark="ea" />
            <WithMarkCommonTableRow title="Net W/T (개당 상품순중량)" name="trade.nwt" value={info.trade.nwt} onChange={onChange} mark="kg" />
            <WithMarkCommonTableRow title="상품총중량" name="trade.gwt" value={info.trade.gwt} onChange={onChange} mark="kg" />
            <WithMarkCommonTableRow title="관세율" name="trade.tariffRate" value={info.trade.tariffRate} onChange={onChange} mark="%" />
        </table>
    )
}

export default StockInfoTable
