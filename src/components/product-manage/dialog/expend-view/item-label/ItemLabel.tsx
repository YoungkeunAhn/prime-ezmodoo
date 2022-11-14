import React from 'react'

type Props = {
    label: string
    noBorderRight?: boolean
    noBorderBottom?: boolean
}

function ItemLabel(props: Props) {
    const { label, noBorderRight, noBorderBottom } = props

    return (
        <div
            className={`col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center h-[32px] 
            ${noBorderBottom ? '' : 'border-b'} 
            ${noBorderRight ? '' : 'border-r'}`}
        >
            <span>{label}</span>
        </div>
    )
}

export default ItemLabel
