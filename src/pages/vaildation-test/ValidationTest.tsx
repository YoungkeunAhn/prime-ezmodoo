import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState, useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { client } from 'src/api/ApiConfig'

type Inputs = {
    id: string
    age: number
    year: string
    name: string
}

const initInputs: Inputs = {
    id: '',
    age: 0,
    name: '',
    year: '',
}

function ValidationTest() {
    const [inputs, setInputs] = useState<Inputs>(initInputs)
    const [files, setFiles] = useState<File[]>([])

    const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        // console.log('data : ', data)
        // console.log('inputs : ', inputs)
        try {
            const formData = new FormData()

            // files.forEach((file) => formData.append('files[]', file))
        } catch (err) {}
    }

    const getList = useCallback(
        async (_id: string) => {
            try {
                // const formData = new FormData()
                // files.forEach((file) => formData.append('files[]', file))
                // await client.request('priceMonitor.edit', { ...inputs }, formData)
                // const data = await post('priceMonitor.list')
                // console.log('post : ', data)
                // await client.request('priceMonitor.xxx', {})
                // const { data } = await client.request('priceMonitor.edit', _id)
            } catch (err) {
                console.error(err)
            }
        },
        [files, inputs]
    )

    const onChangeInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            for (let i = 0; i < files.length; i++) {
                setFiles((prev) => prev.concat(files[i]))
            }
        }
    }

    useEffect(() => {
        getList('63a4022c28ec4adb65023fd0')
    }, [getList])
    return (
        <div>
            <div className="font-bold mb-5 p-2 text-xl bg-white border rounded shadow-sm"> ValidationTest </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <ul className="grid gird-cols-4 w-full">
                    <li>
                        <label htmlFor="id">아이디</label>
                        <InputText
                            {...register('id', {
                                required: {
                                    value: true,
                                    message: '필수 입력값 입니다.',
                                },
                                minLength: {
                                    value: 5,
                                    message: '최소 길이는 5입니다.',
                                },
                            })}
                            className="p-1"
                            name="id"
                            value={inputs.id}
                            onChange={onChangeInputs}
                        />
                        {errors.id && <p className="text-red-500">{errors.id.message}</p>}
                    </li>
                    <li>
                        <label htmlFor="age">나이</label>
                        <InputText {...register('age')} className="p-1" name="age" value={inputs.age || ''} onChange={onChangeInputs} />
                    </li>
                    <li>
                        <label htmlFor="name">이름</label>
                        <InputText
                            {...register('name', { required: '필수 입력값입니다.' })}
                            className="p-1"
                            name="name"
                            value={inputs.name}
                            onChange={onChangeInputs}
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </li>
                    <li>
                        <label htmlFor="year">연도</label>
                        <InputText {...register('year')} className="p-1" name="year" value={inputs.year} onChange={onChangeInputs} />
                    </li>
                    <li>
                        <label htmlFor="year">파일</label>
                        <InputText type="file" name="files" multiple onChange={onChangeInputFile} />
                    </li>
                </ul>
                <button type="submit">제출</button>
            </form>
        </div>
    )
}

export default ValidationTest
