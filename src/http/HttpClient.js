export default class HttpClient {

    static BASE_URI = "http://localhost:3000"

    constructor() { }

    static async get(endpoint, query = {}) {
        const params = new URLSearchParams({ ...query })

        const response = await fetch(`${HttpClient.BASE_URI}${endpoint}${params}`)

        return await response.json()
    }

    static async post(endpoint, data) {
        const response = await fetch(`${HttpClient.BASE_URI}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return await response.json()
    }


    static async homepage() {

    }

    static async dashboard(email) {

    }

    static async event(id) {

    }

    static async trade(userTicket, interestTicket) {

    }

}
