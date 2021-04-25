import {FC} from 'react'
import {Spinner} from 'src/components/shared/Spinner'

export const RetryLoading: FC<{
    message: string
    retrying?: boolean
    retry?: () => unknown
}> = ({retrying, retry, message}) => (
    <div>
        <div className={'max-w-2xl mx-auto mt-8'}>
            <h1 className={'text-xl font-bold mb-2'}>Ошибка</h1>
            <p className={'mb-6'}>{message}</p>
            <button
                onClick={retry}
                disabled={retrying}
                className={'bg-primary-light py-4 px-8 text-white rounded-lg'}
            >
                Повторить попытку
            </button>
        </div>
        {retrying && <Spinner />}
    </div>
)
