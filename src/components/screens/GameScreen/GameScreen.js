import {useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {useProgress} from "../../../contexts/ProgressContext";
import {BOARD_ROWS, BOARD_COLUMNS, WORDS_WITH_INFO} from "../../../constants/game";
import {useGame} from "../../../hooks/useGame";
import {GameContent} from "../../GameContent";
import {ClipPath} from "../../ClipPath";
import {Panel} from "../../Panel";
import {Text} from "../../Text";
import {Button} from "../../Button";
import styles from './GameScreen.module.scss'

const ANIMATION_DURATION = parseInt(styles.animationDuration)
const ANIMATION_NAME = styles.animationName

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
    const [hintShown, setHintShown] = useState(false)
    const [helpDisabled, setHelpDisabled] = useState(false)
    const helpRef = useRef()
    const {next, win} = useProgress()
    const game = useGame({
        initialBoardsState: BOARDS_INITIAL_STATE,
        wordsWithInfo: WORDS_WITH_INFO,
        boardRows: BOARD_ROWS,
        boardColumns: BOARD_COLUMNS,
        onWin: win,
        onComplete: next,
    })

    useEffect(() => {
        setHelpDisabled(true)
        const timerId = setTimeout(() => {
            setHintShown(true)
            setHelpDisabled(false)
        }, 2000)

        return () => {
            clearTimeout(timerId)
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <GameContent helpRef={helpRef} helpDisabled={helpDisabled} onComplete={next} {...game} />
            <CSSTransition
                in={hintShown}
                timeout={ANIMATION_DURATION}
                classNames={ANIMATION_NAME}
                mountOnEnter
                unmountOnExit
            >
                <div className={styles.hint}>
                    <ClipPath target={helpRef} offset={[6, 10]} borderRadius={12}>
                        {({ref, clipPath}) => <div ref={ref} style={{clipPath}} className={styles.backdrop}/>}
                    </ClipPath>
                    <Panel className={styles.panel} padding={[12, 16]}>
                        <Text>
                            Более <Text as="span" weight={500}>подробные правила</Text> сможешь изучить по&nbsp;этой кнопке.
                        </Text>
                        <Button className={styles.okButton} width={123} height={36} onClick={() => setHintShown(false)}>
                            <Text as="span" weight={500} color="#FFFFFF">Понятно</Text>
                        </Button>
                    </Panel>
                </div>
            </CSSTransition>
        </div>
    )
}