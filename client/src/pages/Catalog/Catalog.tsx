import {FC, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RetryLoading} from 'src/components/shared/RetryLoading'
import {Spinner} from 'src/components/shared/Spinner'
import {AppDispatch, AppState} from 'src/store'
import {CategoriesMap, loadProducts} from 'src/store/products'
import {Category, CategoryName} from 'src/util/categories'
import {LoadingStatus} from 'src/util/loading-status'
// @ts-ignore
import LinesEllipsis from 'react-ellipsis-pjs'
import {Link} from 'react-router-dom'

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
            return <Display categories={products.categories} />
    }
}

const Display: FC<{categories: CategoriesMap}> = ({categories}) => {
    const [category, setCategory] = useState(Category.NONE)

    return (
        <div className={'px-32 pt-12'}>
            <h1 className={'font-bold text-lg mb-4'}>Каталог вещей</h1>
            <div>
                Категория:
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className={'inline-block ml-2'}
                >
                    {Object.keys(Category).map((c) => (
                        <option value={c}>{CategoryName[c as Category]}</option>
                    ))}
                </select>
            </div>
            <div className={'max-w-6xl flex flex-wrap'}>
                {(Object.keys(categories) as Category[])
                    .map((category) =>
                        categories[category].length === 0
                            ? []
                            : categories[category].map((product) => (
                                  <div
                                      key={category + '-' + product.id}
                                      className={
                                          'm-4 bg-white rounded-2xl p-4 flex-grow-0'
                                      }
                                  >
                                      <div
                                          className={
                                              'bg-gray-200 flex items-center w-48 h-32 mb-2'
                                          }
                                      >
                                          <img
                                              className={
                                                  'max-w-full max-h-full'
                                              }
                                              alt={product.name}
                                              // @ts-ignore
                                              src={product.image}
                                          />
                                      </div>
                                      <div>{product.name}</div>
                                      <div
                                          className={
                                              'w-48 h-32 overflow-hidden'
                                          }
                                      >
                                          <LinesEllipsis
                                              text={product.description}
                                              lines={5}
                                          ></LinesEllipsis>
                                      </div>
                                      <div className={'text-right'}>
                                          <Link
                                              className={
                                                  'text-blue-800 underline'
                                              }
                                              to={`/product/${category}/${product.id}`}
                                          >
                                              Подробнее
                                          </Link>
                                      </div>
                                  </div>
                              ))
                    )
                    .flat()}
            </div>
        </div>
    )
}
