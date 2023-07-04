import { shuffle, unique } from "../utils/array-utils"
import FakeDescriptionGenerator from "./FakeDescriptionGenerator"
import FakeImageHttpClient from "./FakeImageHttpClient"

export default class HttpClient {

    static BASE_URI = "http://localhost:3000"

    imageClient = FakeImageHttpClient
    descriptionClient = FakeDescriptionGenerator

    constructor() { }

    static async get(endpoint, query = {}) {
        const params = new URLSearchParams({ ...query })

        const response = await fetch(`${HttpClient.BASE_URI}${endpoint}?${params}`)

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

    static async register(email, ticket) {

        const data = {
            ...ticket,
            datetime: ticket.datetime.toISOString(),
            user_email: email
        }

        try {
            const response = await HttpClient.post('/tickets/', data)
            return response
        }
        catch (error) {
            console.log(error)
        }
    }


    static async homepage() {
        const allTickets = await HttpClient.get('/tickets/list/')

        const tickets = unique({
            values: shuffle(allTickets),
            limit: 8,
            constraint: ticket => ticket.event
        })

        return tickets
    }

    static async search(query) {
        return await HttpClient.get('/tickets-search/', query)
    }

    static async findRelatedByTicket(ticket) {
        const related = await HttpClient.search({ type: ticket.type })

        return {
            name: ticket.name,
            related
        }
    }

    static async dashboard(email) {
        const self = this

        const tickets = await HttpClient.get('/user-tickets/', { email })

        const [
            allLatestTickets,
            ...allSelectedsForUser
        ] = await Promise.allSettled([
            HttpClient.get('/tickets/list/'),
            ...tickets.map(ticket => self.findRelatedByTicket(ticket))
        ])

        const latest = shuffle(unique({
            values: allLatestTickets.value,
            constraint: ticket => ticket.event
        }))

        const selecteds = allSelectedsForUser
            .filter(promise => promise.status === 'fulfilled')
            .map(promise => promise.value)
            .map(response => ({
                name: response.name,
                items: shuffle(response.related).slice(0, 3)
            }))


        tickets.forEach(ticket => ticket['user_email'] = email)

        return {
            tickets,
            latest,
            selecteds
        }
    }

    static async event(name) {
        const tickets = await HttpClient.get('/tickets-search/', {
            event: name
        })

        const description = FakeDescriptionGenerator.generateForKind(tickets.at(0).type)

        return {
            name,
            description,
            tickets
        }
    }

    static async trade(userTicket, interestTicket) {
        const data = {
            "own_user_email": userTicket.user_email,
            "own_ticket_id": userTicket.uid,
            "wished_ticket_id": interestTicket.uid,
            "wished_ticket_user_email": interestTicket.user_email
        }

        await HttpClient.post('/tickets-exchange/', data)

        return {
            status: 'TRADED',
            oldTicket: { ...userTicket },
            newTicket: { ...interestTicket }
        }
    }
}
