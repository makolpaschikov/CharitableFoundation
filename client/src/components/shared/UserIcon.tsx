import clsx from 'clsx'
import {FC, HTMLAttributes} from 'react'

export const UserIcon: FC<HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => (
    <div
        className={clsx(
            'w-20 h-20 flex items-center justify-center rounded-full border-primary-dark border-2',
            'mx-auto',
            className
        )}
    >
        <svg
            className={'w-8 h-8'}
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M32.6624 10.8378C32.6624 16.5347 28.0484 21.1486 22.3516 21.1486C16.6548 21.1486 12.0408 16.5347 12.0408 10.8378C12.0408 5.141 16.6548 0.527023 22.3516 0.527023C28.0484 0.527023 32.6624 5.141 32.6624 10.8378ZM1.22998 37.8649C1.22998 36.2512 2.03435 34.8007 3.43269 33.5102C4.83443 32.2164 6.79947 31.1175 9.02065 30.2277C13.4638 28.4477 18.806 27.5541 22.3516 27.5541C25.8972 27.5541 31.2394 28.4477 35.6826 30.2277C37.9037 31.1175 39.8688 32.2164 41.2705 33.5102C42.6688 34.8007 43.4732 36.2512 43.4732 37.8649V42.7703H1.22998V37.8649Z"
                fill="#164E63"
                stroke="#164E63"
            />
        </svg>
    </div>
)
