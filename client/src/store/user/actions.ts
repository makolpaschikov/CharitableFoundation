import {createAsyncThunk} from '@reduxjs/toolkit'
import {User} from 'src/store/user'
import ky from 'ky'
import {ENDPOINTS} from 'src/util/api'
import {getMessageFromApiError} from 'src/util/api-error'
import {showErrorNotification} from 'src/store/notifications/actions'

export const loadUser = createAsyncThunk<
    null | User,
    void,
    {rejectValue: string}
>('users/loadUser', (_, {rejectWithValue, dispatch}) => {
    return ky
        .get(ENDPOINTS.currentUser, {credentials: 'include'})
        .json<User>()
        .catch((e) => {
            if (e instanceof ky.HTTPError && e.response.status === 401) {
                return null
            }
            return getMessageFromApiError(
                e,
                'не удалось загрузить текущего пользователя'
            ).then((message) => {
                dispatch(showErrorNotification(message))
                return rejectWithValue(message)
            })
        })
})

export const registerUser = async () => {}
