import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import React from 'react'
import { fakeConfig } from 'src/common/fake-data/config'

export const sellerOptions = [{ pk: '', name: '전체' }].concat(fakeConfig.sellers)

type Props = {
    value: string
    onChange: (event: DropdownChangeParams) => void
}

function SellerOption(props: Props) {
    const { value, onChange } = props

    return (
        <div className="flex space-x-2 items-center">
            <span className="font-bold text-[13px]">판매사</span>
            <Dropdown
                className="min-w-[100px]"
                name="seller"
                optionLabel="name"
                optionValue="pk"
                options={sellerOptions}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default SellerOption
