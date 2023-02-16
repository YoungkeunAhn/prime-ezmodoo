import { ko } from 'date-fns/locale'
import dayjs from 'dayjs'
import { Button } from 'primereact/button'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import React, { useEffect, useState } from 'react'
import { DateRange, RangeKeyDict } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { customRange } from 'src/data/custom-search'

type Props = {
    startDate: Date
    endDate: Date
    onChangeDates: (range: { startDate: Date; endDate: Date }) => void

    options: SearchCate[]
    currentCate: string
    onChangeDropdown: (event: DropdownChangeParams) => void
}

function SearchCateDateRangeOption(props: Props) {
    const { startDate, endDate, onChangeDates, options, currentCate, onChangeDropdown } = props
    const [pickerOpen, setPickerOpen] = useState<boolean>(false)

    const [innerDates, setInnerDates] = useState({ startDate, endDate })

    const openPicker = () => {
        setPickerOpen(true)
    }

    const closePicker = () => {
        setPickerOpen(false)
    }

    const onChangeInnerDates = (rangesByKey: RangeKeyDict) => {
        const range = rangesByKey.range1
        const { startDate, endDate } = range

        setInnerDates({ startDate: startDate as Date, endDate: endDate as Date })
    }

    const onClickRangeBtn = (range: { startDate: Date; endDate: Date }) => {
        const { startDate, endDate } = range

        setInnerDates({ startDate: startDate, endDate: endDate })
    }

    const onClickSuccessBtn = () => {
        onChangeDates(innerDates)
        closePicker()
    }

    const onClickCancelBtn = () => {
        setInnerDates({ startDate, endDate })
        closePicker()
    }

    useEffect(() => {
        setInnerDates({ startDate, endDate })
    }, [startDate, endDate])

    return (
        <div className="relative">
            <div className="flex items-center space-x-2">
                <Dropdown options={options} optionLabel="label" optionValue="field" value={currentCate} onChange={onChangeDropdown} />
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
    )
}

export default SearchCateDateRangeOption
