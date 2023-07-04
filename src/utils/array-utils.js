export const shuffle = (unshuffled) => unshuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(it => it.value)

export const unique = ({ values, limit, constraint }) => {

    const response = []
    const filter = new Set([])

    const finalLimit = limit ?? values.length

    for (const value of values) {
        const key = constraint(value)

        if (filter.size < finalLimit && !filter.has(key)) {
            response.push(value)
            filter.add(key)
        }
    }

    return response
}
