import clsx from 'clsx'
import {useFormik} from 'formik'
import ky from 'ky'
import {FC} from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Input} from 'src/components/shared/Input'
import {UserIcon} from 'src/components/shared/UserIcon'
import {AppDispatch} from 'src/store'
import {showErrorNotification} from 'src/store/notifications/actions'
import {ENDPOINTS} from 'src/util/api'

type LoginFormValues = {
    username: string
    password: string
}

export const Login: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const formik = useFormik<LoginFormValues>({
        initialValues: {
            username: '',
            password: '',
        },
        validate: (values) => {
            const errors: Partial<Record<keyof LoginFormValues, string>> = {}
            if (!values.username.trim())
                errors.username = 'Введите имя пользователя или электронную почту'
            if (!values.password) errors.password = 'Введите пароль'
            return errors
        },
        onSubmit: async ({username, password}) => {
            const body = new FormData()
            body.append('username', username)
            body.append('password', password)

            try {
                await ky.post(ENDPOINTS.login, {body})
            } catch (e) {
                console.error(e)
                if (e instanceof ky.HTTPError) {
                    try {
                        const text = await e.response.text()
                        dispatch(
                            showErrorNotification(
                                `Сервер вернул ошибку: код ${e.response.status}, тело ${text}`
                            )
                        )
                    } catch (e) {
                        dispatch(
                            showErrorNotification(
                                `Сервер вернул ошибку: код ${e.response.status}`
                            )
                        )
                    }
                } else {
                    dispatch(
                        showErrorNotification(
                            `Произошла непонятная ошибка, подробности в консоли`
                        )
                    )
                }
            }
        },
    })

    return (
        <div>
            <form
                onSubmit={formik.handleSubmit}
                className={
                    'py-6 px-16 mx-auto max-w-lg mt-8 bg-white rounded-3xl shadow-lg'
                }
            >
                <div className={'text-center mb-6'}>
                    <UserIcon className={'mb-2'} />
                    <p className={'text-primary-dark text-sm'}>
                        Благотворительный фонд
                        <br />
                        «Фондздрав»
                    </p>
                </div>
                <Input
                    label={'Имя пользователя или электронная почта'}
                    className={'mb-6'}
                    errorMessage={formik.touched.username && formik.errors.username}
                    {...formik.getFieldProps('username')}
                />
                <Input
                    type={'password'}
                    label={'Пароль'}
                    className={'mb-8'}
                    errorMessage={
                        formik.touched.password && formik.errors.password
                    }
                    {...formik.getFieldProps('password')}
                />
                <div className={'flex mb-12'}>
                    <button
                        className={
                            'bg-primary-light py-4 px-8 text-white rounded-lg flex-1 mr-2'
                        }
                        type={'submit'}
                    >
                        Войти
                    </button>
                    <Link
                        className={clsx(
                            'border-1 border-primary-dark rounded-lg py-4 px-8 flex-1',
                            'hover:bg-gray-100 activ:bg-gray-200 text-center'
                        )}
                        to={'/register'}
                    >
                        Регистрация
                    </Link>
                </div>
            </form>
        </div>
    )
}
