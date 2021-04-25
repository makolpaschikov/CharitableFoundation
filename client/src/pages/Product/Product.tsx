import ky from 'ky'
import {FC, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RouteComponentProps} from 'react-router'
import {RetryLoading} from 'src/components/shared/RetryLoading'
import {Spinner} from 'src/components/shared/Spinner'
import {AppDispatch, AppState} from 'src/store'
import {loadProducts, Product as TProduct} from 'src/store/products'
import {ENDPOINTS} from 'src/util/api'
import {Category} from 'src/util/categories'
import {LoadingStatus} from 'src/util/loading-status'
import {Contact} from 'src/pages/Contacts'

export const Product = ({
    match: {
        params: {category, id},
    },
}: RouteComponentProps<{category: Category; id: string}>) => {
    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector((state: AppState) => state.products)

    useEffect(() => {
        if (products.status === LoadingStatus.NONE) {
            dispatch(loadProducts())
        }
    }, [dispatch, products.status])

    switch (products.status) {
        case LoadingStatus.NONE:
        case LoadingStatus.PENDING:
            return <Spinner />
        case LoadingStatus.ERROR:
        case LoadingStatus.RETRYING:
            return (
                <RetryLoading
                    message={
                        'Не удалось загрузить каталог. Попробуйте ещё раз позже.'
                    }
                    retrying={products.status === LoadingStatus.RETRYING}
                    retry={() => dispatch(loadProducts())}
                />
            )
        default: {
            const product = products.categories[category]?.find(
                ({id: _id}) => _id === +id
            )
            if (!product) {
                return <RetryLoading message={'Нет такого товара.'} />
            }
            return <View product={product} />
        }
    }
}

const View: FC<{product: TProduct}> = ({product}) => {
    return (
        <div>
            <div
                className={
                    'p-16 mt-8 bg-white rounded-3xl shadow-lg max-w-3xl mx-auto'
                }
            >
                <div
                    className={
                        'bg-gray-200 h-72 w-full flex justify-center items-center mb-4'
                    }
                >
                    <img
                        className={'max-w-full max-h-full'}
                        alt={product.name}
                        // @ts-ignore
                        src={product.image}
                    />
                </div>
                <h1 className={'text-3xl font-bold mb-4'}>{product.name}</h1>
                <p className={'mb-6'}>{product.description}</p>
                <GetContact product={product} />
            </div>
        </div>
    )
}

const GetContact: FC<{product: TProduct}> = ({product}) => {
    const [status, setStatus] = useState(LoadingStatus.NONE)
    const [data, setData] = useState<null | {email: string; name: string}>(null)

    const fetch = async () => {
        if (status === LoadingStatus.SUCCESS) return
        setStatus(
            status === LoadingStatus.ERROR
                ? LoadingStatus.RETRYING
                : LoadingStatus.PENDING
        )
        try {
            const result = await ky
                // @ts-ignore
                .get(ENDPOINTS.getContacts + `?id=${product.userID}`, {
                    credentials: 'include',
                })
                .json<{email: string; name: string}>()
            setData(result)
            setStatus(LoadingStatus.SUCCESS)
        } catch (e) {
            setStatus(LoadingStatus.ERROR)
        }
    }
    const getView = () => {
        switch (status) {
            case LoadingStatus.NONE:
                return null
            case LoadingStatus.PENDING:
                return <Spinner />
            case LoadingStatus.ERROR:
            case LoadingStatus.RETRYING:
                return (
                    <RetryLoading
                        message={'Не удалось загрузить контакты'}
                        retrying={status === LoadingStatus.RETRYING}
                        retry={fetch}
                    />
                )
            case LoadingStatus.SUCCESS:
                return (
                    <>
                        <Contact label={'Название'} value={data!.name} />
                        <Contact
                            label={'Электронная почта'}
                            value={data!.email}
                        />
                    </>
                )
        }
    }
    return (
        <>
            <button
                className={'bg-primary-light py-4 px-8 text-white rounded-lg'}
                onClick={fetch}
            >
                Связаться
            </button>
            {getView()}
        </>
    )
}
