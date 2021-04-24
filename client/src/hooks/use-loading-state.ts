import {useEffect, useState} from 'react'

export function useLoadingState(defaultValue: boolean) {
    const [isReallyLoading, setIsReallyLoading] = useState(defaultValue)
    const [loading, setLoading] = useState(defaultValue)

    useEffect(() => {
        const timer = setTimeout(
            () => setLoading(isReallyLoading),
            isReallyLoading ? 200 : 500
        )

        return () => clearTimeout(timer)
    }, [isReallyLoading])

    return [loading, setIsReallyLoading] as const
}
