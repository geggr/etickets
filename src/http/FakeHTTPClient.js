export default class FakeHTTPClient {

    constructor() { }

    static database = Array
        .from({ length: 12 }, (_, index) => index)
        .reduce((accumulator, current) => {
            accumulator.push({
                id: current,
                title: `Evento ${current}`,
                date: new Date('2023-06-06')
            })

            return accumulator
        }, [])

    static userInformation = {
        name: 'Geovani Granieri',
        thumbnail: 'https://randomuser.me/api/portraits/men/75.jpg',
        tickets: [
            { id: 977, code: '#93721327', title: 'Coldplay: Music of Spheres', date: new Date('2023-08-15') },
            { id: 1050, code: '#102030', title: 'Festival GP Week', date: new Date('2023-11-20') },
            { id: 1050, code: '#789123', title: 'São Paulo x Palmeiras', date: new Date('2023-07-05') },
        ]
    }

    getClientToken() {

    }

    static async login({ email, _password }) {
        localStorage.setItem("email", email)

    }

    static async register(ticket) {
        FakeHTTPClient.userInformation.tickets.push(ticket)
    }

    static async dashboard() {

        const response = {
            tickets: FakeHTTPClient.userInformation.tickets,
            latest: FakeHTTPClient.database,
            selecteds: FakeHTTPClient.database.slice(8)
        }

        return response
    }

    static async trade(ticket, expected) {
        if (expected === 'HAS_TRADE') {
            return {
                status: 'TRADED',
                oldTicket: { ...ticket },
                newTicket: { id: 977, code: '#105040', title: 'Evanescence', date: new Date('2023-10-10') }
            }
        }

        if (expected === 'CREATE_INTERESS') {
            return {
                status: 'INTERESS',
            }
        }
    }

}