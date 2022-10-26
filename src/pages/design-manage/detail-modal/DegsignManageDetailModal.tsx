import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React, { useRef, useState } from 'react'
import { limitImageLengthMsg } from '../../../common/message/image-msg'
import Chatting from '../../../components/chatting/Chatting'
import ImageBox from '../../../components/image-box/ImageBox'

type Props = {
    open: boolean
    onClose: () => void
}

function DegsignManageDetailModal(props: Props) {
    const { open, onClose } = props
    const inputRef = useRef<HTMLInputElement>(null)
    const [imageList, setImageList] = useState<string[]>([])

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

    const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files) {
            imageTransPreview(files)
        }
    }

    const imageTransPreview = (files: FileList) => {
        if (imageList.length > 4) {
            alert(limitImageLengthMsg)
            return false
        }

        if (files) {
            if (files.length + imageList.length > 4) {
                alert(limitImageLengthMsg)
                return false
            }

            for (let i = 0; i < files.length; i++) {
                console.log(files[i].type)
                if (files[i].type.includes('image')) {
                    const image = URL.createObjectURL(files[i])
                    setImageList((prev) => prev.concat(image))
                } else {
                    alert('이미지 파일만 올려주세요.')
                }
            }
        }
    }

    const onDeleteImage = async (image: string) => {
        try {
            setImageList((prev) => prev.filter((it) => it !== image))
        } catch (err) {
            console.error(err)
        }
    }

    const onDropImage = (event: React.DragEvent<HTMLDivElement>) => {
        const files = event.dataTransfer.files

        if (files) {
            imageTransPreview(files)
        }

        event.preventDefault()
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
                            <input ref={inputRef} type="file" name="" className="hidden" onChange={onChangeFileInput} multiple accept="image/*" />
                            <button className="rounded w-full flex items-center justify-center bg-gray-300 text-white font-bold h-full space-x-3 hover:bg-gray-400 transition" onClick={onClickImageAddBtn}>
                                <i className="fa-solid fa-plus"></i>
                                <span>이미지 파일추가</span>
                            </button>
                        </div>
                        <div className="col-span-3" onDrop={onDropImage}>
                            <div className="grid grid-cols-4 gap-1 max-w-[400px] max-h-[200px] m-auto p-1">
                                {imageList.map((image, idx) => (
                                    <ImageBox key={idx} url={image} onDelete={onDeleteImage} />
                                ))}
                                {new Array(4 - imageList.length).fill(0).map((idx) => (
                                    <ImageBox key={idx} url="" />
                                ))}
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
