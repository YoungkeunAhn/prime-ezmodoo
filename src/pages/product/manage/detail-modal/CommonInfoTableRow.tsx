import { InputText } from 'primereact/inputtext'
import React from 'react'

type Props = {
    title: string
    value: string
    name: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

function CommonInfoTableRow(props: Props) {
    const { title, name, value, placeholder, onChange } = props

    return (
        <tr className="border-b h-[32px]">
            <th className="border-r bg-[#F8F9FB] text-left p-2 pl-3">{title}</th>
            <td className="text-[#667084]">
                <InputText className="border-none w-full px-2 py-1" name={name} value={value} onChange={onChange} placeholder={placeholder} />
            </td>
        </tr>
    )
}

export default CommonInfoTableRow
