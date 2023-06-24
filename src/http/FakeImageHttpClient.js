export default class FakeImageHttpClient {

    static images = [
        { kind: 'basketball', ticket: 'basket_ticket.webp', banner: 'basket_banner.jpg' },
        { kind: 'cinema', ticket: 'cinema_ticket.jpg', banner: 'cinema_banner.jpg' },
        { kind: 'football', ticket: 'football_ticket.jpg', banner: 'football_banner.jpg' },
        { kind: 'show', ticket: 'show_ticket.webp', banner: 'music_banner.jpg' },
        { kind: 'teather', ticket: 'teather_ticket.webp', banner: 'teather_banner.jpg' },
        { kind: 'basketball', ticket: 'basket_ticket.webp', banner: 'basket_banner.jpg' },
        { kind: 'other', ticket: 'other_ticket.jpg', banner: 'other_banner.jpg' },
    ]


    static get randomImage() {
        const index = Math.floor(Math.random() * FakeImageHttpClient.images.length)

        return FakeImageHttpClient.images.at(index)
    }

    static findByKind(kind) {
        return FakeImageHttpClient.images.filter(it => it.kind === kind).at(0) ?? FakeImageHttpClient.images.at(-1)
    }


}
