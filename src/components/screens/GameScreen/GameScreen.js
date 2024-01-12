import {useProgress} from "../../../contexts/ProgressContext";
import {BOARD_ROWS, BOARD_COLUMNS, WORDS_WITH_INFO} from "../../../constants/game";
import {useGame} from "../../../hooks/useGame";
import {GameContent} from "../../GameContent";

const BOARDS_INITIAL_STATE = [
    [
        [null, null, null, null, null, null, null],
        [null, null, 'р', null, null, null, null],
        [null, null, 'а', null, null, null, null],
        [null, null, 'б', null, null, null, null],
        [null, null, 'о', null, null, null, null],
        [null, null, 'т', null, null, null, null],
        [null, null, 'а', null, null, null, null],
    ],
]

export function GameScreen() {
    const {next, win} = useProgress()
    const game = useGame({
        initialBoardsState: BOARDS_INITIAL_STATE,
        wordsWithInfo: WORDS_WITH_INFO,
        boardRows: BOARD_ROWS,
        boardColumns: BOARD_COLUMNS,
        onWin: win,
        onComplete: next,
    })

    return <GameContent onComplete={next} {...game} />
}