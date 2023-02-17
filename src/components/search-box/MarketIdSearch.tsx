import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import React from 'react'
import { fakeConfig } from 'src/common/fake-data/config'
import { marketTemplate } from 'src/hooks/dropdown/ValueTemplate'

export const marketIdOptions = [{ id: '', name: '전체' }].concat(fakeConfig.markets)

type Props = {
    value: string
    onChange: (event: DropdownChangeParams) => void
}

function MarketIdSearch(props: Props) {
    const { value, onChange } = props

    return (
        <div className="flex space-x-2 items-center">
            <span className="font-bold text-[13px]">판매처</span>
            <Dropdown
                className="min-w-[100px]"
                name="marketId"
                optionLabel="name"
                optionValue="id"
                options={marketIdOptions}
                value={value}
                onChange={onChange}
                valueTemplate={marketTemplate(value)}
                itemTemplate={(option) => marketTemplate(option.id)}
            />
        </div>
    )
}

export default MarketIdSearch
