import React from 'react'

export const wrapColumnHeader = (text: string) => {
    return (
        <div className="flex flex-col justify-center">
            {text.split(' ').map((word, idx) => (
                <span key={idx}>{word}</span>
            ))}
        </div>
    )
}
