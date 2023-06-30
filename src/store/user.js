import { reactive } from "vue";

const initialState = {
    current: {

    },
    tickets: []
}

let state = reactive(initialState)

export function addTicket(ticket) {
    state.tickets.push(ticket)
}

export function reset(user) {
    state = reactive({
        ...initialState,
        user
    })
}

export function setCurrentUser(user) {
    state.current = user
}

export function setTickets(tickets) {
    state.tickets = tickets
}

export function getTickets() {
    return state.tickets
}

export default state
