import {shuffleArray} from "./shuffleArray";
import {getChars} from "./getChars";
import {MAX_CHARS} from "../constants/game";

export function createChars(allChars, allCareerWords, allBreakfastWords, usedCareerWords, usedBreakfastWords) {
    let chars

    if (allChars) {
        chars = allChars
    } else {
        const freeCareerWords = allCareerWords.filter(word => !usedCareerWords.includes(word))
        const freeBreakfastWords = allBreakfastWords.filter(word => !usedBreakfastWords.includes(word))

        const freeShuffledWords = shuffleArray([...freeCareerWords, ...freeBreakfastWords])
        const usedShuffledWords = shuffleArray([...usedCareerWords, ...usedBreakfastWords])

        chars = shuffleArray(getChars(...freeShuffledWords, ...usedShuffledWords).slice(0, MAX_CHARS))
    }

    return chars.map((char) => ({char, cell: null}))
}