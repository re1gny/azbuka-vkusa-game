import {useCallback, useMemo, useRef, useState} from "react";
import {produce} from "immer";
import {
    BREAKFAST_WORDS,
    CAREER_WORDS,
    MAX_BOARDS,
    REQUIRED_BREAKFAST_WORDS,
    REQUIRED_CAREER_WORDS,
    SUCCESS_TEXTS
} from "../constants/game";
import {getLast} from "../utils/getLast";
import {createBoard} from "../utils/createBoard";
import {getChars} from "../utils/getChars";
import {createChars} from "../utils/createChars";
import {isSameBoardCell} from "../utils/isSameBoardCell";
import {parseBoard} from "../utils/parseBoard";
import {shuffleArray} from "../utils/shuffleArray";

export function useGame(initialBoardsState, wordsWithInfo, onWin, onComplete) {
    const [unknownWordErrorShown, setUnknownWordErrorShown] = useState(false)
    const [unknownWordErrorParam, setUnknownWordErrorParam] = useState(null)
    const [repeatedWordErrorShown, setRepeatedWordErrorShown] = useState(false)
    const [repeatedWordErrorParam, setRepeatedWordErrorParam] = useState(null)
    const [multipleWordsErrorShown, setMultipleWordsErrorShow] = useState(false)
    const [multipleWordsErrorParam, setMultipleWordsErrorParam] = useState(null)
    const [wordInfoShown, setWordInfoShown] = useState(false)
    const [wordInfoParam, setWordInfoParam] = useState(null)
    const [winConfirmShown, setWinConfirmShown] = useState(false)
    const [successTextShown, setSuccessTextShown] = useState(false)
    const [successText, setSuccessText] = useState(null)
    const successTextTimerRef = useRef()
    const [boards, setBoards] = useState([createBoard(initialBoardsState?.[0])])
    const [careerWords, setCareerWords] = useState(() => {
        const {entries} = parseBoard(getLast(boards))
        const words = entries.map(({word}) => word)
        return words.filter(word => CAREER_WORDS.includes(word))
    })
    const [breakfastWords, setBreakfastWords] = useState(() => {
        const {entries} = parseBoard(getLast(boards))
        const words = entries.map(({word}) => word)
        return words.filter(word => BREAKFAST_WORDS.includes(word))
    })
    const [chars, setChars] = useState(() => {
        return createChars(shuffleArray(getChars(
            ...CAREER_WORDS.filter(word => !careerWords.includes(word)),
            ...BREAKFAST_WORDS.filter(word => !breakfastWords.includes(word)),
        )))
    })
    const board = useMemo(() => getLast(boards), [boards])

    const selectCell = useCallback((position) => {
        setBoards(produce(boards, (draft) => {
            const board = getLast(draft)
            board.selected = isSameBoardCell(board.selected, position) ? null : position
        }))
    }, [boards])

    const selectChar = useCallback((char, index) => {
        const board = getLast(boards)

        if (!board.selected || board.chars[board.selected[1]]?.[board.selected[0]]) {
            return
        }

        setBoards(produce(boards, (draft) => {
            const board = getLast(draft)
            const [x, y] = board.selected
            board.chars[y][x] = char
        }))
        setChars(produce(chars, (draft) => {
            draft[index].cell = getLast(boards).selected
        }))
    }, [boards, chars])

    const completeBoard = useCallback(() => {
        if (boards.length >= MAX_BOARDS) {
            onComplete?.()
            return
        }

        setBoards(produce(boards, (draft) => {
            getLast(draft).selected = null
            draft.push(createBoard(initialBoardsState?.[draft.length]))
        }))
    }, [boards, initialBoardsState, onComplete])

    const showUnknownWordError = useCallback((word) => {
        setUnknownWordErrorShown(true)
        setUnknownWordErrorParam(word)
    }, [])

    const closeUnknownWordError = useCallback(() => {
        setUnknownWordErrorShown(false)
    }, [])

    const showRepeatedWordError = useCallback((word) => {
        setRepeatedWordErrorShown(true)
        setRepeatedWordErrorParam(word)
    }, [])

    const closeRepeatedWordError = useCallback(() => {
        setRepeatedWordErrorShown(false)
    }, [])

    const showMultipleWordsError = useCallback((words) => {
        setMultipleWordsErrorShow(true)
        setMultipleWordsErrorParam(words)
    }, [])

    const closeMultipleWordsError = useCallback(() => {
        setMultipleWordsErrorShow(false)
    }, [])

    const showWordInfo = useCallback((word) => {
        setWordInfoShown(true)
        setWordInfoParam(word)
    }, [])

    const closeWordInfo = useCallback(() => {
        setWordInfoShown(false)
    }, [])

    const showWinConfirm = useCallback(() => {
        setWinConfirmShown(true)
    }, [])

    const closeWinConfirm = useCallback(() => {
        setWinConfirmShown(false)
    }, [])

    const showSuccessText = useCallback(() => {
        function showText() {
            const randomSuccessTexts = shuffleArray(SUCCESS_TEXTS)
            setSuccessText(randomSuccessTexts[0] === successText ? randomSuccessTexts[1] : randomSuccessTexts[0])
            setSuccessTextShown(true)
            successTextTimerRef.current = setTimeout(() => {
                setSuccessTextShown(false)
                successTextTimerRef.current = undefined
            }, 3000)
        }

        if (successTextTimerRef.current) {
            clearTimeout(successTextTimerRef.current)
            successTextTimerRef.current = undefined
            setSuccessTextShown(false)
            setTimeout(showText, 0)
        } else {
            showText()
        }
    }, [successText])

    const refreshChars = useCallback(() => {
        setChars(shuffleArray(chars).map(({char}) => ({char, cell: null})))
    }, [chars])

    const completeWord = useCallback(() => {
        const {newEntries} = parseBoard(getLast(boards))

        if (newEntries.length === 0) {
            return
        }

        if (newEntries.length > 1) {
            showMultipleWordsError(newEntries.map(({word}) => word))
            return
        }

        const {word, positions} = newEntries[0]
        const newCareerWords = [...careerWords, word]
        const newBreakfastWords = [...breakfastWords, word]

        if (CAREER_WORDS.includes(word)) {
            if (careerWords.includes(word)) {
                showRepeatedWordError(word)
                return
            } else {
                setCareerWords(newCareerWords)
            }
        } else if (BREAKFAST_WORDS.includes(word)) {
            if (breakfastWords.includes(word)) {
                showRepeatedWordError(word)
                return
            } else {
                setBreakfastWords(newBreakfastWords)
            }
        } else {
            showUnknownWordError(word)
            return
        }

        setBoards(produce(boards, (draft) => {
            const board = getLast(draft)
            board.selected = null
            positions.forEach(([x, y]) => {
                if (!board.confirmed[y]) {
                    board.confirmed[y] = {}
                }
                board.confirmed[y][x] = true
            })
        }))
        refreshChars()

        if (wordsWithInfo.includes(word)) {
            showWordInfo(word)
        }

        if (newCareerWords.length >= REQUIRED_CAREER_WORDS && newBreakfastWords.length >= REQUIRED_BREAKFAST_WORDS) {
            onWin?.()
            showWinConfirm()
        }

        showSuccessText()
    }, [
        wordsWithInfo,
        careerWords,
        breakfastWords,
        boards,
        chars,
        showSuccessText,
        showMultipleWordsError,
        showUnknownWordError,
        showRepeatedWordError,
        showWordInfo,
        showWinConfirm,
        refreshChars,
    ])

    const clearChar = useCallback(() => {
        const board = getLast(boards)

        if (!board.selected || !board.chars[board.selected[1]]?.[board.selected[0]]) {
            return
        }

        setChars(produce(chars, (draft) => {
            const char = draft.find(({cell}) => isSameBoardCell(cell, getLast(boards).selected))
            if (char) {
                char.cell = null
            }
        }))
        setBoards(produce(boards, (draft) => {
            const board = getLast(draft)
            const [x, y] = board.selected
            board.chars[y][x] = null
        }))
    }, [boards, chars])

    const processedParams = useMemo(() => {
        if (wordInfoShown) {
            return {
                wordInfoShown: true,
                winConfirmShown: false,
            }
        }

        return {
            wordInfoShown,
            winConfirmShown,
        }
    }, [wordInfoShown, winConfirmShown])

    return {
        successText,
        successTextShown,
        showSuccessText,
        wordInfoShown,
        wordInfoParam,
        showWordInfo,
        closeWordInfo,
        winConfirmShown,
        showWinConfirm,
        closeWinConfirm,
        unknownWordErrorShown,
        unknownWordErrorParam,
        showUnknownWordError,
        closeUnknownWordError,
        repeatedWordErrorShown,
        repeatedWordErrorParam,
        showRepeatedWordError,
        closeRepeatedWordError,
        multipleWordsErrorShown,
        multipleWordsErrorParam,
        showMultipleWordsError,
        closeMultipleWordsError,
        careerWords,
        breakfastWords,
        boards,
        board,
        chars,
        selectCell,
        selectChar,
        completeBoard,
        completeWord,
        refreshChars,
        clearChar,
        ...processedParams,
    }
}