import {useCallback, useMemo, useState} from "react";
import {produce} from "immer";
import {BREAKFAST_WORDS, CAREER_WORDS, MAX_BOARDS} from "../constants/game";
import {getLast} from "../utils/getLast";
import {createBoard} from "../utils/createBoard";
import {getChars} from "../utils/getChars";
import {createChars} from "../utils/createChars";
import {isSameBoardCell} from "../utils/isSameBoardCell";

export function useGame(initialBoardsState) {
    const [careerWords, setCareerWords] = useState([])
    const [breakfastWords, setBreakfastWords] = useState([])
    const [boards, setBoards] = useState([createBoard(initialBoardsState?.[0])])
    const [chars, setChars] = useState(createChars(getChars(...CAREER_WORDS, ...BREAKFAST_WORDS)))
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
            draft.current[index].cell = getLast(boards).selected
            draft.available = draft.available.filter(item => item !== char)
        }))
    }, [boards, chars])

    const completeBoard = useCallback(() => {
        if (boards.length >= MAX_BOARDS) {
            return
        }

        setBoards(produce(boards, (draft) => {
            getLast(draft).selected = null
            draft.push(createBoard(initialBoardsState?.[draft.length]))
        }))
    }, [boards, initialBoardsState])

    const completeWord = useCallback(() => {
        const word = ''
        const positions = [0, 0]

        if (CAREER_WORDS.includes(word)) {
            setCareerWords([...careerWords, word])
        } else if (BREAKFAST_WORDS.includes(word)) {
            setBreakfastWords([...breakfastWords, word])
        }

        produce(boards, (draft) => {
            const board = getLast(draft)
            board.selected = null
            positions.forEach(([x, y]) => {
                if (!board.confirmed[y]) {
                    board.confirmed[y] = {}
                }
                board.confirmed[y][x] = true
            })
        })
    }, [careerWords, breakfastWords, boards])

    const refreshChars = useCallback(() => {
        setChars(createChars(chars.available))
    }, [chars])

    const clearChar = useCallback(() => {
        const board = getLast(boards)

        if (!board.selected || !board.chars[board.selected[1]]?.[board.selected[0]]) {
            return
        }

        setChars(produce(chars, (draft) => {
            const board = getLast(boards)
            const [x, y] = board.selected
            draft.available.push(board.chars[y][x])
            const currentKey = Object.keys(draft.current).find(key => isSameBoardCell(draft.current[key].cell, board.selected))
            if (currentKey) {
                draft.current[currentKey].cell = null
            }
        }))
        setBoards(produce(boards, (draft) => {
            const board = getLast(draft)
            const [x, y] = board.selected
            board.chars[y][x] = null
        }))
    }, [boards, chars])

    return {
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
    }
}