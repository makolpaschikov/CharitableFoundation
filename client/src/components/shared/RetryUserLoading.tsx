import {FC} from 'react'
import {Spinner} from 'src/components/shared/Spinner'

export const RetryUserLoading: FC<{
    retrying?: boolean
    retry?: () => unknown
}> = ({retrying, retry}) => (
    <div>
        <div className={'max-w-2xl mx-auto mt-8'}>
            <h1 className={'text-xl font-bold mb-2'}>Ошибка</h1>
            <p className={'mb-6'}>
                Не удалось загрузить информацию о текущем пользователе.
                Попробуйте ещё раз позже.
            </p>
            <button
                onClick={retry}
                className={'bg-primary-light py-4 px-8 text-white rounded-lg'}
            >
                Повторить попытку
            </button>
        </div>
        {retrying && <Spinner />}
    </div>
)
