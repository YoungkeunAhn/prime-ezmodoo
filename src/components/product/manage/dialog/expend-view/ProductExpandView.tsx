import { DropdownChangeParams } from 'primereact/dropdown'
import { InputNumberChangeParams } from 'primereact/inputnumber'
import React, { useEffect } from 'react'
import SortableList from 'react-easy-sort'
import { ContentProductItem, ITrade, IVendor } from 'src/types/product-manage'
import ManageListItem from './ManageListItem'
import TradeInfoTable from './StockInfoTable'
import VendorInfoTable from './VendorInfoTable'

type Props = {
    productItemList: ContentProductItem[]
    checkList: string[]
    vendorInfo: IVendor
    tradeInfo: ITrade
    hideView: boolean
    orderList: any
    jetRequestList: any
    onChangeVendor: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChangeTrade: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChangeProductItemText: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
    onChangeImage: (file: File | string, index: number) => void
    onChangeDropdown: (event: DropdownChangeParams, index: number) => void
    onToggleCheckbox: (pk: string) => void
    onChangeSalePrice: (value: number | null, index: number) => void
    onChangeCouponPrice: (value: number | null, index: number) => void
    onChangePurchasePrice: (value: number | null, index: number) => void
    onChangeDeliveryCharge: (value: number | null, index: number) => void
    onChangeCommissionRate: (value: number | null, index: number) => void
    onChangeOrderQty: (event: InputNumberChangeParams) => void
    onChangeJetRequestQty: (event: InputNumberChangeParams) => void
    onChangeOptionsInput: (event: React.ChangeEvent<HTMLInputElement>, index: number, optionIndex: number) => void
    itemIsVisibleTrue: (pk: string) => void
}

function ProductExpandView(props: Props) {
    const {
        productItemList,
        checkList,
        vendorInfo,
        tradeInfo,
        hideView,
        orderList,
        jetRequestList,
        onChangeVendor,
        onChangeTrade,
        onChangeProductItemText,
        onChangeCommissionRate,
        onChangeDeliveryCharge,
        onChangeDropdown,
        onChangeImage,
        onChangePurchasePrice,
        onChangeSalePrice,
        onChangeCouponPrice,
        onToggleCheckbox,
        onChangeOrderQty,
        onChangeJetRequestQty,
        onChangeOptionsInput,
        itemIsVisibleTrue,
    } = props

    useEffect(() => {
        console.log(productItemList)
    }, [productItemList])

    return (
        <div className="flex border-t-4 border-[#0D3157] h-auto">
            <div className="min-w-[1050px]">
                <SortableList onSortEnd={() => {}} draggedItemClassName="dragged" className="text-[12px] max-h-[76vh] overflow-y-auto manage-list">
                    {hideView
                        ? productItemList.map((productItem, idx) => (
                              <ManageListItem
                                  key={idx}
                                  idx={idx}
                                  checkList={checkList}
                                  productItem={productItem}
                                  orderList={orderList}
                                  jetRequestList={jetRequestList}
                                  onChangeImage={onChangeImage}
                                  onChangeDropdown={onChangeDropdown}
                                  onToggleCheckbox={onToggleCheckbox}
                                  onChangeSalePrice={onChangeSalePrice}
                                  onChangeCouponPrice={onChangeCouponPrice}
                                  onChangeText={onChangeProductItemText}
                                  onChangePurchasePrice={onChangePurchasePrice}
                                  onChangeDeliveryCharge={onChangeDeliveryCharge}
                                  onChangeCommissionRate={onChangeCommissionRate}
                                  onChangeOptionsInput={onChangeOptionsInput}
                                  itemIsVisibleTrue={itemIsVisibleTrue}
                                  onChangeOrderQty={onChangeOrderQty}
                                  onChangeJetRequestQty={onChangeJetRequestQty}
                              />
                          ))
                        : productItemList
                              .filter((item) => item.isVisible)
                              .map((productItem, idx) => (
                                  <ManageListItem
                                      key={idx}
                                      idx={idx}
                                      checkList={checkList}
                                      productItem={productItem}
                                      orderList={orderList}
                                      jetRequestList={jetRequestList}
                                      onChangeImage={onChangeImage}
                                      onChangeDropdown={onChangeDropdown}
                                      onToggleCheckbox={onToggleCheckbox}
                                      onChangeSalePrice={onChangeSalePrice}
                                      onChangeCouponPrice={onChangeCouponPrice}
                                      onChangeText={onChangeProductItemText}
                                      onChangePurchasePrice={onChangePurchasePrice}
                                      onChangeDeliveryCharge={onChangeDeliveryCharge}
                                      onChangeCommissionRate={onChangeCommissionRate}
                                      onChangeOptionsInput={onChangeOptionsInput}
                                      itemIsVisibleTrue={itemIsVisibleTrue}
                                      onChangeOrderQty={onChangeOrderQty}
                                      onChangeJetRequestQty={onChangeJetRequestQty}
                                  />
                              ))}
                </SortableList>
            </div>
            <div className="ml-2 h-auto flex flex-col justify-between">
                <div className="w-[400px]">
                    <VendorInfoTable info={vendorInfo} onChange={onChangeVendor} />
                </div>
                <div className="w-[400px]">
                    <TradeInfoTable info={tradeInfo} onChange={onChangeTrade} />
                </div>
            </div>
        </div>
    )
}

export default ProductExpandView
