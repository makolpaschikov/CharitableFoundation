import clsx from 'clsx'
import {FC, SelectHTMLAttributes} from 'react'
import {ErrorMessage} from 'src/components/shared/Input'

type SelectProps = Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    'onChange' | 'value'
> & {
    label: string
    disabled?: boolean
    errorMessage?: string | false
    value?: string
    options: {label: string; value: string}[]
}

export const Select: FC<SelectProps> = ({
    label,
    disabled,
    errorMessage,
    className,
    options,
    ...inputProps
}) => (
    <label className={clsx('block', className)}>
        <div className={'text-sm font-semibold mb-2'}>{label}</div>
        <select
            className={'border-1 border-gray-400 rounded-lg px-1 py-2 block'}
            {...inputProps}
        >
            {options.map(({label, value}) => (
                <option value={value} key={value}>
                    {label}
                </option>
            ))}
        </select>
        {typeof errorMessage === 'string' && (
            <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
    </label>
)
