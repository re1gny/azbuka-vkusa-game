import {shuffleArray} from "./shuffleArray";
import {getChars} from "./getChars";
import {MAX_CHARS} from "../constants/game";

export function createChars(allChars, allCareerWords, allBreakfastWords, usedCareerWords, usedBreakfastWords) {
    let chars
    let words

    if (allChars) {
        chars = allChars
        words = []
    } else {
        const freeCareerWords = allCareerWords.filter(word => !usedCareerWords.includes(word))
        const freeBreakfastWords = allBreakfastWords.filter(word => !usedBreakfastWords.includes(word))

        const freeShuffledWords = shuffleArray([...freeCareerWords, ...freeBreakfastWords])
        const usedShuffledWords = shuffleArray([...usedCareerWords, ...usedBreakfastWords])

        chars = shuffleArray(getChars(...freeShuffledWords, ...usedShuffledWords).slice(0, MAX_CHARS))

        if (freeShuffledWords[0] && freeShuffledWords[1] && freeShuffledWords[0].length + freeShuffledWords[1].length <= MAX_CHARS) {
            words = [freeShuffledWords[0], freeShuffledWords[1]]
        } else if (freeShuffledWords[0]) {
            words = [freeShuffledWords[0]]
        } else {
            words = []
        }
    }

    const entries = chars.map((char) => ({char, cell: null}))

    return {entries, words}
}