import {shuffleArray} from "./shuffleArray";
import {MAX_CHARS} from "../constants/game";

export function createChars(initialChars) {
    const available = shuffleArray(initialChars)
    const current = available.slice(0, MAX_CHARS).reduce((acc, char, index) => ({...acc, [index]: {char, cell: null}}), {})

    return {available, current}
}