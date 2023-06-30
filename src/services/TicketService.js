import FakeHTTPClient from "../http/FakeHTTPClient";
import FakeImageHttpClient from "../http/FakeImageHttpClient";

export default class TicketService {

    client = FakeHTTPClient
    imageClient = FakeImageHttpClient

    async loadTicketsForHomepage() {
        return await this.client.homepage()
    }

    async buildDashboardForUser(email) {

        const {
            tickets: ticketsWithoutImage,
            latest: latestWithoutImage,
            selecteds: selectedsWithoutImage
        } = await this.client.dashboard(email)


        return {
            tickets: this.addImageToTickets(ticketsWithoutImage),
            latest: this.addImageToTickets(latestWithoutImage),
            selecteds: this.addImageToTickets(selectedsWithoutImage)
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


}
