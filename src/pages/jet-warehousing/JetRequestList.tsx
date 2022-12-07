import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { flatten, map, sumBy } from 'lodash'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { DropdownChangeParams } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import PaletteManageDialog from 'src/components/jet-request/palette-manage-dialog/PaletteManageDialog'
import ReqeustInfoDialog from 'src/components/jet-request/request-info-dialog/ReqeustInfoDialog'
import SearchCateDateRangeOption from 'src/components/search-box/SearchCateDateRangeOption'
import { dateBodyTemplate, seqBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'
import { lineHeader } from 'src/hooks/data-table-hooks/HeaderHooks'

const fakeData: any[] = flatten(
    map(
        [
            {
                pk: '1',
                groupId: '3',

                products: [
                    {
                        pk: '1',
                        seller: 'LKR',
                        createdAt: '2022-11-30 09:56:00',
                        manager: '테스트',
                        productName: '로지 레스트룸 스마일 욕실화 2P',
                        intendedDate: '2022-12-03',
                        item: {
                            pk: '1',
                            optionId: '80949810349',
                            itemOptions: ['화이트+블랙', '白色+黑色(44-45)'],
                            marketSkuId: '23202382',
                        },

                        stock: {
                            availableQty: 288,
                            coupangQty: 958,
                        },
                        trade: {
                            qryPerBox: 24,
                        },
                        jetRequest: {
                            requestQty: 288,
                            sendQty: 0,
                        },
                        deliveryInfo: {
                            type: 'MKR',
                        },
                    },
                    {
                        pk: '2',
                        seller: 'LKR',
                        createdAt: '2022-11-30 09:56:00',
                        manager: '테스트',
                        productName: '로지 미끄럼방지 물빠짐 욕실화 2세트	',
                        intendedDate: '2022-12-03',
                        item: {
                            pk: '1',
                            optionId: '80843067773',
                            itemOptions: ['44-45', '블랙+그레이'],
                            marketSkuId: '22851078',
                        },

                        stock: {
                            availableQty: 288,
                            coupangQty: 958,
                        },
                        trade: {
                            qryPerBox: 24,
                        },
                        jetRequest: {
                            requestQty: 288,
                            sendQty: 0,
                        },
                        deliveryInfo: {
                            type: 'MKR',
                        },
                    },
                ],
            },
            {
                pk: '2',
                groupId: '2',

                products: [
                    {
                        pk: '1',
                        seller: '아이마마',
                        createdAt: '2022-11-30 09:56:00',
                        manager: '테스트',
                        productName: '로지 레스트룸 스마일 욕실화 2P',
                        intendedDate: '2022-12-03',
                        item: {
                            pk: '1',
                            optionId: '80949810349',
                            itemOptions: ['화이트+블랙', '白色+黑色(44-45)'],
                            marketSkuId: '23202382',
                        },

                        stock: {
                            availableQty: 288,
                            coupangQty: 958,
                        },
                        trade: {
                            qryPerBox: 24,
                        },
                        jetRequest: {
                            requestQty: 288,
                            sendQty: 0,
                        },
                        deliveryInfo: {
                            type: 'MKR',
                        },
                    },
                    {
                        pk: '2',
                        seller: '아이마마',
                        createdAt: '2022-11-30 09:56:00',
                        manager: '테스트',
                        productName: '로지 미끄럼방지 물빠짐 욕실화 2세트	',
                        intendedDate: '2022-12-03',
                        item: {
                            pk: '1',
                            optionId: '80843067773',
                            itemOptions: ['44-45', '블랙+그레이'],
                            marketSkuId: '22851078',
                        },

                        stock: {
                            availableQty: 288,
                            coupangQty: 958,
                        },
                        trade: {
                            qryPerBox: 16,
                        },
                        jetRequest: {
                            requestQty: 288,
                            sendQty: 0,
                        },
                        deliveryInfo: {
                            type: 'MKR',
                        },
                    },
                ],
            },
            {
                pk: '3',
                groupId: '3',

                products: [
                    {
                        pk: '1',
                        seller: 'LKR',
                        createdAt: '2022-11-30 09:56:00',
                        manager: '테스트',
                        productName: '로지 레스트룸 스마일 욕실화 2P',
                        intendedDate: '2022-12-03',
                        item: {
                            pk: '1',
                            optionId: '80949810349',
                            itemOptions: ['화이트+블랙', '白色+黑色(44-45)'],
                            marketSkuId: '23202382',
                        },

                        stock: {
                            availableQty: 288,
                            coupangQty: 958,
                        },
                        trade: {
                            qryPerBox: 12,
                        },
                        jetRequest: {
                            requestQty: 288,
                            sendQty: 0,
                        },
                        deliveryInfo: {
                            type: 'MKR',
                        },
                    },
                    {
                        pk: '2',
                        seller: 'LKR',
                        createdAt: '2022-11-30 09:56:00',
                        manager: '테스트',
                        productName: '로지 미끄럼방지 물빠짐 욕실화 2세트	',
                        intendedDate: '2022-12-03',
                        item: {
                            pk: '1',
                            optionId: '80843067773',
                            itemOptions: ['44-45', '블랙+그레이'],
                            marketSkuId: '22851078',
                        },

                        stock: {
                            availableQty: 288,
                            coupangQty: 958,
                        },
                        trade: {
                            qryPerBox: 24,
                        },
                        jetRequest: {
                            requestQty: 288,
                            sendQty: 0,
                        },
                    },
                ],
            },
            {
                pk: '4',
                groupId: '',

                products: [
                    {
                        pk: '1',
                        seller: 'LKR',
                        createdAt: '2022-11-30 09:56:00',
                        manager: '테스트',
                        productName: '로지 레스트룸 스마일 욕실화 2P',
                        intendedDate: '2022-12-03',
                        item: {
                            pk: '1',
                            optionId: '80949810349',
                            itemOptions: ['화이트+블랙', '白色+黑色(44-45)'],
                            marketSkuId: '23202382',
                        },

                        stock: {
                            availableQty: 288,
                            coupangQty: 958,
                        },
                        trade: {
                            qryPerBox: 12,
                        },
                        jetRequest: {
                            requestQty: 288,
                            sendQty: 0,
                        },
                        deliveryInfo: {
                            type: 'MKR',
                        },
                    },
                ],
            },
            {
                pk: '5',
                groupId: '',

                products: [
                    {
                        pk: '1',
                        seller: 'LKR',
                        createdAt: '2022-11-30 09:56:00',
                        manager: '테스트',
                        productName: '로지 레스트룸 스마일 욕실화 2P',
                        intendedDate: '2022-12-03',
                        item: {
                            pk: '1',
                            optionId: '80949810349',
                            itemOptions: ['화이트+블랙', '白色+黑色(44-45)'],
                            marketSkuId: '23202382',
                        },

                        stock: {
                            availableQty: 288,
                            coupangQty: 958,
                        },
                        trade: {
                            qryPerBox: 12,
                        },
                        jetRequest: {
                            requestQty: 288,
                            sendQty: 0,
                        },
                        deliveryInfo: {
                            type: 'MKR',
                        },
                    },
                ],
            },
        ],
        (data) => {
            return map(data.products, (product) => ({
                ...product,
                groupId: data.groupId || data.pk,
                boxQty: product.jetRequest.requestQty / product.trade.qryPerBox,
            }))
        }
    )
)

type SerachOptions = {
    dateRangeCate: 'createdAt'
    startDate: Date
    endDate: Date
}

const dateRangeCateOptions: SearchCate[] = [
    {
        label: '등록일',
        field: 'createdAt',
    },
]

const initSearchOptions: SerachOptions = {
    dateRangeCate: 'createdAt',
    startDate: new Date(),
    endDate: new Date(),
}

type DialogId = 'MKR' | 'palette' | 'printList'
type MkrDialogProps = {
    acceptNumber: string
}

function JetRequestList() {
    const [searchOptions, setSearchOptions] = useState<SerachOptions>(initSearchOptions)
    const [selection, setSelection] = useState([])
    const [dialogId, setDialogId] = useState<DialogId>()
    const [mkrDialogProps, setMrkDialogProps] = useState<MkrDialogProps>()

    const closeDialog = () => {
        setDialogId(undefined)
    }

    const openMRKDialog = () => {
        setDialogId('MKR')
    }

    const openPaletteManageDialog = () => {
        setDialogId('palette')
    }

    const onChangeDates = (range: { startDate: Date; endDate: Date }) => {
        const { startDate, endDate } = range

        setSearchOptions((prev) => ({ ...prev, startDate, endDate }))
    }

    const onChangeSearchOptionDropdown = (event: DropdownChangeParams) => {
        setSearchOptions((prev) => ({
            ...prev,
            [event.target.name]: event.value,
        }))
    }

    const totalBoxQtyBodyTemplate = (rowData: any) => {
        return sumBy(
            fakeData.filter((it) => it.groupId === rowData.groupId),
            'boxQty'
        )
    }

    const sellerBodyTemplate = (rowData: any) => {
        return <span style={{ whiteSpace: 'nowrap' }}>{rowData.seller}</span>
    }

    const requestNumberTemplate = (rowData: any) => {
        return (
            <button className="p-1" onClick={openMRKDialog}>
                {rowData.requestNumber ?? '-'}
            </button>
        )
    }

    const createdAtBodyTemplate = (rowData: any) => {
        return (
            <div className="flex flex-col justify-center items-center px-1">
                <span style={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}>{dayjs(rowData.createdAt).format('YYYY-MM-DD')}</span>
                <span style={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}>{dayjs(rowData.createdAt).locale('ko').format('ddd요일 HH:mm')}</span>
            </div>
        )
    }

    const paletteInfoBodyTemplate = (rowData: any) => {
        return (
            <div className="flex items-center">
                <Button
                    tooltipOptions={{ position: 'bottom' }}
                    tooltip="파렛트 적재"
                    icon="pi pi-table"
                    className="p-button-rounded p-button-text p-button-secondary"
                    onClick={openPaletteManageDialog}
                ></Button>
                <Button
                    tooltipOptions={{ position: 'bottom' }}
                    tooltip="적재리스트"
                    icon="pi pi-print"
                    className="p-button-rounded p-button-text p-button-secondary"
                ></Button>
                <Button tooltipOptions={{ position: 'bottom' }} tooltip="완료" icon="pi pi-check" className="p-button-rounded p-button-text"></Button>
            </div>
        )
    }

    const dateEditor = (props: any) => {
        console.log(props)
        return <InputText type="date" />
    }

    return (
        <div>
            <div className="page-header border rounded-lg flex bg-white mb-5">
                <div>
                    <div className="flex items-center px-4 pt-4 border-b h-[66px] box-border min-w-[70vw]">
                        <div className="flex flex-col justify-center ">
                            <span className="font-bold text-lg relative">제트입고요청</span>
                            <div className="border-2 w-full border-blue-500 relative -bottom-[14px]"></div>
                        </div>
                        <span className="border rounded bg-white p-1 text-[11px] ml-4">Total : 123</span>
                    </div>
                    <div className="flex space-x-4 px-4 pt-4">
                        <SearchCateDateRangeOption
                            startDate={searchOptions.startDate}
                            endDate={searchOptions.endDate}
                            onChangeDates={onChangeDates}
                            options={dateRangeCateOptions}
                            cate={searchOptions.dateRangeCate}
                            onChangeDropdown={onChangeSearchOptionDropdown}
                        />
                    </div>
                </div>
                <div className="border-l flex flex-col">
                    <div className="h-[65px]"></div>
                    <div className="flex items-end space-x-2 p-4">
                        <button className="btn default-btn">초기화</button>
                        <button className="btn primary-btn">검색</button>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="flex items-center justify-between pb-4">
                    <div className="flex items-center space-x-2">
                        <button className="btn primary-btn">그룹 병합</button>
                        <button className="btn primary-btn">그룹 해제</button>
                        <button className="border border-[#098000] rounded bg-white flex items-center space-x-2 p-1 px-2 h-[30px]">
                            <img src="./assets/icons/excel.png" alt="excel" width={28} className="object-contain" />
                            <span className="font-bold text-black text-sm">엑셀 다운로드</span>
                        </button>
                    </div>
                    <div></div>
                </div>

                <DataTable
                    value={fakeData}
                    removableSort
                    rows={5}
                    resizableColumns
                    className="text-sm"
                    scrollHeight="82vh"
                    sortMode="multiple"
                    selectionMode="checkbox"
                    columnResizeMode="expand"
                    responsiveLayout="scroll"
                    rowGroupMode="rowspan"
                    rowClassName={() => 'border-t-2 border-b-2'}
                    groupRowsBy="groupId"
                    selection={selection}
                    onSelectionChange={(e) => setSelection(e.value)}
                >
                    <Column align="center" className="max-w-[50px]" selectionMode="multiple" selectionAriaLabel="pk" field="id"></Column>
                    <Column align="center" field="pk" header="NO" body={seqBodyTemplate} />
                    <Column align="center" field="groupId" header="셀러" body={sellerBodyTemplate} />
                    <Column align="center" field="groupId" header={lineHeader('입고요청 승인번호')} body={requestNumberTemplate} />
                    <Column align="center" field="createdAt" header="등록일" body={createdAtBodyTemplate} />
                    <Column align="center" field="manager" header="담당자" />
                    <Column align="center" field="item.marketSkuId" header="SKU No" />
                    <Column align="center" field="item.optionId" header="옵션ID" />
                    <Column align="center" field="productName" header="상품명" />
                    <Column align="center" field="item.itemOptions.0" header="옵션1" />
                    <Column align="center" field="item.itemOptions.1" header="옵션2" />
                    <Column align="center" field="stock.availableQty" header={lineHeader('창고 재고량')} />
                    <Column align="center" field="stock.coupangQty" header={lineHeader('쿠팡 재고량')} />
                    <Column align="center" field="jetRequest.sendQty" className="bg-green-100" editor header={lineHeader('제트 출고수량')} />
                    <Column align="center" field="jetRequest.requestQty" className="bg-green-100" editor header={lineHeader('제트 요청수량')} />
                    <Column align="center" field="trade.qryPerBox" className="bg-green-100" editor header={lineHeader('박스 입수량')} />
                    <Column align="center" field="boxQty" header={lineHeader('박스 수량')} />
                    <Column align="center" field="groupId" header={lineHeader('박스 합계')} body={totalBoxQtyBodyTemplate} />
                    <Column align="center" field="groupId" header="입고예정일" body={(rowData) => dateBodyTemplate(rowData.intendedDate)} />
                    <Column
                        align="center"
                        field="groupId"
                        header="픽업일"
                        body={(rowData) => dateBodyTemplate(rowData.intendedDate)}
                        editor={dateEditor}
                    />
                    <Column align="center" field="groupId" header="" body={paletteInfoBodyTemplate} />
                </DataTable>
            </div>
            {dialogId === 'MKR' && <ReqeustInfoDialog onClose={closeDialog} />}
            {dialogId === 'palette' && <PaletteManageDialog onClose={closeDialog} />}
        </div>
    )
}

export default JetRequestList
