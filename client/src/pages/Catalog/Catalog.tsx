import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RetryLoading} from 'src/components/shared/RetryLoading'
import {Spinner} from 'src/components/shared/Spinner'
import {AppDispatch, AppState} from 'src/store'
import {loadProducts} from 'src/store/products'
import {Category, CategoryName} from 'src/util/categories'
import {LoadingStatus} from 'src/util/loading-status'

export const Catalog = () => {
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
        case LoadingStatus.SUCCESS:
            return (
                <div className={'px-32 pt-12'}>
                    <h1 className={'font-bold text-lg'}>Каталог вещей</h1>
                    <div className={'max-w-6xl'}>
                        {Object.keys(products.categories).map((category) => (
                            <div>
                                <h2 className={'text-lg font-bold'}>
                                    {CategoryName[category as Category]}
                                </h2>
                                <div>
                                    {products.categories[
                                        category as Category
                                    ].map((product) => (
                                        <div>
                                            <div>{product.name}</div>
                                            <div>{product.description}</div>
                                            <img
                                                alt={product.name}
                                                // @ts-ignore
                                                src={product.image}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
    }
}
