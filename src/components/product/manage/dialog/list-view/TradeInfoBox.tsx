import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { ITrade } from 'src/types/product-manage'
import { TradeGridBoxItem } from './GridBoxItem'

type Props = {
    tradeInfo: ITrade
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function TradeInfoBox(props: Props) {
    const { tradeInfo, onChange } = props
    const { cbm, enSkuMaterial, enSkuName, gwt, lwh, nwt, qtyPerBox, receiptPeriod, tariffRate } = tradeInfo
    const [open, setOpen] = useState<boolean>(true)

    const onToogleOpen = () => {
        setOpen(!open)
    }
    return (
        <div className="mt-2">
            <button
                className="mb-2 bg-[#305496] text-white flex justify-left items-center h-[32px] w-[245px] rounded-r-[40px] pl-6 space-x-3"
                onClick={onToogleOpen}
            >
                {open ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}
                <span className="font-bold text-sm">상품 물류정보</span>
            </button>
            <div
                className={`grid overflow-hidden grid-cols-6 grid-rows-none border text-sm ${
                    open ? 'h-[128px]' : 'h-[0px] overflow-hidden border-none'
                }`}
                style={{ transition: 'height 0.5s' }}
            >
                <div className="col-span-6 bg-[#EFF2F6] font-bold text-center border-b h-[32px] flex items-center justify-center">상품물류 정보</div>
                <TradeGridBoxItem title="상품 영문명" name="enSkuName" value={enSkuName} onChange={onChange} />
                <TradeGridBoxItem title="재질 영문명" name="enSkuMaterial" value={enSkuMaterial} onChange={onChange} />
                <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">카톤사이즈</div>
                <div className="flex items-center border-b">
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
                </div>
                <TradeGridBoxItem title="박스당 CBM" name="cbm" value={cbm} onChange={onChange} mark="cbm" />
                <TradeGridBoxItem title="발주 후 입고기간" name="receiptPeriod" value={receiptPeriod} onChange={onChange} mark="일" />
                <TradeGridBoxItem title="박스 입수량" name="qtyPerBox" value={qtyPerBox} onChange={onChange} mark="ea" last />
                <TradeGridBoxItem title="Net W/T (개당 상품순중량)" name="nwt" value={nwt} onChange={onChange} mark="kg" />
                <TradeGridBoxItem title="상품 총중량" name="gwt" value={gwt} onChange={onChange} mark="kg" />
                <TradeGridBoxItem title="관세율" name="tariffRate" value={tariffRate} onChange={onChange} mark="%" last />
            </div>
        </div>
    )
}

export default TradeInfoBox
