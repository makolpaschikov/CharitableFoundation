import {createAsyncThunk} from '@reduxjs/toolkit'
import ky from 'ky'
import {ENDPOINTS} from 'src/util/api'
import {getMessageFromApiError} from 'src/util/api-error'
import {CategoriesMap} from 'src/store/products/types'

export const loadProducts = createAsyncThunk<
    CategoriesMap,
    void,
    {rejectValue: string}
>('products/loadProducts', (_, {rejectWithValue, dispatch}) => {
    return ky
        .get(ENDPOINTS.getProducts, {credentials: 'include'})
        .json<CategoriesMap>()
        .catch((e) => {
            return getMessageFromApiError(
                e,
                'не удалось загрузить каталог'
            ).then(rejectWithValue)
        })
})

export const registerUser = async () => {}
