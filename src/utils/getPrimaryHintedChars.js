import {shuffleArray} from "./shuffleArray";
import {isBoardCellConfirmed} from "./isBoardCellConfirmed";

function getPrimaryHintedWordChars(word, entries, board) {
    const hintedChars = []

    word?.split('')?.forEach(char => {
        const index = entries.findIndex((entry, index) => entry.char === char && !hintedChars.includes(index) && (!entry.cell || !isBoardCellConfirmed(entry.cell, board)))

        if (~index) {
            hintedChars.push(index)
        }
    })

    return {entries: hintedChars, word}
}

export function getPrimaryHintedChars(prevHintedChars, chars, board) {
    const {words, entries} = chars

    const hintedCharsArray = shuffleArray(words)
        .map(word => getPrimaryHintedWordChars(word, entries, board))
        .filter(hintedChars => hintedChars.word?.length === hintedChars.entries?.length)

    return hintedCharsArray.length > 1 ?
        prevHintedChars?.word && prevHintedChars.word === hintedCharsArray[0].word
            ? hintedCharsArray[1]
            : hintedCharsArray[0]
        : hintedCharsArray.length === 1
            ? hintedCharsArray[0]
            : null
}