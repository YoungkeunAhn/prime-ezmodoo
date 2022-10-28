import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import React from 'react'

export const textEditor = (options: any) => {
    console.log(options)
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />
}

export const numberEditor = (options: any) => {
    return <InputNumber value={options.value} onChange={(e) => options.editorCallback(e.value)} />
}
