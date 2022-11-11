import { InputText } from 'primereact/inputtext'
import React from 'react'

type CommonProps = {
    title: string
    value: string | number
    name: string

    placeholder?: string

    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface TradeProps extends CommonProps {
    last?: boolean
    mark?: string
}

export function TradeGridBoxItem(props: TradeProps) {
    const { name, title, value, last, mark, placeholder, onChange } = props
    return (
        <>
            <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">{title}</div>
            <div className={`flex items-center border-b ${last ? '' : 'border-r'}`}>
                {mark ? (
                    <div className="p-inputgroup border-none">
                        <div className="w-full flex items-center">
                            <InputText className="border-none w-full px-2 py-1" name={name} value={value || ''} onChange={onChange} placeholder={placeholder} />
                        </div>
                        <span className="p-inputgroup-addon h-[32px] bg-[#F8F9FB] border-none ml-1">{mark}</span>
                    </div>
                ) : (
                    <InputText className="border-none h-[30px] pl-2 w-full" name={name} value={value || ''} onChange={onChange} placeholder={placeholder} />
                )}
            </div>
        </>
    )
}

interface VendorProps extends CommonProps {
    cols?: number
}

export function VendorGridBoxItem(props: VendorProps) {
    const { name, onChange, title, value, cols } = props
    return (
        <>
            <div className="bg-[#F8F9FB] font-bold text-center border-b border-r h-[32px] flex items-center justify-center">{title}</div>
            <div className={`flex items-center border-b border-r ${cols ? 'col-span-' + cols : ''}`}>
                <InputText className="border-none h-[30px] pl-2 w-full" name={name} value={value} onChange={onChange} />
            </div>
        </>
    )
}
