import {useFormik} from 'formik'
import ky from 'ky'
import {FC} from 'react'
import {useDispatch} from 'react-redux'
import {FileInput} from 'src/components/shared/FileInput'
import {FormContainer} from 'src/components/shared/FormConatiner'
import {Input} from 'src/components/shared/Input'
import {Select} from 'src/components/shared/Select'
import {TextArea} from 'src/components/shared/TextArea'
import {AppDispatch} from 'src/store'
import {showErrorNotification} from 'src/store/notifications/actions'
import {ENDPOINTS} from 'src/util/api'
import {Category} from 'src/util/categories'

type FormValues = {
    name: string
    description: string
    category: string
    photos: File[]
}

const OPTIONS = [
    {label: '—', value: Category.NONE},
    {label: 'Мебель', value: Category.INTERIOR},
    {label: 'Техника', value: Category.TECHNICS},
    {label: 'Лекарства', value: Category.MEDICINES},
    {label: 'Другое', value: Category.OTHER},
]

export const AddProduct: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const formik = useFormik<FormValues>({
        initialValues: {
            name: '',
            description: '',
            category: Category.NONE,
            photos: [],
        },
        validate: ({name, description, category, photos}) => {
            const errors: Partial<Record<keyof FormValues, string>> = {}

            if (!name.trim()) {
                errors.name = 'Введите название'
            } else if (name.trim().length < 4) {
                errors.name = 'Название слишком короткое'
            }

            if (!description.trim()) {
                errors.description = 'Введите описание'
            } else if (description.trim().length < 25) {
                errors.description =
                    'Описание слишком короткое. Опишите товар более подробно.'
            }

            if (category === Category.NONE) {
                errors.category = 'Выберите категорию'
            }
            if (photos.length === 0) {
                errors.photos = 'Загрузите хотя бы одно изображение'
            }
            return errors
        },
        onSubmit: async ({name, description, category, photos}) => {
            const body = new FormData()
            body.append('name', name)
            body.append('description', description)
            body.append('category', category)
            photos.forEach((photo) => body.append('photos', photo))

            try {
                await ky.put(ENDPOINTS.register, {
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

    return (
        <FormContainer onSubmit={formik.handleSubmit}>
            <h1 className={'mb-6 font-bold text-lg'}>Добавить товар</h1>
            <Input
                className={'mb-6'}
                label={'Название'}
                errorMessage={formik.touched.name && formik.errors.name}
                maxLength={128}
                {...formik.getFieldProps('name')}
            />
            <TextArea
                className={'mb-6'}
                label={'Описание'}
                errorMessage={
                    formik.touched.description && formik.errors.description
                }
                maxLength={4096}
                {...formik.getFieldProps('description')}
            />
            <Select
                className={'mb-6'}
                label={'Категория'}
                options={OPTIONS}
                errorMessage={formik.touched.category && formik.errors.category}
                {...formik.getFieldProps('category')}
            />
            <FileInput
                multiple
                className={'mb-6'}
                label={'Документ заявки (допустимые форматы: pdf, doc, docx)'}
                errorMessage={
                    formik.touched.photos && (formik.errors.photos as string)
                }
                {...formik.getFieldProps('photos')}
                onChange={(files) =>
                    formik.setFieldValue('photos', Array.from(files))
                }
            />
            <button
                className={'bg-primary-light py-4 px-8 text-white rounded-lg'}
                type={'submit'}
            >
                Добавить
            </button>
        </FormContainer>
    )
}
