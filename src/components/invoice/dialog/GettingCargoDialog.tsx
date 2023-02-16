import axios from 'axios'
import { map, sumBy } from 'lodash'
import numeral from 'numeral'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { Column } from 'primereact/column'
import { ColumnGroup } from 'primereact/columngroup'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { Row } from 'primereact/row'
import React, { useState } from 'react'
import { BASE_URL } from 'src/api/ApiConfig'
import { imageBodyTemplate, seqBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'

type Props = {
    open: boolean
    closeModal: () => void
}

const fakeData = {
    eta: '2023-02-13', //입고예정일
    ata: '', //실제입고일
    forwardCompany: '마린',
    message: '전달사항 테스트',
    cargoList: [
        {
            pk: '1',
            orderNum: '5156',
            item: {
                itemName: '',
                sellerName: 'LKR',
                managerName: '테스트',
                options: ['그레이 44/45 (265~270)', '옵션2'],
                itemImageUrls: ['http://api.ezmodoo.com/files/63d8a7702c85d_d6a32f9149ba68b7_1617bbfc4af261cb31de93e76a5f7b1dc93f9c5c_jpg'],
                nwt: 0.5,
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
                nwt: 0.25,
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
                packing: 'palette',
                isBarcode: 'N',
                memo: '메모 테스트',
            },
        },
        {
            pk: '3',
            orderNum: '5158',
            item: {
                itemName: '',
                sellerName: 'imama',
                managerName: '테스트',
                options: ['옵션1', '옵션2'],
                itemImageUrls: ['http://api.ezmodoo.com/files/63d8a7702c85d_d6a32f9149ba68b7_1617bbfc4af261cb31de93e76a5f7b1dc93f9c5c_jpg'],
                nwt: 0.15,
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
                packing: 'palette',
                isBarcode: 'N',
                memo: '',
            },
        },
    ].map((order) => ({ ...order, image: order.item.itemImageUrls[0] })),
}

function GettingCargoDialog(props: Props) {
    const { open, closeModal } = props
    const [checkList, setCheckList] = useState<string[]>([])
    const [memoPk, setMemoPk] = useState<string>('')
    const [cargoList, setCargoList] = useState<any[]>(fakeData.cargoList)
    const [cargoMessage, setCargoMessage] = useState<string>(fakeData.message)

    const closeMemo = (pk: string, value: string) => {
        saveMemo(pk, value)
        setMemoPk('')
    }

    const openMemo = (pk: string) => {
        console.log(pk)
        setMemoPk(pk)
    }

    const onChangeMemo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target

        setCargoList(map(cargoList, (item) => (item.pk === name ? { ...item, invoice: { ...item.invoice, memo: value } } : item)))
    }

    const addStock = async () => {
        try {
            if (window.confirm('재고에 반영하시겠습니까?')) {
            }
        } catch (err) {
            console.error(err)
        }
    }

    const saveMemo = async (pk: string, value: string) => {
        try {
            console.log(pk, value)
            // await axios.post(BASE_URL + '')
        } catch (err) {
            console.error(err)
        }
    }

    const memoBodyTemplate = (rowData: any, option: any) => {
        const pk = rowData.pk
        const { rowIndex } = option

        return (
            <div className="relative flex justify-center items-center">
                <Button
                    className={`p-button-rounded p-button-${cargoList[rowIndex].invoice.memo.length > 1 ? 'primary' : 'secondary'} p-button-text`}
                    onClick={() => openMemo(pk)}
                >
                    <i className="fa-regular fa-file-lines text-lg"></i>
                </Button>

                <div
                    className={`absolute ${rowIndex === cargoList.length - 1 ? 'top-[-66px] left-[-166px]' : 'bottom-[-66px] left-[-166px]'} z-10 ${
                        pk === memoPk ? 'block' : 'hidden'
                    }`}
                >
                    <div className="relative">
                        <Button
                            icon="pi pi-times"
                            style={{ position: 'absolute', width: 25, height: 25, padding: 0 }}
                            className={`${
                                rowIndex === cargoList.length - 1 ? 'right-[-5px] bottom-[-5px]' : 'right-[-5px] top-[-5px]'
                            } p-button-sm p-button-secondary p-button-rounded`}
                            onClick={() => closeMemo(pk, cargoList[rowIndex].invoice.memo)}
                        />
                        <InputTextarea
                            rows={3}
                            style={{ width: 200, resize: 'none' }}
                            name={pk}
                            value={cargoList[rowIndex].invoice.memo}
                            onChange={onChangeMemo}
                        />
                    </div>
                </div>
            </div>
        )
    }

    const onChangeDropDown = (event: DropdownChangeParams) => {
        const { value, target } = event
        const { name, id } = target

        setCargoList(
            cargoList.map((item) => {
                if (item.pk === id) {
                    console.log('match : ', name, id, value)
                    return { ...item, invoice: { ...item.invoice, [name]: value } }
                } else {
                    return item
                }
            })
        )
    }

    const packingBodyTemplate = (rowData: any) => {
        const options = [
            { label: '박스', value: 'box' },
            { label: '파렛트', value: 'palette' },
        ]
        return (
            <Dropdown
                id={rowData.pk}
                options={options}
                optionLabel="label"
                optionValue="value"
                name="packing"
                value={rowData.invoice.packing}
                onChange={onChangeDropDown}
                className="border-none w-[100px] text-left"
            />
        )
    }

    const isBarcodeBodyTemplate = (rowData: any, option: any) => {
        const options = [
            { label: '부착', value: 'Y' },
            { label: '미부착', value: 'N' },
        ]
        return (
            <Dropdown
                id={rowData.pk}
                options={options}
                optionLabel="label"
                optionValue="value"
                name="isBarcode"
                value={rowData.invoice.isBarcode}
                className="border-none w-[100px] text-left"
                onChange={onChangeDropDown}
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

    const onChangeCargoMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCargoMessage(event.target.value)
    }

    const saveCargoMessage = async (pk: string) => {
        try {
            await axios.post(BASE_URL + '', { pk, message: cargoMessage })
        } catch (err) {
            console.error(err)
        }
    }

    const footerMessage = () => {
        return (
            <div className="flex items-center space-x-2">
                <InputTextarea className="flex-1" rows={2} style={{ resize: 'none' }} value={cargoMessage} onChange={onChangeCargoMessage} />
                <button className="border p-2 min-w-[50px] h-[30px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">저장</button>
            </div>
        )
    }

    const footerCheckQty = (
        <div className="flex flex-col items-center justify-center space-y-1">
            <span>{numeral(sumBy(cargoList, (item) => item.invoice.qty)).format('0,0')}</span>
            {!fakeData.ata && (
                <Button label="입고확인" className="p-button-info p-button-outlined text-[12px] w-[70px] h-[30px] p-0" onClick={addStock} />
            )}
        </div>
    )

    const headerTitle = () => {
        return (
            <div
                className="bg-[#037078] text-white w-full h-[36px] flex justify-center items-center space-x-5"
                style={{ borderRadius: '10px 10px 0px 0px' }}
            >
                <span>입고예정일 : {fakeData.eta}</span>
                <span>/</span>
                <span>포워딩 : {fakeData.forwardCompany}</span>
            </div>
        )
    }

    const headerGroup = (
        <ColumnGroup>
            <Row>
                <Column style={{ textAlign: 'center', background: 'white', color: 'white', padding: 0 }} header={headerTitle} colSpan={7} />
                <Column className="border-l-0" style={{ textAlign: 'center', background: 'white', color: 'white', padding: 0 }} colSpan={15} />
            </Row>

            <Row>
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="NO" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="IMG" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="발주번호" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="판매처" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="제품코드" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="담당자" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="상품명" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="바코드" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="옵션1" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="옵션2" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="상품수량" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="박스수량" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="CBM" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="패킹상태" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="바코드부착여부" />
                <Column style={{ background: '#0D3157', color: 'white' }} align="center" header="코멘트" />
            </Row>
        </ColumnGroup>
    )

    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column style={{ textAlign: 'center', background: '#0D3157', color: 'white' }} footer="전달사항" colSpan={2} />
                <Column style={{ textAlign: 'center', background: 'white' }} footer={footerMessage} colSpan={8} />
                <Column style={{ textAlign: 'center', background: '#0D3157', color: 'white' }} footer="계" />
                <Column style={{ textAlign: 'center', background: 'white' }} footer={footerCheckQty} />
                <Column
                    style={{ textAlign: 'center', background: 'white' }}
                    footer={numeral(sumBy(cargoList, (item) => item.invoice.qty / item.invoice.cbm)).format('0,0.0')}
                />
                <Column
                    style={{ textAlign: 'center', background: 'white' }}
                    footer={numeral(sumBy(cargoList, (item) => item.invoice.cbm)).format('0,0.00')}
                />
                <Column style={{ textAlign: 'center', background: 'white' }} footer="" />
                <Column style={{ textAlign: 'center', background: '#0D3157', color: 'white' }} footer="화물총중량(kg)" />
                <Column
                    style={{ textAlign: 'center', background: 'white' }}
                    footer={numeral(sumBy(cargoList, (item) => item.invoice.qty * item.item.nwt)).format('0,0')}
                />
            </Row>
        </ColumnGroup>
    )

    return (
        <Dialog header={Header} onHide={closeModal} visible={open} className="w-[80vw]" closable={false}>
            <div>
                <DataTable value={cargoList} className="text-[12px]" footerColumnGroup={footerGroup} headerColumnGroup={headerGroup}>
                    <Column align="center" body={seqBodyTemplate} />
                    <Column align="center" className="max-w-[50px]" field="pk" body={checkBoxBodyTemplate} />
                    <Column align="center" field="image" className="p-0" body={imageBodyTemplate} />
                    <Column align="center" field="orderNum" />
                    <Column align="center" field="item.sellerName" />
                    <Column align="center" field="item.units.0.skuId" />
                    <Column align="center" field="item.managerName" />
                    <Column align="center" field="item.units.0.skuName" className="w-[200px]" />
                    <Column align="center" field="item.units.0.barcode" />
                    <Column align="center" field="item.options.0" className="min-w-[150px]" />
                    <Column align="center" field="item.options.1" className="min-w-[150px]" />
                    <Column align="center" field="invoice.qty" />
                    <Column align="center" field="invoice.qty" />
                    <Column align="center" field="invoice.cbm" />
                    <Column align="center" field="invoice.packing" body={packingBodyTemplate} />
                    <Column align="center" field="invoice.isBarcode" body={isBarcodeBodyTemplate} />
                    <Column align="center" field="invoice.memo" body={memoBodyTemplate} />
                </DataTable>
            </div>
        </Dialog>
    )
}

export default GettingCargoDialog
