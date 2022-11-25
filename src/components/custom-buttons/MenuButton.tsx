import React, { useState } from 'react'

type Props = {
    title: string
    menu: { label: string; action: string }[]
    position?: string
    icon?: React.ReactElement
    className?: string
    color?: string
    height?: string

    onClickMenu: (action: any) => void
}

function MenuButton(props: Props) {
    const { title, menu, position, icon, className, color, height, onClickMenu } = props
    const [open, setOpen] = useState<boolean>(false)

    const onToogleBtn = () => {
        setOpen(!open)
    }

    const closeMenu = () => {
        setOpen(false)
    }

    return (
        <>
            <button
                className={`border border-[${color ?? '#000'}] rounded bg-white flex items-center space-x-2 p-1 px-2 h-[${
                    height ?? '32px'
                }] relative ${className}`}
                onClick={onToogleBtn}
            >
                {icon}
                <span className="font-bold text-black text-sm">{title}</span>
                <i className={`fa-solid fa-ellipsis-vertical text-[${color ?? '#000'}]`}></i>
                <ul
                    className={`border bg-white absolute z-20 -${
                        position ?? 'right'
                    }-[160px] -top-[2px] p-2 flex flex-col text-start text-gray-400 text-sm space-y-2 rounded ${open ? '' : 'hidden'}`}
                >
                    {menu.map((item, idx) => (
                        <li key={idx} className="w-full" onClick={() => onClickMenu(item.action)}>
                            {item.label}
                        </li>
                    ))}
                </ul>
            </button>
            <div
                className={`fixed w-screen h-screen top-0 left-0 z-10 ${open ? 'visible' : 'invisible'}`}
                onClick={(e) => {
                    closeMenu()
                    e.stopPropagation()
                    e.preventDefault()
                }}
            ></div>
        </>
    )
}

export default MenuButton
