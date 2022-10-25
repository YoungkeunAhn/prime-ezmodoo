import { InputTextarea } from 'primereact/inputtextarea'
import React, { useRef, useState } from 'react'
import ChatRow from './ChatRow'

const fakeData: IChat[] = [
    {
        id: '1',
        memberId: 'tester',
        memberName: '안영근',
        content: '원피스에 주머니는 없습니다. 상세페이지안에는 주머니가 뚫린걸로 확인되니 참고해주세요',
        images: [],
        createdAt: '2022-10-25 10:25',
        deletedAt: '0000-00-00 00:00',
        isDeleted: false,
    },
    {
        id: '2',
        memberId: 'tester',
        memberName: '안영근',
        content: '',
        images: ['http://im.imama.kr/imama/imgs/19090352_20221019_090120.jpg'],
        createdAt: '2022-10-25 10:25',
        deletedAt: '2022-10-25 10:25',
        isDeleted: true,
    },
    {
        id: '3',
        memberId: 'tester',
        memberName: '안영근',
        content: '테스트',
        images: ['http://im.imama.kr/imama/imgs/20221021_161951.jpg', 'http://im.imama.kr/imama/imgs/19090352_20221019_090120.jpg', 'http://im.imama.kr/imama/imgs/19090352_20221019_090120.jpg', 'http://im.imama.kr/imama/imgs/19090352_20221019_090120.jpg'],
        createdAt: '2022-10-25 10:25',
        deletedAt: '0000-00-00 00:00',
        isDeleted: false,
    },
]

type Props = {
    title: string
    chatData: IChat[]
}

type InputsChat = {
    content: string
    images: File[]
}

const initInputsChat: InputsChat = {
    content: '',
    images: [],
}

const limitImageLengthMsg = '이미지 최대 갯수는 4개입니다.'

function Chatting(props: Props) {
    const { title, chatData } = props
    const [previewImages, setPreviewImages] = useState<string[]>([])
    const [inputsChat, setInputsChat] = useState<InputsChat>(initInputsChat)
    const [chatList, setChatList] = useState<IChat[]>(fakeData)
    const inputRef = useRef<HTMLInputElement>(null)

    const getPreviewImage = (file: File) => {
        if (previewImages.length < 4) {
            const image = URL.createObjectURL(file)
            setPreviewImages((prev) => prev.concat(image))
        } else {
            alert(limitImageLengthMsg)
        }
    }

    const onPasteImage = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const pastedImage = event.clipboardData.files[0]
        if (pastedImage) {
            if (pastedImage.type.indexOf('image') === 0) {
                getPreviewImage(pastedImage)
                setInputsChat((prev) => ({ ...prev, images: prev.images.concat(pastedImage) }))
            }
        }
    }

    const removePreviewImage = (url: string) => {
        setPreviewImages((prev) => prev.filter((it) => it !== url))
    }

    const onClickClip = () => {
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
        if (previewImages.length > 4) {
            alert(limitImageLengthMsg)
            return false
        }

        if (files) {
            if (files.length + previewImages.length > 4) {
                alert(limitImageLengthMsg)
                return false
            }

            for (let i = 0; i < files.length; i++) {
                console.log(files[i].type)
                if (files[i].type.includes('image')) {
                    console.log(files[i])
                    getPreviewImage(files[i])
                } else {
                    alert('이미지 파일만 올려주세요.')
                }
            }
        }
    }

    const onDropImage = (event: React.DragEvent<HTMLTextAreaElement>) => {
        const files = event.dataTransfer.files

        if (files) {
            imageTransPreview(files)
        }

        event.preventDefault()
    }

    const onChangeChatContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputsChat((prev) => ({ ...prev, content: event.target.value }))
    }

    const saveChat = async () => {
        try {
            if (inputsChat.content.length > 0 || inputsChat.images.length > 0) {
                setInputsChat(initInputsChat)
                setPreviewImages([])
            }
            setInputsChat(initInputsChat)
            setPreviewImages([])
        } catch (err) {
            console.error(err)
        }
    }

    const keyDownEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.ctrlKey) {
            saveChat()
            event.preventDefault()
            return false
        } else if (event.key === 'Enter' && event.ctrlKey) {
            setInputsChat((prev) => ({ ...prev, content: prev.content + '\n' }))
        }
    }

    const deleteChatRow = async (id: string) => {
        try {
            console.log(id)
            if (window.confirm('삭제하시겠습니까?')) {
                setChatList((prev) => prev.filter((it) => it.id !== id))
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="p-2 pt-4 border w-full h-auto">
            <div className="relative border text-sm h-full">
                <div className="bg-white font-bold p-1 absolute -top-[10px] left-[10px]">{title}</div>
                <div className="flex flex-col h-full">
                    <ul className="flex flex-col space-y-4 p-3 pt-4 h-full overflow-y-auto max-h-[60vh]">
                        {chatList.map((chat, idx) => (
                            <ChatRow key={idx} chat={chat} onDelete={deleteChatRow} />
                        ))}
                    </ul>
                    <div className="relative">
                        {previewImages.length > 0 && (
                            <div className="w-full grid grid-cols-4 gap-2 absolute z-10 bottom-0 border p-2" style={{ background: 'rgba(255,255,255,0.7)' }}>
                                {previewImages.map((image, idx) => (
                                    <div key={idx} className="relative">
                                        <div className="h-[75px] overflow-y-auto">
                                            <img src={image} alt="preview" className="w-full h-full" />
                                        </div>
                                        <button className="text-[10px] w-[20px] h-[20px] flex items-center justify-center rounded-full absolute -top-[10px] -right-[10px] text-red-500 hover:bg-gray-600 hover:text-white transition-3" onClick={() => removePreviewImage(image)}>
                                            <i className="fa-solid fa-x"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex items-start">
                        <div className="max-h-[100px] overflow-y-auto w-full border">
                            <InputTextarea value={inputsChat.content} onChange={onChangeChatContent} placeholder="메시지 입력" className="w-full border-none p-2" autoResize rows={4} onPaste={onPasteImage} onDrop={onDropImage} onKeyDown={keyDownEnter} />
                        </div>
                        <div>
                            <input ref={inputRef} type="file" hidden onChange={onChangeFileInput} multiple accept="image/*" />
                            <i className="fa-solid fa-paperclip border px-2 h-[32px] flex items-center cursor-pointer" onClick={onClickClip}></i>
                        </div>
                        <div>
                            <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]" onClick={saveChat}>
                                전송
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatting
