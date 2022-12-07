import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'

type Props = {
    onClose: () => void
}

type RequestType = 'mkr' | 'delivery' | 'truck' | ''

const requestTypeOptions = [
    {
        label: '배송타입',
        value: '',
    },
    {
        label: '밀크런',
        value: 'mkr',
    },
    {
        label: '택배',
        value: 'delivery',
    },
    {
        label: '화물',
        value: 'truck',
    },
]

const initFakeWarehousingData = {
    mkrNumber: '',
    intendedDate: '',
    pickUpDate: '',
    arrivalDate: '',
    carNumber: '',
    deliveryType: '',
    totalUnitQty: '',
    totalBoxQty: '',
    totalPaletteQty: '',
    logistics: '',
    requestNumber: '',
}

const warehouseList = [
    { label: '고양1', value: '고양1' },
    { label: '고양2', value: '고양2' },
    { label: '광주', value: '광주' },
    { label: '광주4', value: '광주4' },
    { label: '김해1', value: '김해1' },
    { label: '김해2', value: '김해2' },
    { label: '대구2', value: '대구2' },
    { label: '대구3', value: '대구3' },
    { label: '대구6', value: '대구6' },
    { label: '동탄1', value: '동탄1' },
    { label: '마장1', value: '마장1' },
    { label: '목천1', value: '목천1' },
    { label: '부천1', value: '부천1' },
    { label: '서울', value: '서울' },
    { label: '시흥1', value: '시흥1' },
    { label: '시흥2', value: '시흥2' },
    { label: '안산2', value: '안산2' },
    { label: '안산2', value: '안산2' },
    { label: '안성5', value: '안성5' },
    { label: '용인1', value: '용인1' },
    { label: '이천1', value: '이천1' },
    { label: '이천2', value: '이천2' },
    { label: '인천1', value: '인천1' },
    { label: '인천2', value: '인천2' },
    { label: '인천3', value: '인천3' },
    { label: '인천4', value: '인천4' },
    { label: '인천5', value: '인천5' },
    { label: '창원1', value: '창원1' },
    { label: '천안', value: '천안' },
    { label: '평택', value: '평택' },
    { label: '평택1', value: '평택1' },
    { label: '호법', value: '호법' },
]

function ReqeustInfoDialog(props: Props) {
    const { onClose } = props
    const [requestType, setRequestType] = useState<RequestType>('')
    const [requestData, setRequestData] = useState<any[]>([])
    const [warehouseValue, setWarehouseValue] = useState<string>('')

    const onChangeRequestType = (event: DropdownChangeParams) => {
        setRequestType(event.value)
    }

    const Header = () => {
        return (
            <div className="flex justify-between items-center">
                <span>입고요청 정보</span>
                <div className="flex items-center space-x-2">
                    <button className="btn primary-btn">저장</button>
                    <button className="btn primary-btn" onClick={onClose}>
                        닫기
                    </button>
                </div>
            </div>
        )
    }

    const onChangeDropdown = (event: DropdownChangeParams) => {
        setWarehouseValue(event.value)
    }

    const itemTemplate = (data: { label: string; value: string }) => {
        return (
            <div className="w-full flex items-center justify-between">
                <span>{data.label}</span>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text"></Button>
            </div>
        )
    }

    return (
        <Dialog visible={true} onHide={onClose} header={Header} closable={false}>
            <div>
                <table className="w-[500px]">
                    <tr>
                        <th className="text-left py-3 pr-3">입고 타입</th>
                        <td>
                            <Dropdown
                                className="h-[30px] w-full"
                                optionLabel="label"
                                name="requestType"
                                optionValue="value"
                                options={requestTypeOptions}
                                value={requestType}
                                onChange={onChangeRequestType}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th className="text-left py-3 pr-3">입고처</th>
                        <td>
                            <Dropdown
                                className="w-full"
                                editable
                                filter
                                filterBy="label"
                                optionLabel="label"
                                optionValue="value"
                                placeholder="입고처"
                                itemTemplate={itemTemplate}
                                emptyFilterMessage={(e: any) => {
                                    console.log(e.filterValue)
                                    return <Button onClick={() => setWarehouseValue(e.filterValue)}>새로운 입고처 추가</Button>
                                }}
                                options={warehouseList}
                                value={warehouseValue}
                                onChange={onChangeDropdown}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th className="text-left py-3 pr-3">입고 승인번호</th>
                        <td>
                            <InputText className="h-[32px] w-full" name="" />
                        </td>
                    </tr>
                    <tr>
                        <th className="text-left py-3 pr-3">입고 예정일</th>
                        <td>
                            <InputText className="h-[32px] w-full" name="" type="date" disabled />
                        </td>
                    </tr>
                </table>
            </div>
        </Dialog>
    )
}

export default ReqeustInfoDialog
