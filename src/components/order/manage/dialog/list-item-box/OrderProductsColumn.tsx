import numeral from 'numeral'
import { InputNumber, InputNumberChangeParams } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import React from 'react'

type Props = {
    title: string
    value: string | number
    numberValue?: number
    name?: string

    valueType?: 'text' | 'image' | 'number'
    rowSpan?: boolean
    borderRight?: boolean
    editable?: boolean

    onChangeOrderQty?: (event: InputNumberChangeParams) => void
}

function OrderProductsColumn(props: Props) {
    const { title, value, name, numberValue, valueType = 'text', rowSpan, borderRight, editable, onChangeOrderQty } = props

    return (
        <>
            <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r h-[32px]">
                <span>{title}</span>
            </div>
            {rowSpan ? (
                <div className="col-span-8 border-b pt-1">
                    <InputText className="w-full p-1 border-none h-full pl-3" value={value} readOnly />
                </div>
            ) : onChangeOrderQty ? (
                <div className={`col-span-3 h-[32px] border-b ${borderRight ? 'border-r' : ''}`}>
                    <InputNumber
                        className="w-full p-1 border-none h-full pl-3"
                        name={name}
                        value={numberValue}
                        readOnly={!editable}
                        onChange={onChangeOrderQty}
                    />
                </div>
            ) : (
                <div className={`col-span-3 h-[32px] border-b ${borderRight ? 'border-r' : ''}`}>
                    <InputText
                        className="w-full p-1 border-none h-full pl-3"
                        value={valueType === 'number' ? numeral(value).format('0,0') : value}
                        readOnly={!editable}
                    />
                </div>
            )}
        </>
    )
}

export default OrderProductsColumn
