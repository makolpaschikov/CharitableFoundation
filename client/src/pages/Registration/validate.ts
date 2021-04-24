export type RegistrationFormValues = {
    username: string
    email: string
    password: string
    passwordRepeat: string
    application: null | File
    identity: null | File
}

const USERNAME_REGEX = /^[ \p{L}_-]+$/iu

export const validateRegistration = (values: RegistrationFormValues) => {
    const errors: Partial<Record<keyof RegistrationFormValues, string>> = {}

    if (!values.email.trim()) {
        errors.email = 'Введите адрес электронной почты'
    } else if (!/.+@.+\..+/i.test(values.email)) {
        errors.email = 'Некорректный электронный адрес'
    }

    if (!values.username.trim()) {
        errors.username = 'Введите имя пользователя'
    } else if (values.username.trim().length < 4) {
        errors.username = 'Имя пользователя должно быть не короче 4 символов'
    } else if (!USERNAME_REGEX.test(values.username)) {
        const badSymbols: Record<string, true> = {}
        for (const char of values.username) {
            if (!USERNAME_REGEX.test(char)) {
                if (char === ',') badSymbols['","'] = true
                else badSymbols[char] = true
            }
        }
        const symbols = Object.keys(badSymbols).slice(0, 5).join(', ')

        errors.username = `Имя пользователя не должно содержать эти символы: ${symbols}`
    }

    if (values.password.length < 8) {
        errors.password = `Пароль должен быть не короче 8 символов`
    }

    if (!values.passwordRepeat) {
        errors.passwordRepeat = 'Повторите пароль'
    } else if (values.passwordRepeat !== values.password) {
        errors.passwordRepeat = 'Пароли не совпадают'
    }

    if (!values.application) {
        errors.application = 'Загрузите файл с заявкой'
    }
    if (!values.identity) {
        errors.identity = 'Загрузите файл с удостоверяющим документом'
    }

    return errors
}
