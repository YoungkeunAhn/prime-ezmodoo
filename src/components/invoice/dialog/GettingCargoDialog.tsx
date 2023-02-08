import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { ColumnGroup } from 'primereact/columngroup'
import { Dialog } from 'primereact/dialog'
import { Row } from 'primereact/row'
import React from 'react'

type Props = {
    open: boolean
    closeModal: () => void
}

const fakeData = [
    {
        pk: '1',
        item: {
            itemName: '',
            sellerName: '',
            managerName: '',
            options: ['', ''],
            units: [
                {
                    barcode: '',
                    unitName: '',
                    skuId: '',
                    skuName: '',
                    trade: {
                        qtyPerBox: 10,
                    },
                },
            ],
            invoice: {
                qty: 1000,
            },
        },
    },
]

function GettingCargoDialog(props: Props) {
    const { open, closeModal } = props

    const Header = () => {
        return (
            <div className="flex justify-end space-x-4">
                <button>선택분할</button>
                <button>인쇄</button>
                <button>닫기</button>
            </div>
        )
    }

    const invoiceMessage = () => {}

    // const footerGroup = (
    //     <ColumnGroup>
    //         <Row>
    //             <Column footer="전달사항" colSpan={2} />
    //             <Column footer="textarea" colSpan={8} />
    //             <Column footer="계" />
    //             <Column footer="7,000" />
    //             <Column footer="25" />
    //             <Column footer="91.14" />
    //             <Column footer="" />
    //             <Column footer="화물적재량" />
    //             <Column footer="1,234" />
    //         </Row>
    //     </ColumnGroup>
    // )

    return (
        <Dialog header={Header} onHide={closeModal} visible={open}>
            <div>
                <DataTable className="text-[12px]">
                    <Column header="NO" />
                    <Column align="center" className="max-w-[50px]" selectionMode="multiple" selectionAriaLabel="pk" field="pk" />
                    <Column header="IMG" />
                    <Column header="발주번호" />
                    <Column header="판매처" />
                    <Column header="제품코드" />
                    <Column header="담당자" />
                    <Column header="상품명" />
                    <Column header="바코드" />
                    <Column header="옵션1" />
                    <Column header="옵션2" />
                    <Column header="상품수량" />
                    <Column header="박스수량" />
                    <Column header="CBM" />
                    <Column header="패킹상태" />
                    <Column header="바코드부착여부" />
                    <Column header="코멘트" />
                </DataTable>
            </div>
        </Dialog>
    )
}

export default GettingCargoDialog
