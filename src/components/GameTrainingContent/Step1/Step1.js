import {useEffect, useRef} from "react";
import cn from "classnames";
import styles from './Step1.module.scss'
import {Text} from "../../Text";
import {Panel} from "../../Panel";
import {Board} from "../../Board";
import {Button} from "../../Button";
import {Image} from "../../Image";
import ArrowRightShort from "../../../assets/images/arrowRightShort.svg";
import {BoardCell} from "../../BoardCell";
import {BoardChars} from "../../BoardChars";
import {CompleteWordButton} from "../../CompleteWordButton";
import {ClearCharButton} from "../../ClearCharButton";
import {CompleteBoardButton} from "../../CompleteBoardButton";
import {useCallbackRef} from "../../../hooks/useCallbackRef";
import {wait} from "../../../utils/wait";
import {isBoardCellSelected} from "../../../utils/isBoardCellSelected";

export function Step1(props) {
    const {className, step, onNextStep, ...game} = props
    const {chars, board, selectCell} = game
    const isLoopingRef = useRef(false)

    const selectCellRef = useCallbackRef(selectCell)

    function assertIsLooping() {
        if (!isLoopingRef.current) {
            throw new Error()
        }
    }

    async function processLoop() {
        try {
            await wait(800)
            assertIsLooping()
            selectCellRef([0, 1])
            await wait(1200)
            assertIsLooping()
            selectCellRef(null)
            await wait(400)
            assertIsLooping()
            await processLoop()
        } catch {}
    }

    useEffect(() => {
        if (step === 1) {
            isLoopingRef.current = true
            processLoop()

            return () => {
                isLoopingRef.current = false
            }
        }
    }, [step])

    return (
        <div className={cn(styles.wrapper, className)}>
            <Text size={44} weight={500}>навигация</Text>
            <div className={styles.panels}>
                <Panel className={styles.panel1} padding={[12, 16]} withBorder color="#FFF6DB">
                    <div className={styles.cells}>
                        <BoardCell className={styles.cell1} selected={isBoardCellSelected([0, 0], board)} />
                        <BoardCell className={styles.cell2} selected={isBoardCellSelected([0, 1], board)} />
                    </div>
                    <Text className={styles.panel1Text1}>
                        <Text as="span" weight={500}>Выделяй&nbsp;пустую клетку</Text>, в&nbsp;которую собираешься поставить букву. Далее <Text as="span" weight={500}>по&nbsp;порядку ставь нужные буквы из&nbsp;набора</Text>.
                    </Text>
                    <BoardChars className={styles.chars} chars={chars} />
                    <Text className={styles.panel1Text2}>
                        Ты можешь <Text as="span" weight={500}>обновлять</Text> его сколько хочешь, в&nbsp;любой момент игры.
                    </Text>
                </Panel>
                <Panel className={styles.panel2} padding={[12, 16]} withBorder color="#FFF6DB">
                    <div className={styles.item}>
                        <div className={styles.itemButtonWrapper}>
                            <CompleteWordButton className={styles.itemButton}/>
                        </div>
                        <Text align="left">
                            <Text as="span" weight={500} align="left">Отправляй</Text> по&nbsp;одному слову за&nbsp;раз.
                        </Text>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemButtonWrapper}>
                            <ClearCharButton className={styles.itemButton}/>
                        </div>
                        <Text align="left">
                            Если&nbsp;нужно, выбери ячейку и&nbsp;<Text as="span" weight={500} align="left">удали</Text> букву.
                        </Text>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemButtonWrapper}>
                            <CompleteBoardButton className={styles.itemButton}/>
                        </div>
                        <Text align="left">
                            <Text as="span" weight={500} align="left">Сдавай поле</Text>, если&nbsp;для новых слов нет&nbsp;места.
                        </Text>
                    </div>
                </Panel>
            </div>
            <Button className={styles.nextButton} width={123} height={36} onClick={onNextStep}>
                <Image className={styles.nextButtonIcon} src={ArrowRightShort}/>
            </Button>
        </div>
    )
}