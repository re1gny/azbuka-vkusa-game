import {useState} from "react";
import cn from "classnames";
import {SwitchTransition, CSSTransition} from "react-transition-group";
import {useGame} from "../../hooks/useGame";
import {Button} from "../Button";
import {Text} from "../Text";
import {Step1234} from "./Step1234";
import {Step5} from "./Step5";
import {Step6} from "./Step6";
import {Step7} from "./Step7";
import {BREAKFAST_WORDS} from "../../constants/game";
import styles from './TrainingContent.module.scss'

const STEPS_ANIMATION_DURATION = parseInt(styles.stepsAnimationDuration)
const STEPS_ANIMATION_NAME = styles.stepsAnimationName
const SKIP_BUTTON_ANIMATION_DURATION = parseInt(styles.skipButtonAnimationDuration)
const SKIP_BUTTON_ANIMATION_NAME = styles.skipButtonAnimationName

const BOARDS_INITIAL_STATE_1 = [
    [
        [null, null, null, null, null, null],
        [null, null, null, null, null, 'р'],
        [null, null, null, null, null, 'а'],
        [null, null, null, 'с', null, 'б'],
        [null, null, null, 'о', null, 'о'],
        [null, null, null, 'к', null, 'т'],
        [null, null, null, null, null, 'а'],
    ]
]

const BOARDS_INITIAL_STATE_2 = [
    [
        ['р', 'а', 'б', 'о', 'т', 'а', null],
        ['с', 'о', 'к', null, null, null, null],
        [null, null, null, null, null, 'с', 'р'],
        [null, null, null, null, null, 'о', 'а'],
        ['с', null, null, null, null, 'к', 'б'],
        [null, 'о', null, null, null, null, 'о'],
        [null, null, 'к', null, null, null, 'т'],
        [null, null, null, null, null, null, 'а'],
    ]
]

const BOARDS_INITIAL_STATE_3 = [
    [
        ['р', 'а', 'б', 'о', 'т', 'а', null],
        [null, null, null, null, null, null, null],
        ['с', 'о', 'к', null, null, 'р', null],
        [null, null, null, null, null, 'а', null],
        [null, null, null, null, null, 'б', null],
        [null, null, null, null, 'с', 'о', 'к'],
        [null, null, null, null, null, 'т', null],
        [null, null, null, null, null, 'а', null],
    ]
]

const STEP_KEY_MAP = {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 2,
    6: 3,
    7: 4,
}

export function TrainingContent(props) {
    const {className, onComplete} = props
    const [step, setStep] = useState(1)
    const game1 = useGame({initialBoardsState: BOARDS_INITIAL_STATE_1, careerWords: [...BREAKFAST_WORDS, 'ката']})
    const game2 = useGame({initialBoardsState: BOARDS_INITIAL_STATE_2, boardRows: 8, boardColumns: 7})
    const game3 = useGame({initialBoardsState: BOARDS_INITIAL_STATE_3, boardRows: 8, boardColumns: 7})

    function nextStep() {
        setStep(prev => prev + 1)
    }

    return (
        <div className={cn(styles.wrapper, className)}>
            <CSSTransition
                in={step === 1 || step === 2 || step === 3 || step === 4 || step === 5 || step === 6}
                timeout={SKIP_BUTTON_ANIMATION_DURATION}
                classNames={SKIP_BUTTON_ANIMATION_NAME}
                mountOnEnter
                unmountOnExit
            >
                <Button className={styles.skipButton} width={312} height={37} color="#0B4F38" onClick={onComplete}>
                    <Text as="span" weight={400} color="#FFFFFF">Пропустить правила</Text>
                </Button>
            </CSSTransition>
            <SwitchTransition mode='out-in'>
                <CSSTransition key={STEP_KEY_MAP[step]} timeout={STEPS_ANIMATION_DURATION} classNames={STEPS_ANIMATION_NAME}>
                    <div className={styles.steps}>
                        {(step === 1 || step === 2 || step === 3 || step === 4) && (
                            <Step1234 step={step} {...game1} onNextStep={nextStep}/>
                        )}
                        {step === 5 && (
                            <Step5 step={step} {...game2} onNextStep={nextStep}/>
                        )}
                        {step === 6 && (
                            <Step6 step={step} {...game3} onNextStep={nextStep}/>
                        )}
                        {step === 7 && (
                            <Step7 step={step} onNextStep={onComplete}/>
                        )}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}