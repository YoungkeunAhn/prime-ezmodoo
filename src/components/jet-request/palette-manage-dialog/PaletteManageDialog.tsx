import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
import React, { useState } from 'react'
import { seqBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'

const fakeData = [
    {
        id: '1',
        productName: '로지 소프트 퍼 목도리 머플러 숏 2종 세트 핑크(콩페이스트)+그레이(밝은회색) one size',
        outQty: 360,
        requestQty: 360,
        boxPerQty: 120,
    },
].map((data) => ({ ...data, ableQty: data.requestQty, boxQty: '', paletteNumber: '' }))

type Props = {
    onClose: () => void
}

function PaletteManageDialog(props: Props) {
    const { onClose } = props

    const [unFinishList, setUnFinishList] = useState(fakeData)
    const [finishList, setFinishList] = useState<any[]>([])

    const Header = () => {
        return (
            <div className="flex justify-between items-center">
                <span>파렛트 적재관리</span>
                <div className="flex space-x-2">
                    <button className="btn primary-btn">저장</button>
                    <button className="btn primary-btn" onClick={onClose}>
                        닫기
                    </button>
                </div>
            </div>
        )
    }

    const addBodyTemplate = (rowData: any) => {
        const onClickBtn = () => {
            setFinishList((prev) => prev.concat(rowData))
        }

        return <Button icon="pi pi-plus" className="p-button-rounded p-button-text" onClick={onClickBtn}></Button>
    }

    const deleteBodyTemplate = (rowData: any) => {
        const onClickBtn = () => {
            setFinishList((prev) => prev.filter((it) => it.id !== rowData.id))
        }

        return <Button icon="pi pi-minus" className="p-button-rounded p-button-text" onClick={onClickBtn}></Button>
    }

    const boxQtyEditor = (rowData: any) => {
        console.log(rowData)
        return <InputNumber className="h-[30px] text-xs" />
    }

    const paletteNumberEditor = (rowData: any) => {
        return <InputNumber className="h-[30px] text-xs" />
    }

    const ableQtyBodyTemplate = (rowData: any) => {
        const { outQty, boxPerQty } = rowData
        return outQty / boxPerQty + ':' + outQty
    }

    return (
        <Dialog visible={true} onHide={onClose} header={Header} closable={false}>
            <div className="flex flex-col space-y-2">
                <div className="card">
                    <DataTable value={unFinishList} className="text-sm" emptyMessage="데이터가 없습니다.">
                        <Column align="center" field="id" header="No" body={seqBodyTemplate} />
                        <Column align="center" field="productName" headerClassName="w-[500px]" header="제품명" />
                        <Column align="center" field="outQty" header="제트출고수량" />
                        <Column align="center" field="requestQty" header="제트요청수량" />
                        <Column align="center" field="ableQty" header="가용수량" body={ableQtyBodyTemplate} />
                        <Column align="center" field="boxQty" header="박스수량" editor={boxQtyEditor} />
                        <Column align="center" field="paletteNumber" header="파렛트번호" editor={paletteNumberEditor} />
                        <Column align="center" field="id" header="추가" body={addBodyTemplate} />
                    </DataTable>
                </div>
                <div className="card">
                    <DataTable value={finishList} className="text-sm" emptyMessage="데이터가 없습니다.">
                        <Column align="center" field="id" header="No" body={seqBodyTemplate} />
                        <Column align="center" field="productName" headerClassName="w-[500px]" header="제품명" />
                        <Column align="center" field="outQty" header="출고수량" />
                        <Column align="center" field="boxQty" header="박스수량" />
                        <Column align="center" field="paletteNumber" header="파렛트번호" />
                        <Column align="center" field="id" header="삭제" body={deleteBodyTemplate} />
                    </DataTable>
                </div>
            </div>
        </Dialog>
    )
}

export default PaletteManageDialog
