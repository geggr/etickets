import FakeHTTPClient from "../http/FakeHTTPClient";
import FakeImageHttpClient from "../http/FakeImageHttpClient";
import HttpClient from "../http/HttpClient";

export default class TicketService {

    client = HttpClient
    otherClient = HttpClient
    imageClient = FakeImageHttpClient

    async loadTicketsForHomepage() {
        const self = this
        const tickets = await this.client.homepage()

        return tickets.map(ticket => ({
            ...ticket,
            date: new Date(ticket.datetime),
            image: self.imageClient.findByKind(ticket.type)
        }))
    }

    async registerTicket(email, ticket) {
        return await this.client.register(email, ticket)
    }

    async buildDashboardForUser(email) {
        const self = this

        const {
            tickets: ticketsWithoutImage,
            latest: latestWithoutImage,
            selecteds: selectedsWithoutImage,
        } = await this.client.dashboard(email)

        this.mergeImage(ticketsWithoutImage)
        this.mergeImage(latestWithoutImage)
        selectedsWithoutImage.forEach(kind => self.mergeImage(kind.items))

        return {
            tickets: ticketsWithoutImage,
            latest: latestWithoutImage,
            selecteds: selectedsWithoutImage
        }

    }

    async loadEvent(id) {
        return await this.client.event(id)
    }

    async trade(userTicket, interestTicket) {
        return await this.client.trade(userTicket, interestTicket)
    }


    addImageToTickets(tickets) {
        const self = this
        return tickets.map(ticket => ({
            ...ticket,
            image: self.imageClient.randomImage
        }))
    }

    mergeImage(tickets) {
        if (!Array.isArray(tickets)) return

        const self = this

        tickets.forEach(it => it['image'] = self.imageClient.findByKind(it.type))
    }


}
