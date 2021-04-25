import clsx from 'clsx'
import {ChangeEvent, FC, InputHTMLAttributes} from 'react'
import {ErrorMessage} from 'src/components/shared/Input'

type FileInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'onChange' | 'value'
> & {
    label: string
    value?: File[] | File | null
    errorMessage?: string | false
    onChange: (files: FileList) => unknown
}

const MAX_FILENAME_LENGTH = 28

export const FileInput: FC<FileInputProps> = ({
    onChange,
    value,
    label,
    className,
    errorMessage,
    ...inputProps
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onChange(e.target.files)
        }
    }

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
                    {(Array.isArray(value) ? value.length > 0 : value)
                        ? 'Изменить файл'
                        : 'Выберите файл'}
                </div>
                <div className={'inline-block max-w-xs py-1'}>
                    {formatFilename(value)}
                </div>
            </div>
            {typeof errorMessage === 'string' && (
                <ErrorMessage>{errorMessage}</ErrorMessage>
            )}
        </label>
    )
}

const formatFilename = (file?: File[] | File | null) => {
    if (!file) return null
    if (!Array.isArray(file)) file = [file]
    return file.map((file, i) => {
        if (!file || file.name.length <= MAX_FILENAME_LENGTH) return file.name

        const {name} = file
        const half = Math.min(name.length / 2 - 4, MAX_FILENAME_LENGTH / 2)
        return (
            <div key={i}>{name.slice(0, half) + '...' + name.slice(-half)}</div>
        )
    })
}
