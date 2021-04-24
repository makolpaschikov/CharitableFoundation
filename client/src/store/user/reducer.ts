import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User, UserState} from 'src/store/user'
import {loadUser} from 'src/store/user/actions'
import {LoadingStatus} from 'src/util/loading-status'

const user = createSlice({
    name: 'user',
    initialState: {status: LoadingStatus.NONE} as UserState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadUser.pending, (state) => {
            if (state.status === LoadingStatus.ERROR) {
                return {status: LoadingStatus.RETRYING, error: state.error}
            }
            return {status: LoadingStatus.PENDING}
        })
        builder.addCase(
            loadUser.rejected,
            (state, {payload: error}): UserState => {
                if (!error) return state
                return {status: LoadingStatus.ERROR, error}
            }
        )
        builder.addCase(
            loadUser.fulfilled,
            (_, {payload: user}: PayloadAction<User | null>) => {
                return {status: LoadingStatus.SUCCESS, user}
            }
        )
    },
})

export const userReducer = user.reducer
