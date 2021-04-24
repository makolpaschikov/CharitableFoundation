const BASE = '/api'

const formatEndpoints = <K extends string>(
    endpoints: Record<K, string>
): Record<K, string> => {
    for (const endpoint in endpoints) {
        endpoints[endpoint] = `${BASE}${endpoints[endpoint]}`
    }
    return endpoints
}

export const ENDPOINTS = formatEndpoints({
    currentUser: '/me',
    register: '/register',
    log: '/log',
})
