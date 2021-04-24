import clsx from 'clsx'
import {FC} from 'react'
import styles from './Spinner.module.scss'

export const Spinner: FC = () => (
    <div
        className={clsx(
            'h-64 w-full flex items-center justify-center',
            styles.spinner
        )}
    >
        <svg className={'w-16 h-16'} viewBox={'0 0 100 100'} fill="none">
            <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#0891B2"
                stroke-width="10"
                r="35"
                stroke-dasharray="164.93361431346415 56.97787143782138"
            />
        </svg>
    </div>
)
