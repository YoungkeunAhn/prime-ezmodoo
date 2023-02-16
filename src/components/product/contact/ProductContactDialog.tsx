import axios from 'axios'
import { find, findIndex, map, xor } from 'lodash'
import { Dialog } from 'primereact/dialog'
import { DropdownChangeParams } from 'primereact/dropdown'
import React, { useCallback, useState } from 'react'
import SortableList from 'react-easy-sort'
import { BASE_URL } from 'src/api/ApiConfig'
import { ContentProductItem, HeaderInfo } from 'src/types/product-manage'
import ContentHeader from '../manage/ContentHeader'
import ContentListItem from './dialog/ContentListItem'

type Props = {
    pk?: string
    open: boolean
    closeModal: () => void
}

const initHeaderInfo: HeaderInfo = {
    managerName: '',
    createdAt: '',
    currencyCost: 0,
    applyExchangeRateCost: 0,
    productsName: '',
}

const initContentProductItem: ContentProductItem = {
    pk: '',
    marketBarcode: '',
    marketSkuId: '',
    marketQrcode: '',
    itemId: '',
    itemImageUrls: [''],
    itemOptions: ['', ''],
    itemName: '',
    marketId: '',
    productName: '',
    cnItemName: '',
    productPk: '',
    sellerPk: '',
    sellerName: '',
    memo: '',
    salePrice: 0,
    sellPrice: 0,
    couponPrice: 0,
    commissionRate: 0,
    deliveryCharge: 0,
    optionalCharge: 0,
    calcPrice: 0,
    profit: 0,
    profitRate: 0,
    skuId: '',
    stockQty: 0,
    totalQty: 0,
    availableQty: 0,
    disusedQty: 0,
    reorderPeriod: 0,
    purchasePrice: 0,
    isVisible: true,
    isDeleted: false,
    itemDetails: [],
    itemAttr: [],
    orderQty: 0,
    hasBarcode: null,
    hasCarton: null,
    units: [],
}

type Image = {
    index: number
    file: File | string
}

