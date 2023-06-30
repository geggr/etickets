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
                { id: 1, country: 'Brazil', date: new Date('11-11-2021'), sector: 'Pista Premium' },
                { id: 2, country: 'Brazil', date: new Date('11-11-2021'), sector: 'Cadeira Inferior' },
                { id: 3, country: 'Brazil', date: new Date('11-11-2021'), sector: 'Cadeira Superior' },
                { id: 4, country: 'Brazil', date: new Date('11-11-2021'), sector: 'Pista' },
                { id: 5, country: 'Brazil', date: new Date('11-19-2021'), sector: 'Pista Premium' },
                { id: 6, country: 'Brazil', date: new Date('11-19-2021'), sector: 'Cadeira Inferior' },
            ]
        }
    }

    static async trade(userTicket, interestTicket) {

        const expected = ((Math.round(Math.random() * 100) % 2) === 0)
            ? 'HAS_TRADE'
            : 'CREATED_INTERESS'

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
