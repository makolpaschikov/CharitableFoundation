import {createAsyncThunk} from '@reduxjs/toolkit'
import {User} from 'src/store/user'
import ky from 'ky'
import {ENDPOINTS} from 'src/util/api'
import {getMessageFromApiError} from 'src/util/api-error'

export const loadUser = createAsyncThunk<User, void, {rejectValue: string}>(
    'users/loadUser',
    (_, {rejectWithValue}) => {
        return ky
            .get(ENDPOINTS.currentUser)
            .json<User>()
            .catch((e) =>
                getMessageFromApiError(
                    e,
                    'не удалось загрузить текущего пользователя'
                ).then(rejectWithValue)
            )
    }
)

export const registerUser = async () => {}
