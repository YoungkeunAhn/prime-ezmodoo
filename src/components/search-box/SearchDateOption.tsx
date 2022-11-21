import { DropdownChangeParams } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'

type Props = {
    title: string
    startDate: string
    endDate: string
    onChangeDates: (startDate: string, endDate: string) => void
    onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const yearList = [
    { label: '연도별', value: '' },
    { label: '2022년', value: '2022' },
    { label: '2023년', value: '2023' },
]

const monthList = [
    {
        label: '월별',
        value: '',
    },
].concat(new Array(12).fill(0).map((x, idx) => ({ label: idx + 1 + '월', value: idx + 1 + '' })))

function SearchDateOption(props: Props) {
    const { title, startDate, endDate, onChangeDates, onChangeInput } = props
    const [year, setYear] = useState<string>('')
    const [month, setMonth] = useState<string>('')

    const onChangeYear = (event: DropdownChangeParams) => {
        setYear(event.value)

        onChangeDates('', '')
    }

    const onChangeMonth = (event: DropdownChangeParams) => {
        setMonth(event.value)
        onChangeDates('', '')
    }

    return (
        <div className="flex items-center space-x-2">
            <span className="font-bold text-[13px]">{title}</span>

            {/* <Dropdown
                className="min-w-[100px]"
                name="year"
                optionLabel="label"
                optionValue="value"
                options={yearList}
                value={year}
                onChange={onChangeYear}
            />
            <Dropdown
                className="min-w-[100px]"
                name="month"
                optionLabel="label"
                optionValue="value"
                options={monthList}
                value={month}
                onChange={onChangeMonth}
            /> */}
            <InputText type="date" name="startDate" value={startDate} onChange={onChangeInput} />
            <span>~</span>
            <InputText type="date" name="endDate" value={endDate} onChange={onChangeInput} />
        </div>
    )
}

export default SearchDateOption
