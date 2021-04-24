import clsx from 'clsx'
import {FC, InputHTMLAttributes} from 'react'

type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
> & {
    label: string
    disabled?: boolean
    errorMessage?: string | false
    value?: string
}

export const Input: FC<InputProps> = ({
    label,
    disabled,
    errorMessage,
    className,
    ...inputProps
}) => (
    <label className={clsx('block', className)}>
        <div className={'text-sm font-semibold mb-2'}>{label}</div>
        <input
            className={clsx(
                'w-full border-1 border-gray-400 focus:border-primary reset-outline',
                'rounded-lg px-6 py-4'
            )}
            {...inputProps}
        />
        {typeof errorMessage === 'string' && (
            <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
    </label>
)

export const ErrorMessage: FC<{children: string; warning?: boolean}> = ({
    children,
    warning,
}) => (
    <span className={warning ? 'text-yellow-600' : 'text-red-700'}>
        {children}
    </span>
)
