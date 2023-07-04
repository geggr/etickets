import { reactive } from "vue";

const initialState = {
    current: {},
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

export function getCurrentUser() {
    return state.current
}

export function getCurrentUserEmail() {
    return state.current.email ?? ''
}

export function changeTickets(oldTicket, newTicket) {

    console.log("========== trocando ==================================")

    const index = state.tickets.findIndex(ticket => ticket.uid === oldTicket.uid)

    console.log(index)

    state.tickets.splice(index, 1)

    state.tickets.push(newTicket)

    console.log("========== trocando ==================================")
}

export default state
