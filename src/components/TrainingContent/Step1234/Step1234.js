import cn from "classnames";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import ArrowRightShort from "../../../assets/images/arrowRightShort.svg";
import {Image} from "../../Image";
import {Button} from "../../Button";
import {Text} from "../../Text";
import {Panel} from "../../Panel";
import {Board} from "../../Board";
import {BoardProgress} from "../../BoardProgress";
import {
    MAX_BREAKFAST_WORDS,
    MAX_CAREER_WORDS,
    REQUIRED_BREAKFAST_WORDS,
    REQUIRED_CAREER_WORDS
} from "../../../constants/game";
import {BoardChars} from "../../BoardChars";
import {CompleteBoardButton} from "../../CompleteBoardButton";
import {CompleteWordButton} from "../../CompleteWordButton";
import {ClearCharButton} from "../../ClearCharButton";
import styles from './Step1234.module.scss'

const ANIMATION_DURATION = parseInt(styles.animationDuration)
const ANIMATION_NAME = styles.animationName

export function Step1234(props) {
    const {className, step, onNextStep, ...game} = props
    const {board, chars, careerWords, breakfastWords} = game

    return (
        <SwitchTransition mode='out-in'>
            <CSSTransition key={step} timeout={ANIMATION_DURATION} classNames={ANIMATION_NAME}>
                <div className={cn(styles.wrapper, className)}>
                    <div className={styles.backdrop}/>
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
                    <div className={cn(styles.board, step === 1 && styles.visible)}>
                        <Board board={board}/>
                    </div>
                    <div className={cn(styles.chars, step === 2 && styles.visible)}>
                        <BoardChars chars={chars}/>
                    </div>
                    <div className={styles.actions}>
                        <div className={cn(styles.actionGroup, step === 3 && styles.visible)}>
                            <CompleteBoardButton className={styles.action}/>
                        </div>
                        <div className={cn(styles.actionGroup, step === 4 && styles.visible)}>
                            <CompleteWordButton className={styles.action}/>
                            <ClearCharButton className={styles.action}/>
                        </div>
                    </div>
                    {step === 1 && (
                        <>
                            <Panel className={styles.step1Panel1}>
                                <Text>
                                    <Text as="span" weight={500}>Выделяй&nbsp;пустую клетку</Text>, в&nbsp;которую
                                    собираешься
                                    поставить
                                    букву.
                                </Text>
                            </Panel>
                            <Panel className={styles.step1Panel2}>
                                <Text>
                                    Далее <Text as="span" weight={500}>по&nbsp;порядку ставь нужные буквы
                                    из&nbsp;набора</Text>&nbsp;—
                                    следуй подсказкам на&nbsp;поле. Помни, мы загадали только <Text as="span"
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
                                <Text as="span" weight={500}>Набор букв</Text> находится здесь. Жми&nbsp;кнопку <Text
                                as="span" weight={500}>обновления</Text>, если&nbsp;совсем ничего не&nbsp;можешь
                                из&nbsp;них&nbsp;составить.
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
                                Слово готово&nbsp;— <Text as="span" weight={500}>отправляй</Text>!
                                {'\n'}
                                Помни: отправлять можно
                                по&nbsp;одному слову за&nbsp;раз.
                                {'\n\n'}
                                Если что‑то пошло не&nbsp;так&nbsp;— выбери ячейку и&nbsp;<Text as="span"
                                                                                                weight={500}>удали</Text> букву.
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
                                Если&nbsp;слова на&nbsp;текущем поле больше нельзя составить&nbsp;— <Text as="span"
                                                                                                          weight={500}>сдавай
                                поле</Text> и&nbsp;начинай следующее. Всего у&nbsp;тебя в&nbsp;запасе <Text as="span"
                                                                                                            weight={500}>5&nbsp;полей</Text>.
                            </Text>
                            <Button className={styles.step4PanelNextButton} width={123.78} height={36}
                                    onClick={onNextStep}>
                                <Image className={styles.nextButtonIcon} src={ArrowRightShort}/>
                            </Button>
                        </Panel>
                    )}
                </div>
            </CSSTransition>
        </SwitchTransition>
    )
}