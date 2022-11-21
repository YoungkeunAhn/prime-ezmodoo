import { difference, filter, flatten, map } from 'lodash'
import { Column, ColumnEditorOptions } from 'primereact/column'
import { DataTable, DataTableRowClickEventParams, DataTableRowReorderParams } from 'primereact/datatable'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import React, { useState } from 'react'
import { fakeConfig } from 'src/common/fake-data/config'
import TradeInfoBox from 'src/components/product-manage/dialog/list-view/TradeInfoBox'
import VendorInfoBox from 'src/components/product-manage/dialog/list-view/VendorInfoBox'
import { numberEditor, textEditor } from 'src/hooks/data-table-hooks/EditorHooks'
import { marketTemplate } from 'src/hooks/dropdown/ValueTemplate'
import { ContentProductItem, ITrade, IVendor } from 'src/types/product-manage'
import { ecommerceList } from '../../ProductManageList'

type Props = {
    productItemList: ContentProductItem[]
    vendorInfo: IVendor
    tradeInfo: ITrade
    checkList: string[]
    rowReorder: (event: DataTableRowReorderParams) => void
    onChangeDropdown: (event: DropdownChangeParams, index: number) => void
    onChangeVendor: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChangeTrade: (event: React.ChangeEvent<HTMLInputElement>) => void
    onToggleCheckbox: (pk: string) => void
}

function ProductListView(props: Props) {
    const { productItemList, tradeInfo, vendorInfo, checkList, onChangeVendor, onChangeTrade, rowReorder, onChangeDropdown, onToggleCheckbox } = props

    const [selected, setSelected] = useState<any[]>(
        flatten(
            map(checkList, (checked) => {
                return filter(productItemList, (item) => {
                    return item.pk === checked
                })
            })
        )
    )

    const marketIdBodyTemplate = (rowData: any, option: any) => {
        return (
            <Dropdown
                className="w-full border-none mt-1"
                name="marketId"
                optionLabel="name"
                optionValue="id"
                value={rowData.marketId}
                options={fakeConfig.markets}
                valueTemplate={marketTemplate(rowData[option.field])}
                itemTemplate={(option) => marketTemplate(option.id)}
                onChange={(event) => {
                    onChangeDropdown(event, option.rowIndex)
                }}
            />
        )
    }

    const onChangeSelection = (event: any) => {
        setSelected(event.value)

        let diffPk = []
        if (event.value.length === 0) {
            diffPk = difference(checkList, map(event.value, 'pk'))
        } else {
            diffPk = difference(map(event.value, 'pk'), checkList)
        }

        diffPk.forEach((pk) => onToggleCheckbox(pk))
    }

    return (
        <div className="flex flex-col pb-2">
            <DataTable
                value={productItemList}
                onRowReorder={rowReorder}
                className="border-t-4 border-t-[#0D3157] border h-[60vh]"
                selection={selected}
                selectionMode="checkbox"
                onSelectionChange={onChangeSelection}
            >
                <Column align="center" rowReorder headerStyle={{ width: '10px' }} />
                <Column align="center" selectionMode="multiple" selectionAriaLabel="id" headerStyle={{ width: '10px' }} field="id"></Column>
                <Column align="center" className="text-[12px]" field="sellerName" header="판매사" />
                <Column
                    align="center"
                    className="text-[12px]"
                    field="marketId"
                    header="판매처"
                    headerStyle={{ width: '130px' }}
                    body={marketIdBodyTemplate}
                />
                <Column align="center" className="text-[12px]" field="stockUnitId" header="재고코드" />
                <Column
                    align="center"
                    className="text-[12px]"
                    field="itemId"
                    header="옵션ID"
                    editor={(options: ColumnEditorOptions) => textEditor(options)}
                />
                <Column
                    align="center"
                    className="text-[12px]"
                    field="itemOptions.0"
                    header="옵션1"
                    editor={(options: ColumnEditorOptions) => textEditor(options)}
                />
                <Column
                    align="center"
                    className="text-[12px]"
                    field="itemOptions.1"
                    header="옵션2"
                    editor={(options: ColumnEditorOptions) => textEditor(options)}
                />
                <Column
                    align="center"
                    className="text-[12px]"
                    field="totalQty"
                    header="창고재고량"
                    editor={(options: ColumnEditorOptions) => numberEditor(options)}
                />
                <Column
                    align="center"
                    className="text-[12px]"
                    field="availableQty"
                    header="가용재고량"
                    editor={(options: ColumnEditorOptions) => numberEditor(options)}
                />
                <Column
                    align="center"
                    className="text-[12px]"
                    field="stockQty"
                    header="쿠팡창고재고량"
                    editor={(options: ColumnEditorOptions) => numberEditor(options)}
                />
                <Column align="center" className="text-[12px]" field="jetRequestStock" header="제트배송-입고요청수량" />
                <Column align="center" className="text-[12px]" field="purchaseStock" header="발주(매입)수량" />
            </DataTable>

            <VendorInfoBox vendorInfo={vendorInfo} onChange={onChangeVendor} />
            <TradeInfoBox tradeInfo={tradeInfo} onChange={onChangeTrade} />
        </div>
    )
}

export default ProductListView
