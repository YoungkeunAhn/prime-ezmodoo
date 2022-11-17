import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import { InputNumber, InputNumberChangeParams } from 'primereact/inputnumber'
import React from 'react'

type Props = {
    options: SearchCate[]
    cate: string
    startNumber: number | null
    endNumber: number | null

    onChangeDropdown: (event: DropdownChangeParams) => void
    onChangeNumbers: (event: InputNumberChangeParams) => void
}

function SearchNumberCateOption(props: Props) {
    const { options, cate, startNumber, endNumber, onChangeDropdown, onChangeNumbers } = props

    return (
        <div className="flex space-x-2 items-center">
            <Dropdown
                className="min-w-[100px]"
                name="searchNumberCate"
                optionLabel="label"
                optionValue="field"
                options={options}
                value={cate}
                onChange={onChangeDropdown}
            />
            <div className="flex space-x-2 items-center">
                <InputNumber value={startNumber} onChange={onChangeNumbers} />
                <span>~</span>
                <InputNumber value={endNumber} onChange={onChangeNumbers} />
            </div>
        </div>
    )
}

export default SearchNumberCateOption
