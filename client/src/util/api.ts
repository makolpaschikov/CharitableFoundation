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
    addProduct: '/add-product',
    getProducts: '/products',
    getMyProducts: '/my-products',
    removeProduct: '/remove-product',
    register: '/register',
    logout: '/logout',
    login: '/login',
    log: '/log',
})
