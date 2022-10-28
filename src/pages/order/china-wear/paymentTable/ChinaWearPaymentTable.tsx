import React from 'react'

type Props = {
    open: boolean
    openModal: () => void
}

function ChinaWearPaymentTable(props: Props) {
    const { open, openModal } = props

    return (
        <div className={`flex space-x-2 h-[60px] overflow-hidden ${open ? 'w-fit' : 'w-0'}`}>
            <table className="text-sm border text-center">
                <thead className="text-center">
                    <th className="bg-[#FFD9D9] font-bold border w-[150px]">발주금액</th>
                    <th className="bg-[#FFD9D9] font-bold border w-[150px]">도착완료금액</th>
                    <th className="bg-[#FFD9D9] font-bold border w-[150px] cursor-pointer" onClick={openModal}>
                        지급액
                    </th>
                    <th className="bg-[#FFD9D9] font-bold border w-[150px]">미지급액</th>
                    <th className="bg-[#FFD9D9] font-bold border w-[150px]">미출고잔액</th>
                </thead>
                <tbody className="text-center">
                    <tr>
                        <td className="border">￥ 828,419.24</td>
                        <td className="border">￥ 828,419.24</td>
                        <td className="border">￥ 828,419.24</td>
                        <td className="border">￥ 828,419.24</td>
                        <td className="border">￥ 828,419.24</td>
                    </tr>
                    <tr>
                        <td className="border">￦ 447,403,740</td>
                        <td className="border">￦ 447,403,740</td>
                        <td className="border">￦ 447,403,740</td>
                        <td className="border">￦ 447,403,740</td>
                        <td className="border">￦ 447,403,740</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ChinaWearPaymentTable
