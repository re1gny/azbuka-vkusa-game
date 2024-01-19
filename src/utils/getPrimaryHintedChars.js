import {shuffleArray} from "./shuffleArray";

export function getPrimaryHintedChars(chars, board) {
    const {words, entries} = chars

    const hintedChars = []
    const word = shuffleArray(words)[0]

    word.split('').forEach(char => {
        const index = entries.findIndex((entry, index) => entry.char === char && !hintedChars.includes(index))

        if (~index && (!entries[index].cell || !board.confirmed[entries[index].cell[1]][entries[index].cell[0]])) {
            hintedChars.push(index)
        }
    })

    return hintedChars
}