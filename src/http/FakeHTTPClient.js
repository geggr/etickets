export default class FakeHTTPClient {

    constructor() { }

    static database = Array
        .from({ length: 12 }, (_, index) => index)
        .reduce((accumulator, current) => {
            accumulator.push({
                uid: current,
                event: `Evento ${current}`,
                date: new Date('2023-06-06')
            })

            return accumulator
        }, [])

    static userInformation = {
        name: 'Geovani Granieri',
        thumbnail: 'https://randomuser.me/api/portraits/men/75.jpg',
        tickets: [
            { uid: '977', code: '#93721327', name: 'Coldplay: Music of Spheres - pista', event: 'Coldplay: Music of Spheres', date: new Date('2023-08-15') },
            { uid: '1050', code: '#102030', name: 'Festival GP Week - Camarote', event: 'Festival GP Week', date: new Date('2023-11-20') },
            { uid: '1050', code: '#789123', name: 'São Paulo x Palmeiras - Arquibancada', event: 'São Paulo x Palmeiras', date: new Date('2023-07-05') },
        ]
    }

    static async login({ email, _password }) {
        localStorage.setItem("email", email)
    }

    static async register(ticket) {
        FakeHTTPClient.userInformation.tickets.push(ticket)
    }

    static async homepage() {
        return FakeHTTPClient.database.slice(6)
    }

    static async dashboard() {

        const response = {
            tickets: FakeHTTPClient.userInformation.tickets,
            latest: FakeHTTPClient.database,
            selecteds: FakeHTTPClient.database.slice(8)
        }

        return response
    }

    static async event() {
        return {
            title: 'Coldplay: Music of Spheres',
            description: `
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            `,
            tickets: [
                { uid: '10000000', event: 'Evento 899', name: 'Evento 899', location: 'Pista', country: 'Brazil', date: new Date('11-11-2021'), sector: 'Pista Premium' },
                { uid: '20000000', event: 'Evento 899', name: 'Evento 899', location: 'Pista', country: 'Brazil', date: new Date('11-11-2021'), sector: 'Cadeira Inferior' },
                { uid: '30000000', event: 'Evento 899', name: 'Evento 899', location: 'Pista', country: 'Brazil', date: new Date('11-11-2021'), sector: 'Cadeira Superior' },
                { uid: '40000000', event: 'Evento 899', name: 'Evento 899', location: 'Pista', country: 'Brazil', date: new Date('11-11-2021'), sector: 'Pista' },
                { uid: '50000000', event: 'Evento 899', name: 'Evento 899', location: 'Pista', country: 'Brazil', date: new Date('11-19-2021'), sector: 'Pista Premium' },
                { uid: '60000000', event: 'Evento 899', name: 'Evento 899', location: 'Pista', country: 'Brazil', date: new Date('11-19-2021'), sector: 'Cadeira Inferior' },
            ]
        }
    }

    static async trade(userTicket, interestTicket) {
        // const expected = ((Math.round(Math.random() * 100) % 2) === 0)
        //     ? 'HAS_TRADE'
        //     : 'CREATED_INTERESS'

        const expected = 'HAS_TRADE'

        if (expected === 'HAS_TRADE') {
            return {
                status: 'TRADED',
                oldTicket: { ...userTicket },
                newTicket: { ...interestTicket }
            }
        }

        if (expected === 'CREATED_INTERESS') {
            return {
                status: 'INTERESS',
            }
        }
    }

}
