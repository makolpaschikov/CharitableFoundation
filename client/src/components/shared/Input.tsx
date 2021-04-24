import clsx from 'clsx'
import {ChangeEvent, FC, InputHTMLAttributes} from 'react'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    label: string
    disabled?: boolean
    errorMessage?: string
    onChange: (value: string, e: ChangeEvent<HTMLInputElement>) => unknown
}

export const Input: FC<InputProps> = ({
    label,
    disabled,
    errorMessage,
    className,
    onChange,
    ...inputProps
}) => (
    <label className={clsx('block', className)}>
        <div className={'text-sm font-semibold mb-2'}>{label}</div>
        <input
            className={clsx(
                'w-full border-1 border-gray-400 focus:border-primary reset-outline',
                'rounded-lg px-6 py-4'
            )}
            onChange={(e) => onChange(e.target.value, e)}
            {...inputProps}
        />
        {typeof errorMessage === 'string' && (
            <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
    </label>
)

const ErrorMessage: FC<{children: string}> = ({children}) => (
    <span className={'text-red-700'}>{children}</span>
)
