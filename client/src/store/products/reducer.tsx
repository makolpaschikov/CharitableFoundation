import {createSlice} from '@reduxjs/toolkit'
import {ProductState} from 'src/store/products/types'
import {loadProducts} from './actions'
import {LoadingStatus} from 'src/util/loading-status'

const products = createSlice({
    name: 'user',
    initialState: {status: LoadingStatus.NONE} as ProductState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadProducts.pending, (state) => {
            if (state.status === LoadingStatus.ERROR) {
                return {status: LoadingStatus.RETRYING, error: state.error}
            }
            return {status: LoadingStatus.PENDING}
        })
        builder.addCase(
            loadProducts.rejected,
            (state, {payload: error}): ProductState => {
                if (!error) return state
                return {status: LoadingStatus.ERROR, error}
            }
        )
        builder.addCase(
            loadProducts.fulfilled,
            (_, {payload: categories}): ProductState => {
                return {status: LoadingStatus.SUCCESS, categories}
            }
        )
    },
})

export const productsReducer = products.reducer
