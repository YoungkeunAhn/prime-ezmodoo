import { Image } from 'primereact/image'
import React from 'react'

type Props = {
    image: string
    onDelete: (image: string) => void
}

function ImageBox() {
    return (
        <div className="relative">
            <Image src="./assets/images/no_image.jpg" alt="" className="object-contain cursor-pointer" preview />
            <button className="text-[10px] w-[20px] h-[20px] flex items-center justify-center rounded-full absolute top-0 right-0 text-red-500 hover:bg-gray-400 hover:text-white transition-3 z-10">
                <i className="fa-solid fa-x"></i>
            </button>
        </div>
    )
}

export default ImageBox
