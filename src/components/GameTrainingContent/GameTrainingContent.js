import {useState} from "react";
import cn from "classnames";
import {SwitchTransition, CSSTransition} from "react-transition-group";
import {useGame} from "../../hooks/useGame";
import {Button} from "../Button";
import {Text} from "../Text";
import {Step1} from "./Step1";
import {Step2} from "./Step2";
import {Step3} from "./Step3";
import {Step4} from "./Step4";
import styles from './GameTrainingContent.module.scss'

const ANIMATION_DURATION = parseInt(styles.animationDuration)
const ANIMATION_NAME = styles.animationName

const BOARDS_INITIAL_STATE_1 = [
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

const BOARDS_INITIAL_STATE_2 = [
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

export function GameTrainingContent(props) {
    const {className, onComplete} = props
    const [step, setStep] = useState(1)
    const game1 = useGame({initialBoardsState: BOARDS_INITIAL_STATE_1, boardRows: 8, boardColumns: 7})
    const game2 = useGame({initialBoardsState: BOARDS_INITIAL_STATE_2, boardRows: 8, boardColumns: 7})

    function nextStep() {
        setStep(prev => prev + 1)
    }

    function prevStep() {
        setStep(prev => prev - 1)
    }

    return (
        <div className={cn(styles.wrapper, className)}>
            <Button className={styles.skipButton} width={165} height={37} color="#0B4F38" onClick={onComplete}>
                <Text as="span" weight={400} color="#FFFFFF">Вернуться в игру</Text>
            </Button>
            <SwitchTransition mode='out-in'>
                <CSSTransition key={step} timeout={ANIMATION_DURATION} classNames={ANIMATION_NAME}>
                    <div className={styles.steps}>
                        {step === 1 && (
                            <Step1 step={step} {...game1} onNextStep={nextStep} />
                        )}
                        {step === 2 && (
                            <Step2 step={step} {...game1} onNextStep={nextStep} onPrevStep={prevStep} />
                        )}
                        {step === 3 && (
                            <Step3 step={step} {...game2} onNextStep={nextStep} onPrevStep={prevStep} />
                        )}
                        {step === 4 && (
                            <Step4 step={step} onPrevStep={prevStep} />
                        )}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}