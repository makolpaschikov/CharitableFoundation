import clsx from 'clsx'
import {FC, TextareaHTMLAttributes} from 'react'
import {ErrorMessage} from 'src/components/shared/Input'

type TextAreaProps = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange' | 'value'
> & {
    label: string
    disabled?: boolean
    errorMessage?: string | false
    value?: string
}

export const TextArea: FC<TextAreaProps> = ({
    label,
    disabled,
    errorMessage,
    className,
    ...inputProps
}) => (
    <label className={clsx('block', className)}>
        <div className={'text-sm font-semibold mb-2'}>{label}</div>
        <textarea
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
