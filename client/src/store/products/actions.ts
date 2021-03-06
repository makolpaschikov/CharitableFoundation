import {createAsyncThunk} from '@reduxjs/toolkit'
import ky from 'ky'
import {ENDPOINTS} from 'src/util/api'
import {getMessageFromApiError} from 'src/util/api-error'
import {CategoriesMap} from 'src/store/products/types'
import {AppDispatch} from 'src/store'

export const loadProducts = createAsyncThunk<
    {categories: CategoriesMap; my?: boolean},
    boolean | undefined,
    {rejectValue: {msg: string; my?: boolean}; dispatch: AppDispatch}
>('products/loadProducts', (my, {rejectWithValue, dispatch}) => {
    dispatch({type: 'products/startLoading', payload: my})
    return ky
        .get(my ? ENDPOINTS.getMyProducts : ENDPOINTS.getProducts, {
            credentials: 'include',
        })
        .json<CategoriesMap>()
        .then((categories) => ({categories, my}))
        .catch((e) => {
            return getMessageFromApiError(
                e,
                'не удалось загрузить каталог'
            ).then((msg) => rejectWithValue({msg, my}))
        })
})

export const registerUser = async () => {}
