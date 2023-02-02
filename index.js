/**
 * BlockBee's NodeJS Library
 * @author BlockBee <info@blockbee.io>
 */
class BlockBee {
    static #baseURL = 'https://api.blockbee.io'

    constructor(apiKey, parameters = {}, bbParams = {}) {
        if (parameters === '') {
            parameters = {}
        }
    
        if (bbParams === '') {
            bbParams = {}
        }
        
        if (!apiKey) {
            throw new Error('Missing API Key')
        }
        
        this.parameters = parameters
        this.bbParams = bbParams
        this.apiKey = apiKey
    }

    /**
     * Requests a Payment Link
     * @returns {Promise<*|null>}
     */
    async paymentRequest(redirectUrl, value) {
        if (!redirectUrl || !value || !this.apiKey) {
            return null
        }
        
        redirectUrl = new URL(redirectUrl)
        const parameters = this.parameters
        
        if (Object.entries(parameters).length > 0) {
            Object.entries(parameters).forEach(([k, v]) => redirectUrl.searchParams.append(k, v))
        }
        
        const params = {...this.bbParams, ...{
                redirect_url: encodeURI(redirectUrl.toString()),
                value: value,
                apikey: this.apiKey
            }
        }
        
        const response = await BlockBee.#_request('', 'checkout/request', params)
    
        if (response.status === 'success') {
            return {
                'success_token': response.success_token,
                'payment_url': response.payment_url
            }
        }

        return null
    }
    
    /**
     * Requests a Payment Link
     * @returns {Promise<*|null>}
     */
    async depositRequest(notifyUrl) {
        if (!notifyUrl || !this.apiKey) {
            return null
        }
    
        notifyUrl = new URL(notifyUrl)
        const parameters = this.parameters
    
        if (Object.entries(parameters).length > 0) {
            Object.entries(parameters).forEach(([k, v]) => notifyUrl.searchParams.append(k, v))
        }
        
        const params = {...this.bbParams, ...{
                notify_url: encodeURI(notifyUrl.toString()),
                apikey: this.apiKey
            }
        }
        
        const response = await BlockBee.#_request('', 'deposit/request', params)
        
        if (response.status === 'success') {
            return {
                'payment_url': response.payment_url
            }
        }
        
        return null
    }

    /**
     * Helper function to make a request to API
     * @param coin
     * @param endpoint
     * @param params
     * @returns {Promise<any>}
     */
    static async #_request(coin, endpoint, params = {}) {
        const url = coin ? new URL(`${this.#baseURL}/${coin.replace('_', '/')}/${endpoint}/`) : new URL(`${this.#baseURL}/${endpoint}/`)
        
        if (params) {
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        }

        const headers = new Headers({
            referer: this.#baseURL
        })

        const fetchParams = {
            method: 'GET',
            headers,
            credentials: 'include'
        }

        const response = await fetch(url, fetchParams)
        return await response.json()
    }
}

module.exports = BlockBee
