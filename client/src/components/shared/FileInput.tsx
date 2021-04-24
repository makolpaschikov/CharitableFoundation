import clsx from 'clsx'
import {ChangeEvent, FC, InputHTMLAttributes} from 'react'

type FileInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'onChange' | 'value'
> & {
    label: string
    value?: File | null
    onChange: (file: File) => unknown
}

const MAX_FILENAME_LENGTH = 28

export const FileInput: FC<FileInputProps> = ({
    onChange,
    value,
    label,
    className,
    ...inputProps
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onChange(e.target.files[0])
        }
    }

    console.log(value)

    return (
        <label className={clsx('block', className)}>
            <div className={'text-sm font-semibold mb-2'}>{label}</div>
            <input
                className={'hidden'}
                type={'file'}
                onChange={handleChange}
                {...inputProps}
            />
            <div className={'flex'}>
                <div
                    className={clsx(
                        'inline-block rounded-lg px-16 py-1 bg-white cursor-pointer',
                        'border-1 border-gray-400 focus:border-primary duration-75',
                        'hover:bg-gray-100 active:bg-gray-200 duration-75 flex-shrink-0 mr-2'
                    )}
                >
                    {value ? 'Изменить файл' : 'Выберите файл'}
                </div>
                <div className={'inline-block max-w-xs py-1'}>
                    {formatFilename(value)}
                </div>
            </div>
        </label>
    )
}

const formatFilename = (file?: File | null) => {
    if (!file || file.name.length <= MAX_FILENAME_LENGTH) return file

    const {name} = file
    const half = Math.min(name.length / 2 - 4, MAX_FILENAME_LENGTH / 2)
    return name.slice(0, half) + '...' + name.slice(-half)
}
