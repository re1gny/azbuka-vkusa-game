import {shuffleArray} from "./shuffleArray";
import {isBoardCellConfirmed} from "./isBoardCellConfirmed";

export function getPrimaryHintedChars(prevHintedChars, chars, board) {
    const {words, entries} = chars

    const hintedChars = []
    const shuffledWords = shuffleArray(words)
    const hintedWord = shuffledWords.length > 1 ?
        prevHintedChars?.word && prevHintedChars.word === shuffledWords[0]
            ? shuffledWords[1]
            : shuffledWords[0]
        : shuffledWords[0]

    hintedWord?.split('')?.forEach(char => {
        const index = entries.findIndex((entry, index) => entry.char === char && !hintedChars.includes(index) && (!entry.cell || !isBoardCellConfirmed(entry.cell, board)))

        if (~index) {
            hintedChars.push(index)
        }
    })

    return {entries: hintedChars, word: hintedWord}
}