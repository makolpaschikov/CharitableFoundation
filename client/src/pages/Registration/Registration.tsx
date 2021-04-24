import ky from 'ky'
import {FormEvent, useState} from 'react'
import {useDispatch} from 'react-redux'
import {FileInput} from 'src/components/shared/FileInput'
import {Input} from 'src/components/shared/Input'
import {AppDispatch} from 'src/store'
import {
    showErrorNotification,
    showInfoNotification,
} from 'src/store/notifications/actions'
import {ENDPOINTS} from 'src/util/api'

export const Registration = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [application, setApplication] = useState<File | null>(null)
    const [identity, setIdentity] = useState<File | null>(null)

    const submit = async (e: FormEvent) => {
        e.preventDefault()

        if (!application || !identity) {
            return dispatch(showErrorNotification('Файлы не загружены'))
        }

        const body = new FormData()
        body.append('username', username)
        body.append('email', email)
        body.append('password', password)
        body.append('application', application)
        body.append('identity', identity)

        try {
            const response = await ky.post(ENDPOINTS.register, {body})
            dispatch(
                showInfoNotification(
                    `Успешно: код ${
                        response.status
                    }, тело ${await response.text()}`
                )
            )
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
    }

    return (
        <div>
            <form
                onSubmit={submit}
                className={
                    'py-6 px-16 mx-12 mt-8 min-h-lg bg-white rounded-3xl shadow-lg'
                }
            >
                <h1 className={'text-xl font-bold'}>Регистрация</h1>
                <p className={'text-sm mb-4'}>
                    Пожалуйста, заполните все поля ниже
                </p>

                <Input
                    className={'mb-6'}
                    label={'Имя пользователя'}
                    value={username}
                    onChange={setUsername}
                />
                <Input
                    className={'mb-6'}
                    label={'Электронная почта'}
                    value={email}
                    onChange={setEmail}
                />
                <Input
                    className={'mb-6'}
                    label={'Пароль'}
                    value={password}
                    onChange={setPassword}
                />
                <FileInput
                    className={'mb-6'}
                    label={
                        'Документ заявки (допустимые форматы: pdf, doc, docx)'
                    }
                    value={application}
                    onChange={setApplication}
                />
                <FileInput
                    className={'mb-8'}
                    label={
                        'Удостоверяющий документ организации (допустимые форматы: pdf, doc, docx)'
                    }
                    value={identity}
                    onChange={setIdentity}
                />
                <button
                    className={
                        'bg-primary-light py-4 px-8 text-white rounded-lg'
                    }
                    type={'submit'}
                >
                    Зарегестрироваться
                </button>
            </form>
        </div>
    )
}
