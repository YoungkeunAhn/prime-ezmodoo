import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React from 'react'

type Props = {
    options: SearchCate[]
    currentCate: string
    text: string
    onChangeDropdown: (event: DropdownChangeParams) => void
    onChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function SearchCateTextOption(props: Props) {
    const { options, currentCate, text, onChangeDropdown, onChangeText } = props

    return (
        <div className="flex space-x-2 items-center">
            <Dropdown
                className="min-w-[100px]"
                name="searchCate"
                optionLabel="label"
                optionValue="field"
                options={options}
                value={currentCate}
                onChange={onChangeDropdown}
            />

            <InputText name="searchText" value={text} onChange={onChangeText} />
        </div>
    )
}

export default SearchCateTextOption