function ProductContactDialog(props: Props) {
    const { pk, open, closeModal } = props
    const [productItemList, setProductItemList] = useState<any[]>([initContentProductItem])
    const [headerInfo, setHeaderInfo] = useState<HeaderInfo>(initHeaderInfo)
    const [checkList, setCheckList] = useState<string[]>([])
    const [imageList, setImageList] = useState<Image[]>([])

    const onChangeHeaderInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'productsName' && productItemList[0].productName === '') {
            setProductItemList(productItemList.map((item, idx) => (idx === 0 ? { ...item, productName: event.target.value } : item)))
        }
        setHeaderInfo((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const onClickAddBtn = () => {
        setProductItemList((prev) => prev.concat([initContentProductItem]))
    }

    const pasteProductItem = () => {
        const findItems = map(checkList, (pk) => find(productItemList, { pk }))
        setProductItemList((prev) => prev.concat(findItems))
    }

    const onChangeProductItemText = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setProductItemList(productItemList.map((item, idx) => (idx === index ? { ...item, [event.target.name]: event.target.value } : item)))
    }

    const onChangeOptionsInput = (event: React.ChangeEvent<HTMLInputElement>, index: number, optionIndex: number) => {
        setProductItemList((prev) =>
            prev.map((item, idx) =>
                idx === index
                    ? {
                          ...item,
                          itemOptions: item.itemOptions.map((option: any, idx: number) => (idx === optionIndex ? event.target.value : option)),
                      }
                    : item
            )
        )
    }

    const onChangeDropdown = (event: DropdownChangeParams, index: number) => {
        setProductItemList(
            productItemList.map((item, idx) =>
                idx === index
                    ? {
                          ...item,
                          [event.target.name]: event.target.value,
                      }
                    : item
            )
        )
    }

    const onToggleCheckbox = (pk: string) => {
        setCheckList((prev) => xor(prev, [pk]))
    }

    const onChangePurchasePrice = (value: number | null, index: number) => {
        if (value !== null) {
            const field = 'purchasePrice'
            setProductItemList(
                productItemList.map((item, idx) => {
                    if (idx === index) {
                        item[field] = value
                        item.calcPrice = Math.floor(((item.salePrice - item.couponPrice) / 100) * (100 - item.commissionRate) - item.deliveryCharge)
                        item.profit = item.calcPrice - item.purchasePrice
                        item.profitRate = item.profit / (item.salePrice - item.couponPrice)
                    }
                    return item
                })
            )
        }
    }

    const onChangeSalePrice = (value: number | null, index: number) => {
        if (value !== null) {
            const field = 'salePrice'
            setProductItemList(
                productItemList.map((item, idx) => {
                    if (idx === index) {
                        item[field] = value
                        item.calcPrice = Math.floor(((item.salePrice - item.couponPrice) / 100) * (100 - item.commissionRate) - item.deliveryCharge)
                        item.profit = item.calcPrice - item.purchasePrice
                        item.profitRate = item.profit / (item.salePrice - item.couponPrice)
                    }
                    return item
                })
            )
        }
    }

    const onChangeCouponPrice = (value: number | null, index: number) => {
        if (value !== null) {
            const field = 'couponPrice'
            setProductItemList(
                productItemList.map((item, idx) => {
                    if (idx === index) {
                        item[field] = value
                        item.calcPrice = Math.floor(((item.salePrice - item.couponPrice) / 100) * (100 - item.commissionRate) - item.deliveryCharge)
                        item.profit = item.calcPrice - item.purchasePrice
                        item.profitRate = item.profit / (item.salePrice - item.couponPrice)
                    }
                    return item
                })
            )
        }
    }

    const onChangeDeliveryCharge = (value: number | null, index: number) => {
        if (value !== null) {
            const field = 'deliveryCharge'
            setProductItemList(
                productItemList.map((item, idx) => {
                    if (idx === index) {
                        item[field] = value
                        item.calcPrice = Math.floor(((item.salePrice - item.couponPrice) / 100) * (100 - item.commissionRate) - item.deliveryCharge)
                        item.profit = item.calcPrice - item.purchasePrice
                        item.profitRate = item.profit / (item.salePrice - item.couponPrice)
                    }
                    return item
                })
            )
        }
    }

    const onChangeCommissionRate = (value: number | null, index: number) => {
        if (value !== null) {
            const field = 'commissionRate'
            setProductItemList(
                productItemList.map((item, idx) => {
                    if (idx === index) {
                        item[field] = value
                        item.calcPrice = Math.floor(((item.salePrice - item.couponPrice) / 100) * (100 - item.commissionRate) - item.deliveryCharge)
                        item.profit = item.calcPrice - item.purchasePrice
                        item.profitRate = item.profit / (item.salePrice - item.couponPrice)
                    }
                    return item
                })
            )
        }
    }

    const onChangeImage = (file: File | string, index: number) => {
        const foundIndex = findIndex(imageList, { index })
        if (foundIndex > -1) {
            setImageList((prev) => prev.map((obj, idx) => (idx === foundIndex ? { ...obj, file } : obj)))
        } else {
            setImageList((prev) => prev.concat({ index, file }))
        }

        if (typeof file !== 'string') {
            const imageUrl = URL.createObjectURL(file)
            setProductItemList((prev) => prev.map((item, idx) => (idx === index ? { ...item, itemImageUrls: [imageUrl] } : item)))
        } else {
            const image = new Image(100, 100)
            image.src = file
            image.onload = function () {
                if (image.complete) {
                    setProductItemList((prev) => prev.map((item, idx) => (idx === index ? { ...item, itemImageUrls: [file] } : item)))
                }
            }
            image.onerror = function () {
                alert('올바르지 않은 URL이거나 올바르지 않은 이미지 입니다.')
            }
        }
    }

    const deleteProduct = useCallback(async () => {
        try {
            if (checkList.length > 0) {
                // eslint-disable-next-line no-restricted-globals
                if (confirm('삭제하시겠습니까?')) {
                    await axios.post(BASE_URL + `products/${pk}?_method=DELETE`, checkList)
                }
            }

            alert('삭제되었습니다.')

            setProductItemList((prev) => prev.filter((it) => !checkList.includes(it.pk)))
        } catch (err) {
            console.error(err)
        }
    }, [pk, checkList])

    const ModalHeader = () => {
        return (
            <div className="flex justify-between items-center p-0">
                <span></span>
                <div className="flex items-center space-x-2">
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">제트입고요청</button>
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">발주요청</button>
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]" onClick={() => {}}>
                        저장
                    </button>
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]" onClick={closeModal}>
                        닫기
                    </button>
                </div>
            </div>
        )
    }

    return (
        <Dialog header={ModalHeader} visible={open} onHide={closeModal} className="max-w-[1500px] w-full min-w-[500px] h-full" closable={false}>
            <div className="h-full">
                <ContentHeader data={headerInfo} onChange={onChangeHeaderInfo} />
                <div className="flex items-center p-1 space-x-2">
                    <button className="px-1.5 border border-[#707070] rounded text-[#707070]">
                        <i className="pi pi-angle-double-down text-[10px]" />
                    </button>
                    <button className="px-1.5 border border-[#707070] rounded text-[#707070]">
                        <i className="pi pi-angle-down text-[10px]" />
                    </button>
                    <button className="px-1.5 border border-[#707070] rounded text-[#707070]">
                        <i className="pi pi-angle-double-up text-[10px]" />
                    </button>
                    <button className="px-1.5 border border-[#707070] rounded text-[#707070]">
                        <i className="pi pi-angle-up text-[10px]" />
                    </button>
                    <button
                        style={{ lineHeight: '1.1rem' }}
                        className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]"
                        onClick={onClickAddBtn}
                    >
                        추가
                    </button>
                    <button
                        style={{ lineHeight: '1.1rem' }}
                        className="p-1.5 min-w-[60px] border border-[#707070] rounded text-[#A10C0C] text-[12px]"
                        onClick={deleteProduct}
                    >
                        삭제
                    </button>
                    <button
                        style={{ lineHeight: '1.1rem' }}
                        className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]"
                        onClick={pasteProductItem}
                    >
                        복사
                    </button>
                </div>
                <div className="flex border-t-4 border-[#0D3157] h-auto">
                    <div className="min-w-[1050px]">
                        <SortableList
                            onSortEnd={() => {}}
                            draggedItemClassName="dragged"
                            className="text-[12px] max-h-[76vh] overflow-y-auto manage-list"
                        >
                            {productItemList.map((productItem, idx) => (
                                <ContentListItem
                                    key={idx}
                                    idx={idx}
                                    checkList={checkList}
                                    productItem={productItem}
                                    onChangeImage={onChangeImage}
                                    onToggleCheckbox={onToggleCheckbox}
                                    onChangeSalePrice={onChangeSalePrice}
                                    onChangeCouponPrice={onChangeCouponPrice}
                                    onChangeText={onChangeProductItemText}
                                    onChangePurchasePrice={onChangePurchasePrice}
                                    onChangeDeliveryCharge={onChangeDeliveryCharge}
                                    onChangeCommissionRate={onChangeCommissionRate}
                                    onChangeOptionsInput={onChangeOptionsInput}
                                    onChangeDropdown={onChangeDropdown}
                                />
                            ))}
                        </SortableList>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
export default ProductContactDialog
