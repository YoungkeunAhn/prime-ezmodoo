import { ko } from 'date-fns/locale'
import dayjs from 'dayjs'
import { Button } from 'primereact/button'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import React, { useState } from 'react'
import { DateRange, RangeKeyDict } from 'react-date-range'
import { customRange } from 'src/data/custom-search'

type Props = {
    title: string
    startDate: Date
    endDate: Date
    onChangeDates: (range: { startDate: Date; endDate: Date }) => void
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

function YearMonthDateSearch(props: Props) {
    const { title, startDate, endDate, onChangeDates } = props
    const [year, setYear] = useState<string>('')
    const [month, setMonth] = useState<string>('')
    const [innerDates, setInnerDates] = useState({ startDate, endDate })
    const [pickerOpen, setPickerOpen] = useState<boolean>(false)

    const openPicker = () => {
        setPickerOpen(true)
    }

    const closePicker = () => {
        setPickerOpen(false)
    }

    const onChangeYear = (event: DropdownChangeParams) => {
        const getYear = event.value

        let startDate = new Date(`${getYear}-01-01`)
        let endDate = new Date(`${getYear}-12-31`)

        if (getYear === '') {
            const nowYear = dayjs(new Date()).get('year')
            startDate = new Date(`${dayjs(`${nowYear}-${month}-01`).startOf('month')}`)
            endDate = new Date(`${dayjs(`${nowYear}-${month}-01`).endOf('month')}`)
        }

        if (month !== '') {
            startDate = new Date(`${getYear}-${month}-01`)
            endDate = new Date(`${dayjs(`${getYear}-${month}-01`).endOf('month')}`)
        }

        setYear(getYear)
        onChangeDates({ startDate, endDate })
    }

    const onChangeMonth = (event: DropdownChangeParams) => {
        const getYear = year === '' ? dayjs(new Date()).get('year') : year
        const getMonth = event.value

        let startDate = new Date(`${dayjs(`${getYear}-${getMonth}-01`).startOf('month')}`)
        let endDate = new Date(`${dayjs(`${getYear}-${getMonth}-01`).endOf('month')}`)

        if (getMonth === '') {
            startDate = new Date(`${dayjs(`${getYear}-01-01`).startOf('month')}`)
            endDate = new Date(`${dayjs(`${getYear}-12-31`).endOf('month')}`)
        }

        setMonth(getMonth)
        onChangeDates({ startDate, endDate })
    }

    const onClickRangeBtn = (range: { startDate: Date; endDate: Date }) => {
        const { startDate, endDate } = range

        setInnerDates({ startDate: startDate, endDate: endDate })
    }

    const onClickSuccessBtn = () => {
        const { startDate, endDate } = innerDates
        onChangeDates({ startDate: new Date(startDate), endDate: new Date(endDate) })
        closePicker()
    }

    const onClickCancelBtn = () => {
        setInnerDates({ startDate, endDate })
        closePicker()
    }

    const onChangeInnerDates = (rangesByKey: RangeKeyDict) => {
        const range = rangesByKey.range1
        const { startDate, endDate } = range

        setInnerDates({ startDate: startDate as Date, endDate: endDate as Date })
    }

    return (
        <div className="flex items-center space-x-2">
            <span className="font-bold text-[13px]">{title}</span>

            <Dropdown
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
            />
            <div className="relative">
                <div className="flex items-center space-x-2">
                    <div
                        onClick={openPicker}
                        className="text-xs cursor-pointer space-x-2 box-border flex items-center px-3 rounded h-[30px] border border-gray-300"
                    >
                        <i className="pi pi-calendar" />
                        <div>{dayjs(startDate).format('YYYY-MM-DD')}</div>
                        <div>-</div>
                        <div>{dayjs(endDate).format('YYYY-MM-DD')}</div>
                    </div>
                </div>

                <div className={`border rounded-md overflow-hidden z-50 ${pickerOpen ? 'block absolute top-[50px] left-0' : 'hidden'}`}>
                    <div className="flex items-start flex-nowrap bg-white">
                        <ul className="flex flex-col flex-1 h-full items-center justify-start py-2 m-auto">
                            {customRange.map((item, idx) => (
                                <li
                                    key={idx}
                                    onClick={() => onClickRangeBtn(item.range)}
                                    className={`px-4 py-3 cursor-pointer text-xs hover:text-blue-400 hover:bg-blue-100 w-[100px] ${
                                        customRange.length - 1 !== idx ? 'border-b' : ''
                                    }`}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                        <div className="p-2 flex flex-col border-l">
                            <DateRange
                                className="text-xs"
                                ranges={[innerDates]}
                                locale={ko}
                                onChange={onChangeInnerDates}
                                dateDisplayFormat="yyyy-MM-dd"
                                editableDateInputs
                            />
                            <div className="flex justify-end space-x-2">
                                <Button className="p-button-secondary p-button-text text-xs py-2" onClick={onClickCancelBtn}>
                                    취소
                                </Button>
                                <Button className="p-button-success p-button-text text-xs py-2" onClick={onClickSuccessBtn}>
                                    완료
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YearMonthDateSearch
