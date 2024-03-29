import React from 'react'

type Props = {
    className?: string
    width?: number
    height?: number
}

function StarsBarIcon(props: Props) {
    const { className, width, height } = props
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={width ?? 20} height={height ?? 20} className={className} viewBox="0 0 32 32">
            <title>stats-bars</title>
            <path d="M0 26h32v4h-32zM4 18h4v6h-4zM10 10h4v14h-4zM16 16h4v8h-4zM22 4h4v20h-4z"></path>
        </svg>
    )
}

export default StarsBarIcon
