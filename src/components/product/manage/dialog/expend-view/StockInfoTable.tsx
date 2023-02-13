import { InputText } from 'primereact/inputtext'
import React from 'react'
import { ITrade } from 'src/types/product-manage'
import CommonInfoTableRow from './CommonInfoTableRow'
import WithMarkCommonTableRow from './WithMarkCommonTableRow'

type Props = {
    info: ITrade
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function TradeInfoTable(props: Props) {
    const { info, onChange } = props
    const { cbm, enSkuMaterial, enSkuName, gwt, lwh, nwt, qtyPerBox, boxPerPalette, tariffRate } = info

    return (
        <table className="text-[12px] w-full border-t-0 table-fixed border">
            <tr className="h-[32px] bg-[#305496] text-white">
                <th colSpan={2}>
                    <div className=" h-[32px] rounded-r-[40px] flex justify-center items-center w-full">상품물류 정보</div>
                </th>
            </tr>

            <CommonInfoTableRow title="상품 영문명" name="enSkuName" value={enSkuName} onChange={onChange} />
            <CommonInfoTableRow title="재질 영문명" name="enSkuMaterial" value={enSkuMaterial} onChange={onChange} />
            <tr className="border-b h-[32px]">
                <th className="border-r bg-[#F8F9FB] text-left p-2 pl-3">카톤사이즈</th>
                <td className="text-[#667084]">
                    <div className="p-inputgroup border-none">
                        <div className="w-full flex items-center">
                            <InputText
                                className="border-none w-full px-2 py-1 text-center"
                                name="lwh.width"
                                value={lwh.width || ''}
                                onChange={onChange}
                                placeholder="가로"
                            />
                            *
                            <InputText
                                className="border-none w-full px-2 py-1 text-center"
                                name="lwh.length"
                                value={lwh.length || ''}
                                onChange={onChange}
                                placeholder="세로"
                            />
                            *
                            <InputText
                                className="border-none w-full px-2 py-1 text-center"
                                name="lwh.height"
                                value={lwh.height || ''}
                                onChange={onChange}
                                placeholder="높이"
                            />
                        </div>
                        <span className="p-inputgroup-addon h-[32px] bg-[#F8F9FB] border-none ml-1">cm</span>
                    </div>
                </td>
            </tr>
            <WithMarkCommonTableRow title="박스당 CBM" name="cbm" value={cbm} onChange={onChange} mark="cbm" />
            <WithMarkCommonTableRow title="파레트 당 박스수량" name="boxPerPalette" value={boxPerPalette} onChange={onChange} mark="ea" />
            <WithMarkCommonTableRow title="박스 입수량" name="qtyPerBox" value={qtyPerBox} onChange={onChange} mark="ea" />
            <WithMarkCommonTableRow title="Net W/T (개당 상품순중량)" name="nwt" value={nwt} onChange={onChange} mark="kg" />
            <WithMarkCommonTableRow title="상품총중량" name="gwt" value={gwt} onChange={onChange} mark="kg" />
            <WithMarkCommonTableRow title="관세율" name="tariffRate" value={tariffRate} onChange={onChange} mark="%" />
        </table>
    )
}

export default TradeInfoTable
