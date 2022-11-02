import numeral from 'numeral'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Tooltip } from 'primereact/tooltip'
import { title } from 'process'
import React, { useState } from 'react'
import MenuButton from 'src/components/custom-buttons/MenuButton'
import { imageBodyTemplate, urlBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'
import ProductDialog from './detail-modal/ProductDialog'

type DialogId = 'DETAIL'

export const ecommerceList = ['coopang-rocket', 'coopang-zet', 'coopang-seller', 'auction', 'street11', 'gmarket', 'tmon', 'wemap', 'interpark', 'ably', 'zigzag', 'talkstore', 'funshop', 'smartstore']

function ProductManageList() {
    // const [products, setProducts] = useState([]);
    const [dialogId, setDialogId] = useState<DialogId>()

    const fakeData = [
        {
            id: '1007',
            createdAt: '2022-10-14 16:00',
            seller: 'imama',
            url: 'http://im.imama.kr',
            productCode: 'f230fh0g3',
            productGroupName: '로지 토끼 슬리퍼1',
            image: 'http://im.imama.kr/imama/imgs/tokki.jpg',
            ecommerce: ['coopang-rocket', 'coopang-zet', 'talkstore'],
            options: ['13m3개+11cm3개 (버건디+회색잉크+앰버라지)', 'test2'],
            cost: 2000,
            deliveryCharge: 2000,
            price: 6500,
            discountPrice: 1000,
            sellCommition: 10,
        },

        {
            id: '1006',
            createdAt: '2022-10-14 16:00',
            seller: 'imama',
            ecommerce: ['coopang-rocket', 'ably'],
            url: 'http://im.imama.kr',
            productCode: 'nvklal433',
            productGroupName: '로지 토끼 슬리퍼2',
            description: 'Product Description',
            image: 'http://im.imama.kr/imama/imgs/tokki.jpg',
            options: ['abc1', 'abc2'],
            deliveryCharge: 2000,
            cost: 2000,
            price: 7200,
            discountPrice: 1000,
            sellCommition: 10,
        },

        {
            id: '1005',
            createdAt: '2022-10-14 16:00',
            seller: 'imama',
            ecommerce: ['coopang-rocket', 'interpark'],
            url: 'http://im.imama.kr',
            productCode: 'nvklal433',
            productGroupName: '로지 토끼 슬리퍼3',
            description: 'Product Description',
            image: 'http://im.imama.kr/imama/imgs/tokki.jpg',
            options: ['abc1', 'abc2'],
            deliveryCharge: 2000,
            cost: 2000,
            price: 7200,
            discountPrice: 1000,
            sellCommition: 10,
        },
        // {
        //     id: '1005',
        //     createdAt: '2022-10-12',
        //     url: 'http://im.imama.kr',
        //     seller: 'yl',
        //     productCode: 'zz21cz3c1',
        //     productGroupName: '로지 토끼 슬리퍼3',
        //     description: 'Product Description',
        //     image: 'http://im.imama.kr/imama/imgs/tokki.jpg',
        //     options: [],
        //     deliveryCharge: 2000,
        //     cost: 2000,
        //     price: 7900,
        //     discountPrice: 1000,
        //     sellCommition: 10,
        // },
    ].map((item, idx: number) => {
        const calcPrice = item.price - item.price / item.sellCommition
        const profit = calcPrice - item.deliveryCharge
        const profitRate = Math.round((profit / item.price) * 100)
        const seq = idx + 1
        return { ...item, calcPrice, profit, profitRate, seq }
    })

    const ecommerceBodyTemplate = (rowData: any) => {
        return (
            <>
                <Tooltip target=".ecommerce" />
                <div></div>
            </>
        )
    }

    const productGroupNameTemplate = (rowData: any) => {
        return <span>{rowData.productGroupName}</span>
    }

    const option1BodyTemplate = (rowData: any, option?: any) => {
        return <span>{rowData.options[0]}</span>
    }
    const option2BodyTemplate = (rowData: any, option?: any) => {
        return <span>{rowData.options[1]}</span>
    }

    const numberBodyTemplate = (rowData: any, option?: any) => {
        return numeral(rowData[option.field]).format('0,0')
    }

    const onRowClick = (rowData: any) => {
        setDialogId('DETAIL')
    }

    const onCloseModal = () => {
        setDialogId(undefined)
    }

    return (
        <div>
            <div className="page-header border rounded-lg flex bg-white mb-5">
                <div>
                    <div className="flex items-center px-4 pt-4 border-b h-[66px] box-border">
                        <div className="flex flex-col justify-center ">
                            <span className="font-bold text-lg relative">상품관리</span>
                            <div className="border-2 w-full border-blue-500 relative -bottom-[14px]"></div>
                        </div>
                        <span className="border rounded bg-white p-1 text-[11px] ml-4">Total : 3862</span>
                    </div>
                    <div className="flex space-x-4 p-4">
                        <div className="flex space-x-2 items-center">
                            <span className="font-bold text-[13px]">판매사</span>
                            <Dropdown />
                        </div>

                        <div className="flex space-x-2 items-center">
                            <span className="font-bold text-[13px]">공급사</span>
                            <Dropdown />
                        </div>
                        <div className="flex space-x-2 items-center">
                            <Dropdown />
                            <InputText />
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-[13px]">등록일</span>
                            <button className="border rounded px-4 h-[30px] text-[12px] border-[#ddd] text-black">전체</button>
                            <Dropdown />
                            <Dropdown />
                            <InputText type="date" />
                            <span>~</span>
                            <InputText type="date" />
                        </div>
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
                <div className="flex items-center justify-between space-x-2 mb-2">
                    <div className="flex items-center space-x-2">
                        <button className="btn primary-btn">신규등록</button>
                        <button className="btn primary-btn">선택삭제</button>
                        <button className="btn primary-btn">선택복사</button>
                        <button className="btn primary-btn">상품마감</button>
                        <button className="btn primary-btn">마감해제</button>
                        {/* <button className="border border-[#146BCE] rounded text-[#146BCE] bg-white flex items-center space-x-2 p-1 px-2 h-[32px] relative">
                            <span className="font-bold text-sm">전체상품보기</span>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                            <ul className="border bg-white absolute z-10 -right-[160px] -top-[2px] p-2 flex flex-col text-start text-gray-400 text-sm space-y-2 w-[155px] rounded">
                                <li className="w-full">전체상품 보기</li>
                                <li className="w-full">전체상품 보기(마감제외)</li>
                                <li className="w-full">마감상품 보기</li>
                            </ul>
                        </button> */}
                        <MenuButton title="전체상품보기" color="#146BCE" menu={['전체상품 보기', '전체상품 보기(마감제외)', '마감상품 보기']} onClickMenu={(action: string) => alert(action)} />
                        <button className="btn primary-btn">디자인요청</button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MenuButton
                            title="EXCEL"
                            position="left"
                            color="#098000"
                            menu={['전체상품 엑셀 다운로드', '선택상품 엑셀 다운로드', '엑셀 업로드(상품 수정)']}
                            icon={<img src="./assets/icons/excel.png" alt="excel" width={28} className="object-contain" />}
                            onClickMenu={(action: string) => alert(action)}
                        />
                    </div>
                </div>
                <DataTable value={fakeData} responsiveLayout="scroll" sortMode="multiple" removableSort resizableColumns onRowClick={onRowClick} className="max-h-[99vh]" columnResizeMode="expand">
                    <Column align="center" selectionMode="multiple" selectionAriaLabel="id" headerStyle={{ width: '3em' }} field="id"></Column>
                    <Column align="center" className="text-[12px]" field="seq" header="NO" />
                    <Column align="center" className="text-[12px]" field="createdAt" header="등록일" />
                    <Column align="center" className="text-[12px]" field="seller" header="판매사" />
                    <Column align="center" className="text-[12px]" field="image" header="이미지" body={imageBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="url" header="URL" body={urlBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="ecommerce" header="판매처" body={ecommerceBodyTemplate} />
                    <Column alignHeader="center" align="left" className="text-[12px]" field="productGroupName" header="상품명" body={productGroupNameTemplate} headerStyle={{ width: '250px' }} />
                    <Column alignHeader="center" align="left" className="text-[12px]" field="options.0" header="옵션1" body={option1BodyTemplate} />
                    <Column alignHeader="center" align="left" className="text-[12px]" field="options.1" header="옵션2" body={option2BodyTemplate} />
                    <Column align="center" className="text-[12px]" field="cost" header="입고가격" sortable body={numberBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="price" header="판매가격" sortable body={numberBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="discountPrice" header="할인쿠폰금액" body={numberBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="sellCommition" header="판매수수료" body={numberBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="calcPrice" header="정산금액" sortable body={numberBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="profit" header="판매이익" sortable body={numberBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="profitRate" header="판매이익률" sortable body={numberBodyTemplate} />
                </DataTable>
            </div>
            <ProductDialog open={dialogId === 'DETAIL'} onClose={onCloseModal} />
        </div>
    )
}

export default ProductManageList
