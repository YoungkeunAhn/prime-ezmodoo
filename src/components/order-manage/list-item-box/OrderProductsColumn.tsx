import numeral from 'numeral'
import React from 'react'

type Props = {
    title: string
    value: string

    valueType?: 'text' | 'image' | 'number'
    rowSpan?: boolean
    borderRight?: boolean
}

function OrderProductsColumn(props: Props) {
    const { title, value, valueType = 'text', rowSpan, borderRight } = props

    return (
        <>
            <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r h-[32px]">
                <span>{title}</span>
            </div>
            {rowSpan ? (
                <div className="col-span-8 border-b pt-1">{value}</div>
            ) : (
                <div className={`col-span-3 h-[32px] border-b ${borderRight ? 'border-r' : ''}`}>
                    {valueType === 'image' ? '' : valueType === 'number' ? numeral(value).format('0,0') : value}
                </div>
            )}
        </>
    )
}

export default OrderProductsColumn
