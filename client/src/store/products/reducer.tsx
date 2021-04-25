import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ProductState} from 'src/store/products/types'
import {loadProducts} from './actions'
import {LoadingStatus} from 'src/util/loading-status'

export const getProductsReducer = (_my = false) =>
    createSlice({
        name: 'products',
        initialState: {status: LoadingStatus.NONE} as ProductState,
        reducers: {
            startLoading: (state, {payload}: PayloadAction<boolean>) => {
                if (payload !== _my) return state
                if (state.status === LoadingStatus.ERROR) {
                    return {status: LoadingStatus.RETRYING, error: state.error}
                }
                return {status: LoadingStatus.PENDING}
            },
        },
        extraReducers: (builder) => {
            // builder.addCase(loadProducts.pending, (state, payload) => {
            //     console.log(payload)
            // })
            builder.addCase(
                loadProducts.rejected,
                (state, {payload}): ProductState => {
                    if (!payload || (payload.my || false) !== _my) return state
                    const {msg} = payload
                    if (!msg) return state
                    return {status: LoadingStatus.ERROR, error: msg}
                }
            )
            builder.addCase(
                loadProducts.fulfilled,
                (state, {payload: {categories, my = false}}): ProductState => {
                    if (my !== _my) return state
                    return {status: LoadingStatus.SUCCESS, categories}
                }
            )
        },
    }).reducer
