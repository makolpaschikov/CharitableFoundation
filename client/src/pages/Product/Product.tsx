import {FC, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RouteComponentProps} from 'react-router'
import {RetryLoading} from 'src/components/shared/RetryLoading'
import {Spinner} from 'src/components/shared/Spinner'
import {AppDispatch, AppState} from 'src/store'
import {loadProducts, Product as TProduct} from 'src/store/products'
import {Category} from 'src/util/categories'
import {LoadingStatus} from 'src/util/loading-status'

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
                        className={'w-max-full h-max-full'}
                        alt={product.name}
                        // @ts-ignore
                        src={product.image}
                    />
                </div>
                <h1 className={'text-3xl font-bold mb-4'}>{product.name}</h1>
                <p className={'mb-6'}>{product.description}</p>
                <button
                    className={
                        'bg-primary-light py-4 px-8 text-white rounded-lg'
                    }
                    type={'submit'}
                >
                    Связаться
                </button>
            </div>
        </div>
    )
}
