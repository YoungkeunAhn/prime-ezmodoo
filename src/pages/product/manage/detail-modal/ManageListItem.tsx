import numeral from 'numeral'
import { Checkbox } from 'primereact/checkbox'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { SortableItem, SortableKnob } from 'react-easy-sort'
import { fakeConfig } from 'src/common/fake-data/config'
import { marketTemplate } from 'src/hooks/dropdown/ValueTemplate'
import { ContentProductItem } from 'src/types/product-manage'

type Props = {
    productItem: ContentProductItem
    idx: number
    onChangeText: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
    onChangePurchasePrice: (value: number | null, index: number) => void
    onChangeDeliveryCharge: (value: number | null, index: number) => void
    onChangeSalePrice: (value: number | null, index: number) => void
    onChangeCommissionRate: (value: number | null, index: number) => void
    onChangeDropdown: (event: DropdownChangeParams, index: number) => void
    onChangeImage: (file: File, index: number) => void
}

const hasBarcodeOptions = [
    { label: '선택안함', value: null },
    { label: '부착', value: true },
    { label: '미부착', value: false },
]

const hasCartonOptions = [
    { label: '선택안함', value: null },
    { label: '유', value: true },
    { label: '무', value: false },
]

function ManageListItem(props: Props) {
    const { productItem, idx, onChangeText, onChangePurchasePrice, onChangeSalePrice, onChangeDeliveryCharge, onChangeCommissionRate, onChangeDropdown, onChangeImage } = props
    const {
        pk,
        itemImageUrls,
        productName,
        sellerName,
        itemOptions,
        marketId,
        stockUnitId,
        itemId,
        barcode,
        skuId,
        salePrice,
        couponPrice,
        deliveryCharge,
        commissionRate,
        calcPrice,
        totalQty,
        availableQty,
        disusedQty,
        stockQty,
        reorderPeriod,
        profit,
        profitRate,
        purchasePrice,
        hasBarcode,
        hasCarton,
    } = productItem

    const onChangeTextInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeText(event, idx)
    }

    return (
        <div className="border">
            <SortableItem>
                <div className="grid overflow-hidden grid-cols-12 grid-rows-none gap-0">
                    <div className="row-span-6 col-span-4 border-r border-b flex flex-col">
                        <div className="flex items-cetner">
                            <div className="h-auto flex justify-center items-center border-r w-[40px] hover:cursor-move">
                                <SortableKnob>
                                    <i className="pi pi-align-justify" />
                                </SortableKnob>
                            </div>
                            <div className="h-auto flex justify-center items-center border-r w-[40px]">
                                <Checkbox className="ml-1 mt-1" />
                            </div>

                            <img src={itemImageUrls[0] || './assets/images/no_image.jpg'} alt="test" className="h-[127px] w-[127px] m-auto" />
                            <div className="flex flex-col justify-between items-center p-2">
                                <button className="border text-gray-400 px-2 py-1 rounded text-[11px]">메모추가/수정</button>
                                <div className="flex flex-col items-center text-gray-400">
                                    <span>대표이미지</span>
                                    <span>(500*500 px)</span>
                                </div>
                            </div>
                            <div style={{ borderTop: '0px solid #7DB3C1', borderRight: '15px solid #7DB3C1', borderBottom: '15px solid transparent', borderLeft: '15px solid trasparent', width: 0, height: 0 }}> </div>
                        </div>
                        <div className="flex justify-evenly items-center border-t pt-1 w-full h-[32px]">
                            <InputText className="w-full p-1 border-none h-full pl-3 text-center" placeholder="옵션명" />
                        </div>
                        <div className="flex justify-evenly items-center border-t w-full pt-1">
                            <div className="flex items-center">
                                <Checkbox inputId="url" />
                                <label htmlFor="url">URL저장</label>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    if (event.target.files) {
                                        onChangeImage(event.target.files[0], idx)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r h-[32px]">
                        <span>상품명</span>
                    </div>
                    <div className="col-span-6 border-b pt-1">
                        <InputText className="w-full p-1 border-none h-full pl-3" name="productName" value={productName} onChange={onChangeTextInputs} />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span className="">판매사</span>
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <Dropdown
                            className="h-[27px] border-none w-full"
                            name="sellerName"
                            options={fakeConfig.sellers}
                            value={sellerName}
                            onChange={(event) => {
                                onChangeDropdown(event, idx)
                            }}
                        />
                    </div>
                    <div className="col-span-2 p-1 flex justify-center items-center font-bold bg-[#F8F9FB] border-b border-r">
                        <span className="">판매처</span>
                    </div>
                    <div className="col-span-2 border-b p-1 h-[32px]">
                        <Dropdown
                            className="h-[27px] border-none w-full"
                            name="marketId"
                            options={fakeConfig.markets}
                            value={marketId}
                            valueTemplate={marketTemplate(marketId)}
                            itemTemplate={marketTemplate}
                            onChange={(event) => {
                                onChangeDropdown(event, idx)
                            }}
                        />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>재고코드</span>
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputText className="w-full p-1 border-none h-full pl-3" name="stockUnitId" value={stockUnitId} onChange={onChangeTextInputs} />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>옵션ID</span>
                    </div>
                    <div className="col-span-2 border-b">
                        <InputText className="w-full p-1 border-none h-full pl-3" name="itemId" value={itemId} onChange={onChangeTextInputs} />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>옵션1</span>
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputText className="w-full p-1 border-none h-full pl-3" value={itemOptions[0]} />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>옵션2</span>
                    </div>
                    <div className="col-span-2 border-b">
                        <InputText className="w-full p-1 border-none h-full pl-3" value={itemOptions[1]} />
                    </div>

                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span className="">상품바코드</span>
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputText className="w-full p-1 border-none h-full pl-3" name="barcode" value={barcode} onChange={onChangeTextInputs} />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span className="">바코드부착여부</span>
                    </div>
                    <div className="col-span-2 border-b p-1 h-[32px]">
                        <Dropdown
                            className="h-[27px] border-none w-full"
                            name="hasBarcode"
                            options={hasBarcodeOptions}
                            value={hasBarcode}
                            onChange={(event) => {
                                onChangeDropdown(event, idx)
                            }}
                        />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span className="">SKU.NO</span>
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputText className="w-full p-1 border-none h-full pl-3" name="skuId" value={skuId} onChange={onChangeTextInputs} />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span className="">카톤박스 기획여부</span>
                    </div>
                    <div className="col-span-2 border-b p-1 h-[32px]">
                        <Dropdown
                            className="h-[27px] border-none w-full"
                            name="hasCarton"
                            options={hasCartonOptions}
                            value={hasCarton}
                            onChange={(event) => {
                                onChangeDropdown(event, idx)
                            }}
                        />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r h-[32px]">
                        <span>입고가격</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>판매가격</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>할인쿠폰금액</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>배송비</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>판매수수료 (%)</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b">
                        <span>정산금액</span>
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber
                            className="text-center p-1 w-full"
                            inputClassName="border-none w-full px-2 py-1"
                            value={purchasePrice}
                            onChange={(event) => {
                                onChangePurchasePrice(event.value, idx)
                            }}
                        />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber
                            className="text-center p-1 w-full"
                            inputClassName="border-none w-full px-2 py-1"
                            value={salePrice}
                            onChange={(event) => {
                                onChangeSalePrice(event.value, idx)
                            }}
                        />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="text-center p-1 w-full" inputClassName="border-none w-full px-2 py-1" value={couponPrice} />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber
                            className="text-center p-1 w-full"
                            inputClassName="border-none w-full px-2 py-1"
                            value={deliveryCharge}
                            onChange={(event) => {
                                onChangeDeliveryCharge(event.value, idx)
                            }}
                        />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber
                            className="text-center p-1 w-full"
                            inputClassName="border-none w-full px-2 py-1"
                            suffix="%"
                            value={commissionRate}
                            onChange={(event) => {
                                onChangeCommissionRate(event.value, idx)
                            }}
                        />
                    </div>
                    <div className="col-span-2 border-b h-[32px]">
                        <InputNumber className="text-center p-1 w-full" inputClassName="border-none w-full px-2 py-1" value={calcPrice} readOnly />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r h-[32px]">
                        <span>판매이익</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>판매이익율 (%)</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>창고재고량</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>가용창고재고량</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b border-r">
                        <span>쿠팡창고재고량</span>
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-b">
                        <span>불량수량</span>
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="text-center p-1 w-full" inputClassName="border-none w-full px-2 py-1" value={profit} readOnly />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputText className="text-center px-2 py-1 w-full border-none h-full" name="profitRate" value={numeral(profitRate).format('0.0%')} readOnly />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="text-center p-1 w-full" inputClassName="border-none w-full px-2 py-1" value={totalQty} readOnly />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="text-center p-1 w-full" inputClassName="border-none w-full px-2 py-1" value={availableQty} readOnly />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="text-center p-1 w-full" inputClassName="border-none w-full px-2 py-1" value={stockQty} readOnly />
                    </div>
                    <div className="col-span-2 border-b h-[32px]">
                        <InputNumber className="text-center p-1 w-full" inputClassName="border-none w-full px-2 py-1" value={disusedQty} readOnly />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-r h-[32px]">
                        <span className="">제트배송-입고요청수량</span>
                    </div>
                    <div className="col-span-2 border-r">
                        <InputNumber className="text-center p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-r">
                        <span className="">발주(매입)수량</span>
                    </div>
                    <div className="col-span-2 border-r">
                        <InputNumber className="text-center p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>
                    <div className="col-span-2 p-1 font-bold bg-[#F8F9FB] flex justify-center items-center border-r">
                        <span className="">리오더 소요일</span>
                    </div>
                    <div className="col-span-2">
                        <InputText className="text-center px-2 py-1 w-full border-none h-full" name="reorderPeriod" value={reorderPeriod} onChange={onChangeTextInputs} />
                    </div>
                </div>
            </SortableItem>
        </div>
    )
}

export default ManageListItem
