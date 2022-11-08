import { InputText } from 'primereact/inputtext'
import React from 'react'

type Props = {
    title: string
    value: number
    name: string
    mark: string

    placeholder?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function WithMarkCommonTableRow(props: Props) {
    const { title, value, name, mark, placeholder, onChange } = props

    return (
        <tr className="border-b h-[32px]">
            <th className="border-r bg-[#F8F9FB] text-left p-2 pl-3">{title}</th>
            <td className="text-[#667084]">
                <div className="p-inputgroup border-none">
                    <div className="w-full flex items-center">
                        <InputText className="border-none w-full px-2 py-1 text-center" name={name} value={value || ''} onChange={onChange} placeholder={placeholder} />
                    </div>
                    <span className="p-inputgroup-addon h-[32px] bg-[#F8F9FB] border-none ml-1">{mark}</span>
                </div>
            </td>
        </tr>
    )
}

export default WithMarkCommonTableRow
