import {useFormik} from 'formik'
import ky from 'ky'
import {FC, FormEvent, ReactNode} from 'react'
import {useDispatch} from 'react-redux'
import {FileInput} from 'src/components/shared/FileInput'
import {Input} from 'src/components/shared/Input'
import {
    RegistrationFormValues,
    validateRegistration,
} from 'src/pages/Registration/validate'
import {AppDispatch} from 'src/store'
import {showErrorNotification} from 'src/store/notifications/actions'
import {ENDPOINTS} from 'src/util/api'

export const Registration = () => {
    const dispatch = useDispatch<AppDispatch>()
    const formik = useFormik<RegistrationFormValues>({
        initialValues: {
            username: '',
            email: '',
            password: '',
            passwordRepeat: '',
            application: null,
            identity: null,
        },
        validate: validateRegistration,
        onSubmit: async (
            {application, identity, username, email, password},
            formik
        ) => {
            const body = new FormData()
            body.append('username', username)
            body.append('email', email)
            body.append('password', password)
            body.append('application', application!)
            body.append('identity', identity!)

            try {
                await ky.post(ENDPOINTS.register, {
                    body,
                    credentials: 'include',
                })
                formik.setStatus('done')
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

    if (formik.status === 'done') {
        return (
            <FormContainer onSubmit={() => {}}>
                <h1 className={'text-xl font-bold mb-4'}>
                    Подтверждение электронной почты
                </h1>
                <p className={'mb-6'}>
                    Для подтверждения электронной почты перейдите по ссылке в
                    письме, которое было отправлено на указанный электронный
                    адрес
                </p>
            </FormContainer>
        )
    }

    return (
        <FormContainer onSubmit={formik.handleSubmit}>
            <h1 className={'text-xl font-bold'}>Регистрация</h1>
            <p className={'text-sm mb-4'}>
                Пожалуйста, заполните все поля ниже
            </p>

            <Input
                className={'mb-6'}
                label={'Имя пользователя'}
                errorMessage={formik.touched.username && formik.errors.username}
                maxLength={40}
                {...formik.getFieldProps('username')}
            />
            <Input
                className={'mb-6'}
                label={'Электронная почта'}
                errorMessage={formik.touched.email && formik.errors.email}
                maxLength={128}
                {...formik.getFieldProps('email')}
            />
            <Input
                type={'password'}
                className={'mb-6'}
                label={'Пароль'}
                errorMessage={formik.touched.password && formik.errors.password}
                maxLength={128}
                {...formik.getFieldProps('password')}
            />
            <Input
                type={'passwordRepeat'}
                className={'mb-6'}
                label={'Повторите пароль'}
                errorMessage={
                    formik.touched.passwordRepeat &&
                    formik.errors.passwordRepeat
                }
                maxLength={128}
                {...formik.getFieldProps('passwordRepeat')}
            />
            <FileInput
                className={'mb-6'}
                label={'Документ заявки (допустимые форматы: pdf, doc, docx)'}
                errorMessage={
                    formik.touched.application && formik.errors.application
                }
                {...formik.getFieldProps('application')}
                onChange={(file) => formik.setFieldValue('application', file)}
            />
            <FileInput
                className={'mb-8'}
                label={
                    'Удостоверяющий документ организации (допустимые форматы: pdf, doc, docx)'
                }
                errorMessage={formik.touched.identity && formik.errors.identity}
                {...formik.getFieldProps('identity')}
                onChange={(file) => formik.setFieldValue('identity', file)}
            />
            <button
                className={'bg-primary-light py-4 px-8 text-white rounded-lg'}
                type={'submit'}
            >
                Зарегестрироваться
            </button>
        </FormContainer>
    )
}

const FormContainer: FC<{
    onSubmit: (e: FormEvent<HTMLFormElement>) => unknown
    children: ReactNode
}> = ({onSubmit, children}) => (
    <div>
        <form
            onSubmit={onSubmit}
            className={'py-6 px-16 mx-12 mt-8 bg-white rounded-3xl shadow-lg'}
        >
            {children}
        </form>
    </div>
)
