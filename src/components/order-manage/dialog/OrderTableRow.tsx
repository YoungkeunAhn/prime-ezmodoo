import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import { InputNumber, InputNumberChangeParams } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React from 'react'

type ChangeEvent = React.ChangeEvent<HTMLInputElement> | DropdownChangeParams | InputNumberChangeParams

type Props = {
    title: string
    value?: string
    name: string
    type: 'text' | 'dropdown' | 'textarea' | 'date' | 'number'
    onChange: (event: any) => void

    disabled?: boolean
    mark?: string
    currencySymbol?: string
    digitLength?: number
    options?: { label: string; value: string }[]
    numberValue?: number | null
}

function OrderTableRow(props: Props) {
    const { title, type, name, value = '', disabled, mark, currencySymbol, digitLength, numberValue, options = [], onChange } = props

    return (
        <>
            <div className="border-b border-r p-2 font-bold bg-[#F8F9FB] flex items-center">{title}</div>
            <div className={`col-span-2 border-b ${type === 'textarea' ? 'h-[134px] overflow-y-auto' : ''}`}>
                {(type === 'text' || type === 'date') && (
                    <InputText
                        className="w-full border-none h-[32px]"
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                    />
                )}
                {type === 'dropdown' && (
                    <Dropdown
                        className="h-[32px] border-none w-full"
                        optionLabel="label"
                        optionValue="value"
                        name={name}
                        value={value}
                        options={options}
                        onChange={onChange}
                    />
                )}
                {type === 'textarea' && (
                    <InputTextarea
                        className="w-full border-none h-full"
                        rows={4}
                        autoResize
                        name={name}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                    />
                )}
                {type === 'number' && (
                    <div className="p-inputgroup border-none">
                        {currencySymbol && (
                            <span className="p-inputgroup-addon h-[32px] bg-white border-none px-0 min-w-0 ml-2">{currencySymbol}</span>
                        )}
                        <div className="w-full flex items-center">
                            <InputNumber
                                className="w-full border-none h-[32px]"
                                inputClassName="border-none"
                                name={name}
                                value={numberValue}
                                onChange={onChange}
                                mode="decimal"
                                minFractionDigits={digitLength ?? 0}
                                maxFractionDigits={digitLength ?? 0}
                                disabled={disabled}
                            />
                        </div>
                        {mark && <span className="p-inputgroup-addon h-[32px] bg-[#F8F9FB] border-none ml-1">{mark}</span>}
                    </div>
                )}
            </div>
        </>
    )
}

export default OrderTableRow
