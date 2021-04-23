import ky from 'ky'
import {ENDPOINTS} from 'src/util/api'

function createLoggerLevel(_level: 'error' | 'warn' | 'info' | 'log') {
    const level = _level.toUpperCase()

    const sendLog = async (message: string, data: Record<string, any> = {}) => {
        try {
            if (data.message) data._message = message
            data.message = message

            if (data.error instanceof Error) {
                const {error} = data
                // Logging general error info
                data.stack = data.error.stack
                data.errorName = data.error.name
                data.error = data.error.message

                // Logging network error
                if (error instanceof ky.HTTPError) {
                    data.errorStatusCode = error.response.status
                    data.errorRequestOptions = error.options

                    const {json} = data.errorRequestOptions
                    // Hiding personal data
                    if (json && 'password' in json) json.password = '******'

                    try {
                        data.errorResponseBody = await error.response.text()
                    } catch (e) {}
                }
            }

            ky.post(ENDPOINTS.log, {
                json: {
                    level,
                    agent: navigator?.userAgent,
                    time: Date.now(),
                    ...data,
                },
            }).catch(() => {})
        } catch (e) {}
    }

    return (message: string, data: Record<string, any> = {}): void => {
        console[_level](message, data)
        sendLog(message, data)
    }
}

export const logger = {
    error: createLoggerLevel('error'),
    info: createLoggerLevel('info'),
    warn: createLoggerLevel('warn'),
    log: createLoggerLevel('log'),
}
