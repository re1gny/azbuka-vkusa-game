export function getChars(...words) {
    let chars = []

    words.forEach(word => {
        chars = [...chars, ...word.split('')]
    })

    return chars
}