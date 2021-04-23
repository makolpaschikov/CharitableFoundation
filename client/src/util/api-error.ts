import ky from 'ky'
import {logger} from 'src/util/logger'

export const getMessageFromApiError = async (
    error: Error,
    action?: string
): Promise<string> => {
    if (action) action = `, ${action}`

    if (error instanceof ky.HTTPError) {
        const {response} = error
        if (response.status >= 500) {
            logger.warn('Server error happened while fetching user', {
                error,
            })
        } else if (response.status >= 400) {
            try {
                const json = await response.json()
                if (typeof json.error === 'string') {
                    return json.error
                }
            } catch (e) {}

            logger.error('Invalid server error response body', {error})
        } else {
            throw new Error('Unknown error')
        }

        return `Произошла ошибка сервера${action}. Попробуйте ещё раз чуть позже.`
    }
    if (error instanceof ky.TimeoutError) {
        return 'Время запроса истекло. Проверьте, подключены ли вы к интернету.'
    }
    if ('navigator' in window && window.navigator.onLine === false) {
        return 'Нет подключения к интернету.'
    }
    return `Произошла неизвестная ошибка${action}. Попробуйте ещё раз позже.`
}
