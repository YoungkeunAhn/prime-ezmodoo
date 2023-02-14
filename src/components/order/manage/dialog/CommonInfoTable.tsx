import { InputText } from 'primereact/inputtext'
import React from 'react'

type Props = {
    title: string
    content: any[]
}

function CommonInfoTable(props: Props) {
    const { title, content } = props

    return (
        <table className="text-[12px] border-t-0 table-fixed relative -right-[1px] border w-full">
            <tr className="h-[32px] bg-[#305496] text-white">
                <th colSpan={2}>
                    <div className=" h-[32px] rounded-r-[40px] flex justify-center items-center w-full">{title}</div>
                </th>
            </tr>
            {content.map((item, idx) => (
                <tr className="border-b h-[32px]" key={idx}>
                    <th className="border-r bg-[#F8F9FB] text-left p-2 pl-3">{item.title}</th>
                    <td className="text-[#667084]">
                        <InputText className="border-none w-full px-2 py-1" value={item.info} />
                    </td>
                </tr>
            ))}
        </table>
    )
}

export default CommonInfoTable
