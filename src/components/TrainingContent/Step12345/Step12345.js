import {useEffect, useMemo, useRef} from "react";
import cn from "classnames";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import ArrowRightShort from "../../../assets/images/arrowRightShort.svg";
import {MAX_HINTS} from "../../../constants/game";
import {Image} from "../../Image";
import {Button} from "../../Button";
import {Text} from "../../Text";
import {Panel} from "../../Panel";
import {wait} from "../../../utils/wait";
import {useCallbackRef} from "../../../hooks/useCallbackRef";
import {ClipPath} from "../../ClipPath";
import {GameContent} from "../../GameContent";
import styles from './Step12345.module.scss'

const ANIMATION_DURATION = parseInt(styles.animationDuration)
const ANIMATION_NAME = styles.animationName

export function Step12345(props) {
    const {className, step, onNextStep, ...game} = props
    const {selectCell, selectChar, completeWord, reset} = game
    const isLoopingRef = useRef(false)
    const boardRef = useRef()
    const charsRef = useRef()
    const hintsRef = useRef()
    const actionsGroup1Ref = useRef()
    const actionsGroup2Ref = useRef()

    const selectCellRef = useCallbackRef(selectCell)
    const selectCharRef = useCallbackRef(selectChar)
    const completeWordRef = useCallbackRef(completeWord)
    const resetRef = useCallbackRef(reset)

    const [target, offset] = useMemo(() => {
        if (step === 1) {
            return [boardRef, [8.4, 15.4]]
        }
        if (step === 2) {
            return [charsRef, [8, 8]]
        }
        if (step === 3) {
            return [hintsRef, [7, 12]]
        }
        if (step === 4) {
            return [actionsGroup2Ref, [7, 8.5]]
        }
        if (step === 5) {
            return [actionsGroup1Ref, [7, 8.5]]
        }
        return [undefined, undefined]
    }, [step])

    function assertIsLooping() {
        if (!isLoopingRef.current) {
            throw new Error()
        }
    }

    async function processLoop() {
        try {
            await wait(400)
            assertIsLooping()
            selectCellRef([4, 4])
            await wait(800)
            assertIsLooping()
            selectCharRef('с', -1)
            await wait(800)
            assertIsLooping()
            selectCellRef([6, 4])
            await wait(800)
            assertIsLooping()
            selectCharRef('к', -1)
            await wait(800)
            assertIsLooping()
            completeWordRef()
            await wait(1200)
            assertIsLooping()
            resetRef()
            await wait(800)
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
            <ClipPath target={target} offset={offset} borderRadius={12}>
                {({ref, clipPath}) => <div ref={ref} style={{clipPath}} className={styles.backdrop}/>}
            </ClipPath>
            <GameContent
                boardRef={boardRef}
                charsRef={charsRef}
                hintsRef={hintsRef}
                actionsGroup1Ref={actionsGroup1Ref}
                actionsGroup2Ref={actionsGroup2Ref}
                {...game}
            />
            <SwitchTransition mode='out-in'>
                <CSSTransition key={step} timeout={ANIMATION_DURATION} classNames={ANIMATION_NAME}>
                    <div className={styles.panels}>
                        {step === 1 && (
                            <>
                                <Panel className={styles.step1Panel1}>
                                    <Text>
                                        <Text as="span" weight={500}>Выделяй&nbsp;пустую клетку</Text>,
                                        в&nbsp;которую
                                        собираешься
                                        поставить
                                        букву.
                                    </Text>
                                </Panel>
                                <Panel className={styles.step1Panel2}>
                                    <Text>
                                        Далее <Text as="span" weight={500}>по&nbsp;порядку вводи нужные буквы
                                        из&nbsp;набора</Text>. Помни, мы загадали только <Text
                                        as="span"
                                        weight={500}>существительные
                                        в&nbsp;единственном числе</Text>.
                                    </Text>
                                    <Button className={styles.step1Panel2NextButton} width={123} height={36}
                                            onClick={onNextStep}>
                                        <Image className={styles.nextButtonIcon} src={ArrowRightShort}/>
                                    </Button>
                                </Panel>
                            </>
                        )}
                        {step === 2 && (
                            <Panel className={styles.step2Panel}>
                                <Text>
                                    <Text as="span" weight={500}>Набор букв</Text> находится внизу. {'\n'}В&nbsp;нём&nbsp;всегда есть 1&nbsp;или&nbsp;2&nbsp;загаданных слова! {'\n'}Нажимай&nbsp;<Text as="span" weight={500}>кнопку обновления</Text>, если&nbsp;не&nbsp;можешь их&nbsp;найти. {'\n'}Обновлять набор букв можно сколько угодно.
                                    {'\n\n'}Псс… Тут&nbsp;будут <Text as="span" weight={500}>подсказки</Text>! Когда долго не&nbsp;удаётся найти слово, отобразится его&nbsp;<Text as="span" weight={500}>первая буква</Text>. Если&nbsp;слова два, то&nbsp;покажем&nbsp;обе.
                                </Text>
                                <Button className={styles.step2PanelNextButton} width={79.6} height={36}
                                        onClick={onNextStep}>
                                    <Image className={styles.nextButtonIcon} src={ArrowRightShort}/>
                                </Button>
                            </Panel>
                        )}
                        {step === 3 && (
                            <Panel className={styles.step3Panel}>
                                <Text>
                                    На&nbsp;всю&nbsp;игру у&nbsp;тебя есть&nbsp;<Text as="span" weight={500}>{MAX_HINTS}&nbsp;подсказок</Text>, которые покажут, <Text as="span" weight={500}>какие буквы</Text> есть&nbsp;в&nbsp;одном слове.
                                </Text>
                                <Button className={styles.step3PanelNextButton} width={123.78} height={36}
                                        onClick={onNextStep}>
                                    <Image className={styles.nextButtonIcon} src={ArrowRightShort}/>
                                </Button>
                            </Panel>
                        )}
                        {step === 4 && (
                            <Panel className={styles.step4Panel}>
                                <Text>
                                    Слово готово&nbsp;— <Text as="span" weight={500}>отправляй</Text>!
                                    {'\n'}
                                    Помни, отправлять можно
                                    по&nbsp;одному слову за&nbsp;раз.
                                    {'\n\n'}
                                    Если что‑то пошло не&nbsp;так&nbsp;— выбери ячейку и&nbsp;<Text as="span"
                                                                                                    weight={500}>удали</Text> букву.
                                </Text>
                                <Button className={styles.step4PanelNextButton} width={123.78} height={36}
                                        onClick={onNextStep}>
                                    <Image className={styles.nextButtonIcon} src={ArrowRightShort}/>
                                </Button>
                            </Panel>
                        )}
                        {step === 5 && (
                            <Panel className={styles.step5Panel}>
                                <Text>
                                    Если&nbsp;слова на&nbsp;текущем поле больше нельзя составить&nbsp;— <Text
                                    as="span"
                                    weight={500}>сдавай
                                    поле</Text> и&nbsp;начинай следующее. Всего у&nbsp;тебя в&nbsp;запасе <Text
                                    as="span"
                                    weight={500}>5&nbsp;полей</Text>.
                                </Text>
                                <Button className={styles.step5PanelNextButton} width={123.78} height={36}
                                        onClick={onNextStep}>
                                    <Image className={styles.nextButtonIcon} src={ArrowRightShort}/>
                                </Button>
                            </Panel>
                        )}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}