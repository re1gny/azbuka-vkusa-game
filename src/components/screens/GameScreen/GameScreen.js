import Logo from "../../../assets/images/logo.png";
import {Image} from "../../Image";
import {Text} from "../../Text";
import {Button} from "../../Button";
import {Board} from "../../Board";
import {useProgress} from "../../../contexts/ProgressContext";
import {BoardChars} from "../../BoardChars";
import {BoardProgress} from "../../BoardProgress";
import {
    MAX_BREAKFAST_WORDS,
    MAX_CAREER_WORDS,
    REQUIRED_BREAKFAST_WORDS,
    REQUIRED_CAREER_WORDS, SUCCESS_TEXTS
} from "../../../constants/game";
import {CompleteBoardButton} from "../../CompleteBoardButton";
import {CompleteWordButton} from "../../CompleteWordButton";
import {ClearCharButton} from "../../ClearCharButton";
import {useGame} from "../../../hooks/useGame";
import styles from './GameScreen.module.scss'

const BOARDS_INITIAL_STATE = [
    [
        ['р', 'а', 'б', 'о', 'т', 'а', null],
        [null, null, null, null, null, null, null],
        ['с', 'о', 'к', null, null, 'р', null],
        [null, null, null, null, null, 'а', null],
        [null, null, null, null, null, 'б', null],
        [null, null, null, null, 'с', 'о', 'к'],
        [null, null, null, null, null, 'т', null],
        [null, null, null, null, null, 'а', null],
    ],
    null,
    null,
    null,
    null,
]

export function GameScreen() {
    const {next, win} = useProgress()
    const {
        boards,
        board,
        chars,
        selectCell,
        selectChar,
        refreshChars,
        careerWords,
        breakfastWords,
        clearChar,
        completeBoard,
        completeWord,
    } = useGame(BOARDS_INITIAL_STATE)

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Image className={styles.logo} src={Logo} />
                <Text className={styles.boardNumber} size={16} weight={400} wrap="nowrap">
                    Поле №{boards.length}
                </Text>
                <Button className={styles.helpButton} width={31.5} height={31.5}>
                    <Text size={20} weight={400}>?</Text>
                </Button>
            </div>
            <div className={styles.progresses}>
                <BoardProgress
                    className={styles.progress}
                    name="карьера"
                    max={MAX_CAREER_WORDS}
                    required={REQUIRED_CAREER_WORDS}
                    current={careerWords.length}
                />
                <BoardProgress
                    className={styles.progress}
                    name="завтрак"
                    max={MAX_BREAKFAST_WORDS}
                    required={REQUIRED_BREAKFAST_WORDS}
                    current={breakfastWords.length}
                />
            </div>
            <div className={styles.successTextWrapper}>
                <Text className={styles.successText} size={20} weight={500} wrap="nowrap">
                    {SUCCESS_TEXTS[0]}
                </Text>
            </div>
            <Board className={styles.board} board={board} onSelectedChange={selectCell} />
            <BoardChars className={styles.chars} chars={chars} onSelect={selectChar} onRefresh={refreshChars} />
            <div className={styles.actions}>
                <CompleteBoardButton className={styles.action} onClick={completeBoard} />
                <CompleteWordButton className={styles.action} onClick={completeWord} />
                <ClearCharButton className={styles.action} onClick={clearChar} />
            </div>
        </div>
    )
}