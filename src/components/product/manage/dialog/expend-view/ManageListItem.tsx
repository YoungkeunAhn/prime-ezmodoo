import axios from 'axios'
import { debounce } from 'lodash'
import numeral from 'numeral'
import { Checkbox } from 'primereact/checkbox'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SortableItem, SortableKnob } from 'react-easy-sort'
import { BASE_URL } from 'src/api/ApiConfig'
import { fakeConfig } from 'src/common/fake-data/config'
import { marketTemplate } from 'src/hooks/dropdown/ValueTemplate'
import { ContentProductItem } from 'src/types/product-manage'
import ItemLabel from './item-label/ItemLabel'

type Props = {
    productItem: ContentProductItem
    idx: number
    checkList: string[]
    onToggleCheckbox: (pk: string) => void
    onChangeText: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
    onChangePurchasePrice: (value: number | null, index: number) => void
    onChangeDeliveryCharge: (value: number | null, index: number) => void
    onChangeSalePrice: (value: number | null, index: number) => void
    onChangeCouponPrice: (value: number | null, index: number) => void
    onChangeCommissionRate: (value: number | null, index: number) => void
    onChangeDropdown: (event: DropdownChangeParams, index: number) => void
    onChangeImage: (file: File | string, index: number) => void
    onChangeOptionsInput: (event: React.ChangeEvent<HTMLInputElement>, index: number, optionIndex: number) => void
    itemIsVisibleTrue: (pk: string) => void
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
    const {
        productItem,
        idx,
        checkList,
        onToggleCheckbox,
        onChangeText,
        onChangePurchasePrice,
        onChangeSalePrice,
        onChangeCouponPrice,
        onChangeDeliveryCharge,
        onChangeCommissionRate,
        onChangeDropdown,
        onChangeImage,
        onChangeOptionsInput,
        itemIsVisibleTrue,
    } = props
    const {
        pk,
        itemImageUrls,
        productName,
        sellerName,
        itemOptions,
        marketId,
        stockUnitId,
        itemId,
        marketBarcode,
        marketSkuId,
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
        cnItemName,
        isVisible,
        memo,
    } = productItem
    const [urlChecked, setUrlChecked] = useState<boolean>(false)
    const [itemPk, setItemPk] = useState<string>(pk)
    const [imageUrl, setImageUrl] = useState<string>('')
    const [memoOpen, setMemoOpen] = useState<boolean>(false)
    const [componentMemo, setComponentMemo] = useState<string>('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const onChangeTextInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeText(event, idx)
    }

    const onClickUrlImage = () => {
        onChangeImage(imageUrl, idx)
    }

    const debounceMemo = useCallback(
        debounce(async (value: string) => {
            try {
                await axios.post(BASE_URL + `products/items/${pk}/memo`, { memo: value })
            } catch (err) {
                console.error(err)
            }
        }, 300),
        [pk]
    )

    const onChangeComponentMemo = (value: string) => {
        setComponentMemo(value)
        debounceMemo(value)
    }

    const onClickMemoBtn = () => {
        setMemoOpen(!memoOpen)
        if (textareaRef.current) {
            textareaRef.current.focus()
        }
    }

    useEffect(() => {
        console.log('useEffect pk : ', pk)
        if (componentMemo === '') {
            setComponentMemo(memo)
        }
        setItemPk(pk)
    }, [memo, componentMemo, pk])

    return (
        <div className="border relative">
            {!isVisible && (
                <div className="absolute w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-10">
                    <button className="text-white text-2xl font-bold" onClick={() => itemIsVisibleTrue(pk)}>
                        숨김해제
                    </button>
                </div>
            )}
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
                                <Checkbox
                                    className="ml-1 mt-1"
                                    checked={checkList.includes(pk)}
                                    onChange={() => {
                                        onToggleCheckbox(pk)
                                    }}
                                />
                            </div>

                            <img src={itemImageUrls[0] || './assets/images/no_image.jpg'} alt="test" className="h-[127px] w-[127px] m-auto" />
                            <div className="relative flex flex-col justify-between items-center p-2">
                                <button className="border text-gray-400 px-2 py-1 rounded text-[11px]" onClick={onClickMemoBtn}>
                                    메모추가/수정
                                </button>
                                <div className="absolute right-[-150px] bottom-[-50px]">
                                    <textarea
                                        ref={textareaRef}
                                        className={`w-[280px] border rounded-lg p-2 ${memoOpen ? 'block' : 'hidden'}`}
                                        rows={6}
                                        name="memo"
                                        style={{ resize: 'none' }}
                                        value={componentMemo}
                                        onChange={(e) => onChangeComponentMemo(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <div className="flex flex-col items-center text-gray-400">
                                    <span>대표이미지</span>
                                    <span>(500*500 px)</span>
                                </div>
                            </div>
                            <div
                                style={{
                                    borderTop: '0px solid #7DB3C1',
                                    borderRight: '15px solid #7DB3C1',
                                    borderBottom: '15px solid transparent',
                                    borderLeft: '15px solid trasparent',
                                    width: 0,
                                    height: 0,
                                }}
                            ></div>
                        </div>
                        <div className="flex justify-evenly items-center border-t pt-1 w-full h-[32px]">
                            <InputText
                                className="w-full p-1 border-none h-full pl-3 text-center"
                                name="cnItemName"
                                value={cnItemName}
                                onChange={onChangeTextInputs}
                                placeholder="중국옵션명"
                            />
                        </div>
                        {urlChecked ? (
                            <div className="flex items-center">
                                <InputText className="h-[32px] w-full" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
                                <button className="text-black w-[50px] border rounded h-full ml-1" onClick={onClickUrlImage}>
                                    적용
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-evenly items-center border-t w-full pt-1">
                                <div className="flex items-center">
                                    <Checkbox inputId="url" checked={urlChecked} onChange={() => setUrlChecked(!urlChecked)} />
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
                        )}
                    </div>

                    <ItemLabel label="상품명" />
                    <div className="col-span-6 border-b pt-1">
                        <InputText
                            className="w-full p-1 border-none h-full pl-3"
                            name="productName"
                            value={productName}
                            onChange={onChangeTextInputs}
                        />
                    </div>

                    <ItemLabel label="판매사" />
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <Dropdown
                            className="h-[27px] border-none w-full"
                            name="sellerName"
                            optionValue="name"
                            optionLabel="name"
                            options={fakeConfig.sellers}
                            value={sellerName}
                            onChange={(event) => {
                                onChangeDropdown(event, idx)
                            }}
                        />
                    </div>

                    <ItemLabel label="판매처" />
                    <div className="col-span-2 border-b p-1 h-[32px]">
                        <Dropdown
                            className="h-[27px] border-none w-full"
                            name="marketId"
                            options={fakeConfig.markets}
                            optionLabel="name"
                            optionValue="id"
                            value={marketId}
                            valueTemplate={marketTemplate(marketId)}
                            itemTemplate={(option) => marketTemplate(option.id)}
                            onChange={(event) => {
                                onChangeDropdown(event, idx)
                            }}
                        />
                    </div>

                    <ItemLabel label="재고코드" />
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputText
                            className="w-full p-1 border-none h-full pl-3"
                            name="stockUnitId"
                            value={stockUnitId}
                            // onChange={onChangeTextInputs}
                        />
                    </div>

                    <ItemLabel label="옵션1" />
                    <div className="col-span-2 border-b h-[32px]">
                        <InputText
                            className="w-full p-1 border-none h-full pl-3"
                            name="itemOptions"
                            value={itemOptions[0]}
                            onChange={(event) => onChangeOptionsInput(event, idx, 0)}
                        />
                    </div>
                    <ItemLabel label="옵션ID" />
                    <div className="col-span-2 border-b  border-r">
                        <InputText className="w-full p-1 border-none h-full pl-3" name="itemId" value={itemId} onChange={onChangeTextInputs} />
                    </div>

                    <ItemLabel label="옵션2" />
                    <div className="col-span-2 border-b">
                        <InputText
                            className="w-full p-1 border-none h-full pl-3"
                            name="itemOptions"
                            value={itemOptions[1]}
                            onChange={(event) => onChangeOptionsInput(event, idx, 1)}
                        />
                    </div>

                    <ItemLabel label="상품바코드" />
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputText
                            className="w-full p-1 border-none h-full pl-3"
                            name="marketBarcode"
                            value={marketBarcode}
                            onChange={onChangeTextInputs}
                        />
                    </div>

                    <ItemLabel label="바코드부착여부" />
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

                    <ItemLabel label="SKU.NO" />
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputText
                            className="w-full p-1 border-none h-full pl-3"
                            name="marketSkuId"
                            value={marketSkuId}
                            onChange={onChangeTextInputs}
                        />
                    </div>

                    <ItemLabel label="카톤박스 기획여부" />
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
                    <ItemLabel label="입고가격" />
                    <ItemLabel label="판매가격" />
                    <ItemLabel label="할인쿠폰금액" />
                    <ItemLabel label="배송비" />
                    <ItemLabel label="판매수수료 (%)" />
                    <ItemLabel label="정산금액" noBorderRight />

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
                        <InputNumber
                            className="text-center p-1 w-full"
                            inputClassName="border-none w-full px-2 py-1"
                            value={couponPrice}
                            onChange={(event) => {
                                onChangeCouponPrice(event.value, idx)
                            }}
                        />
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
                            value={commissionRate}
                            onChange={(event) => {
                                onChangeCommissionRate(event.value, idx)
                            }}
                            maxFractionDigits={2}
                        />
                    </div>
                    <div className="col-span-2 border-b h-[32px]">
                        <InputNumber className="text-center p-1 w-full" inputClassName="border-none w-full px-2 py-1" value={calcPrice} readOnly />
                    </div>

                    <ItemLabel label="판매이익" />
                    <ItemLabel label="판매이익율 (%)" />
                    <ItemLabel label="창고재고량" />
                    <ItemLabel label="가용창고재고량" />
                    <ItemLabel label="쿠팡창고재고량" />
                    <ItemLabel label="불량수량" noBorderRight />

                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputNumber className="text-center p-1 w-full" inputClassName="border-none w-full px-2 py-1" value={profit} readOnly />
                    </div>
                    <div className="col-span-2 border-b border-r h-[32px]">
                        <InputText
                            className="text-center px-2 py-1 w-full border-none h-full"
                            name="profitRate"
                            value={numeral(profitRate).format('0.0%')}
                            readOnly
                        />
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

                    <ItemLabel label="제트배송-입고요청수량" noBorderBottom />
                    <div className="col-span-2 border-r">
                        <InputNumber className="text-center p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>

                    <ItemLabel label="발주(매입)수량" noBorderBottom />
                    <div className="col-span-2 border-r">
                        <InputNumber className="text-center p-1 w-full" inputClassName="border-none w-full px-2 py-1" />
                    </div>

                    <ItemLabel label="리오더 소요일" noBorderBottom />
                    <div className="col-span-2">
                        <InputText
                            className="text-center px-2 py-1 w-full border-none h-full"
                            name="reorderPeriod"
                            value={reorderPeriod}
                            onChange={onChangeTextInputs}
                        />
                    </div>
                </div>
            </SortableItem>
        </div>
    )
}

export default ManageListItem
