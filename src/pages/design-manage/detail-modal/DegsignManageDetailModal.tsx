import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { Image } from 'primereact/image'
import { InputText } from 'primereact/inputtext'
import React, { useState, useRef } from 'react'
import Chatting from '../../../components/chatting/Chatting'

type Props = {
    open: boolean
    onClose: () => void
}

function DegsignManageDetailModal(props: Props) {
    const { open, onClose } = props
    const inputRef = useRef<HTMLInputElement>(null)
    const [previewImages, setPreviewImages] = useState<string[]>([])

    const ModalHeader = () => {
        return (
            <div className="flex justify-end items-center space-x-2">
                <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">저장</button>
                <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]" onClick={onClose}>
                    닫기
                </button>
            </div>
        )
    }

    const onClickImageAddBtn = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    return (
        <Dialog header={ModalHeader} visible={open} onHide={onClose} className="min-w-[500px]" closable={false}>
            <div className="flex flex-col">
                <div className="flex justify-center items-center bg-[#A4005D] h-[32px] rounded-t-[10px] text-white text-sm">디자인 요청서</div>
                <div className="flex">
                    <div className="grid grid-cols-3 text-sm border w-full">
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">상품코드</div>
                        <div className="col-span-2 border-b">
                            <InputText className="border-none h-[32px] w-full" disabled />
                        </div>
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">상품명</div>
                        <div className="col-span-2 border-b">
                            <InputText className="border-none h-[32px] w-full" disabled />
                        </div>
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">상품 담당자</div>
                        <div className="col-span-2 border-b">
                            <InputText className="border-none h-[32px] w-full" disabled />
                        </div>
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">디자인 접수일</div>
                        <div className="col-span-2 border-b">
                            <InputText className="border-none h-[32px] w-full" disabled type="date" />
                        </div>
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">디자인 담당자</div>
                        <div className="col-span-2 border-b">
                            <InputText className="border-none h-[32px] w-full" />
                        </div>

                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">입고예상일</div>
                        <div className="col-span-2 border-b">
                            <InputText className="border-none h-[32px] w-full" type="date" />
                        </div>
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">옵션</div>
                        <div className="col-span-2 border-b">
                            <InputText className="border-none h-[32px] w-full" />
                        </div>
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">
                            사이즈 <span className="text-red-500">*</span>
                        </div>
                        <div className="col-span-2 border-b">
                            <InputText className="border-none h-[32px] w-full" />
                        </div>
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">
                            중량 <span className="text-red-500">*</span>
                        </div>
                        <div className="col-span-2 border-b">
                            <InputText className="border-none h-[32px] w-full" />
                        </div>
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">
                            재질 <span className="text-red-500">*</span>
                        </div>
                        <div className="col-span-2 border-b">
                            <InputText className="border-none h-[32px] w-full" />
                        </div>
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">URL1</div>
                        <div className="col-span-2 border-b">
                            <InputText className="border-none h-[32px] w-full" disabled />
                        </div>
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">URL2</div>
                        <div className="col-span-2 border-b">
                            <InputText className="border-none h-[32px] w-full" disabled />
                        </div>
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">참고링크1</div>
                        <div className="col-span-2 border-b">
                            <InputText className="border-none h-[32px] w-full" />
                        </div>
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">참고링크2</div>
                        <div className="col-span-2 border-b">
                            <InputText className="border-none h-[32px] w-full" />
                        </div>
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">작업상태</div>
                        <div className="col-span-2 border-b">
                            <Dropdown className="border-none h-[32px] w-full" />
                        </div>
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4">디자인완료일</div>
                        <div className="col-span-2 border-b">
                            <InputText className="border-none h-[32px] w-full" type="date" />
                        </div>
                        <div className="font-bold bg-[#F8F9FB] flex items-center border-b border-r pl-4 h-[32px]">참고이미지</div>
                        <div className="col-span-2 border-b">
                            <input ref={inputRef} type="file" name="" className="hidden" />
                            <button className="rounded w-full flex items-center justify-center bg-gray-300 text-white font-bold h-full space-x-3 hover:bg-gray-400 transition" onClick={onClickImageAddBtn}>
                                <i className="fa-solid fa-plus"></i>
                                <span>이미지 파일추가</span>
                            </button>
                        </div>
                        <div className="col-span-3">
                            <div className="grid grid-cols-4 gap-1 max-w-[400px] max-h-[200px] m-auto p-1">
                                <div className="relative">
                                    <Image src="./assets/images/no_image.jpg" alt="" className="object-contain cursor-pointer" preview />
                                    <button className="text-[10px] w-[20px] h-[20px] flex items-center justify-center rounded-full absolute top-0 right-0 text-red-500 hover:bg-gray-400 hover:text-white transition-3 z-10">
                                        <i className="fa-solid fa-x"></i>
                                    </button>
                                </div>
                                <div className="relative">
                                    <Image src="./assets/images/no_image.jpg" alt="" className="object-contain cursor-pointer" preview />
                                    <button className="text-[10px] w-[20px] h-[20px] flex items-center justify-center rounded-full absolute top-0 right-0 text-red-500 hover:bg-gray-400 hover:text-white transition-3 z-10">
                                        <i className="fa-solid fa-x"></i>
                                    </button>
                                </div>
                                <div className="relative">
                                    <Image src="./assets/images/no_image.jpg" alt="" className="object-contain cursor-pointer" preview />
                                    <button className="text-[10px] w-[20px] h-[20px] flex items-center justify-center rounded-full absolute top-0 right-0 text-red-500 hover:bg-gray-400 hover:text-white transition-3 z-10">
                                        <i className="fa-solid fa-x"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Chatting title="전달내용 & IMG" chatData={[]} />
                </div>
            </div>
        </Dialog>
    )
}

export default DegsignManageDetailModal
