import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { ColumnGroup } from 'primereact/columngroup'
import { Dialog } from 'primereact/dialog'
import { Row } from 'primereact/row'
import React, { useState } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { imageBodyTemplate, seqBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'
import { Dropdown } from 'primereact/dropdown'
import { Checkbox } from 'primereact/checkbox'

type Props = {
    open: boolean
    closeModal: () => void
}

const fakeData = [
    {
        pk: '1',
        orderNum: '5156',
        item: {
            itemName: '',
            sellerName: 'LKR',
            managerName: '테스트',
            options: ['그레이 44/45 (265~270)', '옵션2'],
            itemImageUrls: ['http://api.ezmodoo.com/files/63d8a7702c85d_d6a32f9149ba68b7_1617bbfc4af261cb31de93e76a5f7b1dc93f9c5c_jpg'],
            units: [
                {
                    barcode: 'S0024452545852',
                    skuId: '12345',
                    skuName: '로지 초강력 네오디움 자석걸이 16mm (10개입) 20mm (6개입)',
                    trade: {
                        qtyPerBox: 10,
                    },
                },
            ],
        },
        invoice: {
            qty: 1000,
            cbm: 13.02,
            packing: 'box',
            isBarcode: 'Y',
            memo: '어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구',
        },
    },
    {
        pk: '2',
        orderNum: '5157',
        item: {
            itemName: '',
            sellerName: 'imama',
            managerName: '테스트',
            options: ['옵션1', '옵션2'],
            itemImageUrls: ['http://api.ezmodoo.com/files/63d8a7702c85d_d6a32f9149ba68b7_1617bbfc4af261cb31de93e76a5f7b1dc93f9c5c_jpg'],
            units: [
                {
                    barcode: 'S0024452545852',
                    skuId: '12345',
                    skuName: '로지 초강력 네오디움 자석걸이 16mm (10개입) 20mm (6개입)',
                    trade: {
                        qtyPerBox: 10,
                    },
                },
            ],
        },
        invoice: {
            qty: 1000,
            cbm: 13.02,
            packing: 'box',
            isBarcode: 'N',
            memo: '',
        },
    },
].map((order, idx) => ({ ...order, image: order.item.itemImageUrls[0] }))

function GettingCargoDialog(props: Props) {
    const { open, closeModal } = props
    const [checkList, setCheckList] = useState<string[]>([])

    const Header = () => {
        return (
            <div className="flex justify-end space-x-4">
                <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">선택분할</button>
                <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">인쇄</button>
                <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]" onClick={closeModal}>
                    닫기
                </button>
            </div>
        )
    }

    const memoBodyTemplate = (rowData: any) => {
        const memo = rowData.invoice.memo

        return (
            <Button className={`p-button-rounded p-button-${memo.length > 1 ? 'primary' : 'secondary'} p-button-text`} onClick={() => {}}>
                <i className="fa-regular fa-file-lines text-lg"></i>
            </Button>
        )
    }

    const isBarcodeBodyTemplate = (rowData: any, option: any) => {
        const options = [
            { label: '부착', value: 'Y' },
            { label: '미부착', value: 'N' },
        ]
        return (
            <Dropdown
                options={options}
                optionLabel="label"
                optionValue="value"
                value={rowData.invoice.isBarcode}
                className="border-none w-[100px] text-left"
            />
        )
    }

    const checkBoxBodyTemplate = (pk: string) => {
        return (
            <Checkbox
                value={pk}
                checked={checkList.includes(pk)}
                onChange={(event) => setCheckList((prev) => (prev.includes(pk) ? prev.filter((it) => it !== pk) : prev.concat(event.value)))}
            />
        )
    }

    const footerMessage = (
        <div className="flex items-center space-x-2">
            <InputTextarea className="flex-1" rows={2} style={{ resize: 'none' }} />
            <button className="border p-2 min-w-[50px] h-[30px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">저장</button>
        </div>
    )

    const footerCheckQty = (
        <div className="flex flex-col items-center justify-center space-y-1">
            <span>7,000</span>
            <Button label="입고확인" className="p-button-info p-button-outlined text-[12px] w-[70px] h-[30px] p-0" />
        </div>
    )

    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column style={{ textAlign: 'center', background: '#0D3157', color: 'white' }} footer="전달사항" colSpan={2} />
                <Column style={{ textAlign: 'center', background: 'white' }} footer={footerMessage} colSpan={8} />
                <Column style={{ textAlign: 'center', background: '#0D3157', color: 'white' }} footer="계" />
                <Column style={{ textAlign: 'center', background: 'white' }} footer="7,000" />
                <Column style={{ textAlign: 'center', background: 'white' }} footer="25" />
                <Column style={{ textAlign: 'center', background: 'white' }} footer="91.14" />
                <Column style={{ textAlign: 'center', background: 'white' }} footer={footerCheckQty} />
                <Column style={{ textAlign: 'center', background: '#0D3157', color: 'white' }} footer="화물적재량" />
                <Column style={{ textAlign: 'center', background: 'white' }} footer="1,234" />
            </Row>
        </ColumnGroup>
    )

    return (
        <Dialog header={Header} onHide={closeModal} visible={open} className="w-[80vw]" closable={false}>
            <div>
                <DataTable value={fakeData} className="text-[12px]" footerColumnGroup={footerGroup}>
                    <Column align="center" header="NO" body={seqBodyTemplate} />
                    <Column align="center" className="max-w-[50px]" field="pk" body={checkBoxBodyTemplate} />
                    <Column align="center" header="IMG" field="image" className="p-0" body={imageBodyTemplate} />
                    <Column align="center" header="발주번호" field="orderNum" />
                    <Column align="center" header="판매처" field="item.sellerName" />
                    <Column align="center" header="제품코드" field="item.units.0.skuId" />
                    <Column align="center" header="담당자" field="item.managerName" />
                    <Column align="center" header="상품명" field="item.units.0.skuName" className="w-[200px]" />
                    <Column align="center" header="바코드" field="item.units.0.barcode" />
                    <Column align="center" header="옵션1" field="item.options.0" className="min-w-[150px]" />
                    <Column align="center" header="옵션2" field="item.options.1" className="min-w-[150px]" />
                    <Column align="center" header="상품수량" field="invoice.qty" />
                    <Column align="center" header="박스수량" field="invoice.qty" />
                    <Column align="center" header="CBM" field="invoice.cbm" />
                    <Column align="center" header="패킹상태" field="invoice.packing" />
                    <Column align="center" header="바코드부착여부" field="invoice.isBarcode" body={isBarcodeBodyTemplate} />
                    <Column align="center" header="코멘트" field="invoice.memo" body={memoBodyTemplate} />
                </DataTable>
            </div>
        </Dialog>
    )
}

export default GettingCargoDialog
