import { Image } from 'primereact/image'
import React from 'react'

type Props = {
    url: string
    onDelete?: (image: string) => void
}

function ImageBox(props: Props) {
    const { url, onDelete } = props

    const deleteImage = () => {
        if (onDelete) {
            onDelete(url)
        }
    }

    return (
        <div className="relative h-[100px] overflow-hidden">
            <Image src={url || './assets/images/no_image.jpg'} alt={url} preview={url.length > 1} className="h-full flex items-center justify-center" />
            {url ? (
                <button className="text-[10px] w-[20px] h-[20px] flex items-center justify-center rounded-full absolute top-0 right-0 text-red-500 hover:bg-gray-400 hover:text-white transition-3 z-10" onClick={deleteImage}>
                    <i className="fa-solid fa-x"></i>
                </button>
            ) : (
                ''
            )}
        </div>
    )
}

export default ImageBox
