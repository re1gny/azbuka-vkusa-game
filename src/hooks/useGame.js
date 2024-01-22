import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {produce} from "immer";
import {
    BOARD_COLUMNS,
    BOARD_ROWS,
    BREAKFAST_WORDS,
    CAREER_WORDS,
    MAX_BOARDS,
    REQUIRED_BREAKFAST_WORDS,
    REQUIRED_CAREER_WORDS,
    SUCCESS_TEXTS,
    MAX_CAREER_WORDS,
    MAX_BREAKFAST_WORDS,
    WORDS_WITH_INFO,
    MAX_HINTS,
    INACTIVE_HINT_TIMEOUT,
} from "../constants/game";
import {getLast} from "../utils/getLast";
import {createBoard} from "../utils/createBoard";
import {createChars} from "../utils/createChars";
import {isSameBoardCell} from "../utils/isSameBoardCell";
import {parseBoard} from "../utils/parseBoard";
import {shuffleArray} from "../utils/shuffleArray";
import {getPrimaryHintedChars} from "../utils/getPrimaryHintedChars";
import {getSecondaryHintedChars} from "../utils/getSecondaryHintedChars";

export function useGame(params) {
    const {
        initialBoardsState = [],
        wordsWithInfo = WORDS_WITH_INFO,
        boardRows = BOARD_ROWS,
        boardColumns = BOARD_COLUMNS,
        careerWords: allCareerWords = CAREER_WORDS,
        breakfastWords: allBreakfastWords = BREAKFAST_WORDS,
        withSuccessText = true,
        withSecondaryHint = true,
        chars: allChars,
        onWin,
        onComplete,
    } = params || {}
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
    const [isCompleting, setIsCompleting] = useState(false)
    const successTextTimerRef = useRef()
    const winConfirmWasShownRef = useRef(false)
    const [boards, setBoards] = useState(() => [createBoard(initialBoardsState?.[0], boardRows, boardColumns)])
    const [careerWords, setCareerWords] = useState(() => {
        const {entries} = parseBoard(getLast(boards))
        const words = entries.map(({word}) => word)
        return words.filter(word => allCareerWords.includes(word))
    })
    const [breakfastWords, setBreakfastWords] = useState(() => {
        const {entries} = parseBoard(getLast(boards))
        const words = entries.map(({word}) => word)
        return words.filter(word => allBreakfastWords.includes(word))
    })
    const [chars, setChars] = useState(() => createChars(allChars, allCareerWords, allBreakfastWords, careerWords, breakfastWords))
    const [hintsAmount, setHintsAmount] = useState(MAX_HINTS)
    const [primaryHintedChars, setPrimaryHintedChars] = useState(null)
    const [secondaryHintedChars, setSecondaryHintedChars] = useState(null)
    const secondaryHintCharsTimerRef = useRef()
    const board = useMemo(() => getLast(boards), [boards])

    const reset = useCallback(() => {
        const boards = [createBoard(initialBoardsState?.[0], boardRows, boardColumns)]

        setUnknownWordErrorShown(false)
        setUnknownWordErrorParam(null)
        setRepeatedWordErrorShown(false)
        setRepeatedWordErrorParam(null)
        setMultipleWordsErrorShow(false)
        setMultipleWordsErrorParam(null)
        setWordInfoShown(false)
        setWordInfoParam(null)
        setWinConfirmShown(false)
        setSuccessTextShown(false)
        setSuccessText(null)
        setBoards(boards)
        setCareerWords(() => {
            const {entries} = parseBoard(getLast(boards))
            const words = entries.map(({word}) => word)
            return words.filter(word => allCareerWords.includes(word))
        })
        setBreakfastWords(() => {
            const {entries} = parseBoard(getLast(boards))
            const words = entries.map(({word}) => word)
            return words.filter(word => allBreakfastWords.includes(word))
        })
        setChars(createChars(allChars, allCareerWords, allBreakfastWords, careerWords, breakfastWords))
        setHintsAmount(MAX_HINTS)
    }, [allChars, initialBoardsState, boardRows, boardColumns, allCareerWords, allBreakfastWords, careerWords, breakfastWords])

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
            if (draft.entries[index]) {
                draft.entries[index].cell = getLast(boards).selected
            }
        }))
    }, [boards, chars])

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
        if (!withSuccessText) {
            return
        }

        function showText() {
            const randomSuccessTexts = shuffleArray(SUCCESS_TEXTS)
            setSuccessText(successText && randomSuccessTexts[0].id === successText.id ? randomSuccessTexts[1] : randomSuccessTexts[0])
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
    }, [successText, withSuccessText])

    const refreshChars = useCallback(() => {
        setChars(createChars(allChars, allCareerWords, allBreakfastWords, careerWords, breakfastWords))
        setPrimaryHintedChars(null)
    }, [allCareerWords, allBreakfastWords, careerWords, breakfastWords, allChars])

    const completeBoard = useCallback(() => {
        if (boards.length >= MAX_BOARDS) {
            onComplete?.()
            return
        }

        setBoards(produce(boards, (draft) => {
            getLast(draft).selected = null
            draft.push(createBoard(initialBoardsState?.[draft.length], boardRows, boardColumns))
        }))
    }, [boards, initialBoardsState, boardRows, boardColumns, onComplete, refreshChars])

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
        const newCareerWords = [...careerWords]
        const newBreakfastWords = [...breakfastWords]

        if (allCareerWords.includes(word)) {
            if (careerWords.includes(word)) {
                showRepeatedWordError(word)
                return
            } else {
                newCareerWords.push(word)
                setCareerWords(newCareerWords)
            }
        } else if (allBreakfastWords.includes(word)) {
            if (breakfastWords.includes(word)) {
                showRepeatedWordError(word)
                return
            } else {
                newBreakfastWords.push(word)
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

        const newChars = produce(chars, (draft) => {
            draft.words = draft.words.filter(item => item !== word)
        })

        setChars(newChars)

        if (wordsWithInfo.includes(word)) {
            showWordInfo(word)
        }

        if (newCareerWords.length >= REQUIRED_CAREER_WORDS && newBreakfastWords.length >= REQUIRED_BREAKFAST_WORDS && !winConfirmWasShownRef.current) {
            onWin?.()
            showWinConfirm()
            winConfirmWasShownRef.current = true
        }

        if (newCareerWords.length === MAX_CAREER_WORDS && newBreakfastWords.length === MAX_BREAKFAST_WORDS) {
            setIsCompleting(true)
        }

        showSuccessText()
        setPrimaryHintedChars(null)

        if (!newChars.words.length) {
            refreshChars()
        }
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
        allCareerWords,
        allBreakfastWords,
    ])

    const clearChar = useCallback(() => {
        const board = getLast(boards)

        if (!board.selected || !board.chars[board.selected[1]]?.[board.selected[0]]) {
            return
        }

        setChars(produce(chars, (draft) => {
            const char = draft.entries.find(({cell}) => isSameBoardCell(cell, getLast(boards).selected))
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

    const primaryHintChars = useCallback(() => {
        if (hintsAmount <= 0 || primaryHintedChars || !chars.words.length) {
            return
        }

        setPrimaryHintedChars(getPrimaryHintedChars(chars, board))
        setHintsAmount(prev => prev - 1)
    }, [hintsAmount, chars, board, primaryHintedChars])

    const runSecondaryHintChars = useCallback(() => {
        secondaryHintCharsTimerRef.current = setTimeout(() => {
            if (!chars.words.length) {
                return
            }

            setSecondaryHintedChars(getSecondaryHintedChars(chars, board))

            secondaryHintCharsTimerRef.current = setTimeout(() => {
                setSecondaryHintedChars(null)
                runSecondaryHintChars()
            }, 3000)
        }, INACTIVE_HINT_TIMEOUT)
    }, [chars, board])

    const clearSecondaryHintChars = useCallback(() => {
        clearTimeout(secondaryHintCharsTimerRef.current)
        setSecondaryHintedChars(null)
    }, [])

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

    useEffect(() => {
        if (isCompleting && !wordInfoShown) {
            onComplete?.()
        }
    }, [isCompleting, wordInfoShown]);

    useEffect(() => {
        if (withSecondaryHint) {
            runSecondaryHintChars()

            return clearSecondaryHintChars
        }
    }, [withSecondaryHint, chars, board.confirmed]);

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
        primaryHintedChars,
        secondaryHintedChars,
        hintsAmount,
        primaryHintChars,
        selectCell,
        selectChar,
        completeBoard,
        completeWord,
        refreshChars,
        clearChar,
        reset,
        ...processedParams,
    }
}