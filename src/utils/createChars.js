export function createChars(initialChars) {
    return initialChars.map((char) => ({char, cell: null}))
}