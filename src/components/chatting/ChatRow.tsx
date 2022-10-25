import { Image } from 'primereact/image'
import React from 'react'

type Props = {
    chat: IChat
    onDelete: (id: string) => void
}

const testMemberId = 'tester'

const deleteMsg = '삭제된 메세지입니다. '

function ChatRow(props: Props) {
    const { chat, onDelete } = props
    const { id, memberId, memberName, content, images, createdAt, deletedAt, isDeleted } = chat

    return (
        <li className="flex flex-col">
            <div className="flex justify-between">
                <div className="flex items-end space-x-5 mb-2">
                    <span className="font-bold">{memberName}</span>
                    <span className="text-gray-400 text-xs">{createdAt}</span>
                </div>
                {memberId === testMemberId && !isDeleted ? (
                    <button className="text-red-500 h-[10px]" onClick={() => onDelete(id)}>
                        <i className="fa-solid fa-x text-xs"></i>
                    </button>
                ) : (
                    ''
                )}
            </div>

            <div className="max-w-[360px]">{isDeleted ? deleteMsg + deletedAt : content}</div>
            {images.length > 0 && (
                <div className="flex max-w-[360px] mt-2">
                    {images.map((image, idx) => (
                        <Image key={idx} src={image} alt="image" width="200" height="200" preview />
                    ))}
                </div>
            )}
        </li>
    )
}

export default ChatRow
