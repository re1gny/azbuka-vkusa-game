import {useState} from "react";
import cn from "classnames";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {useGame} from "../../hooks/useGame";
import {Step1} from "./Step1";
import {Step2} from "./Step2";
import {Step3} from "./Step3";
import styles from './TrainingContent.module.scss'

const ANIMATION_DURATION = parseInt(styles.animationDuration)
const ANIMATION_NAME = styles.animationName

const CHARS = ['а', 'б', 'о', 'к', 'д', 'е', 'ж', 'с', 'и', 'й', 'к', 'л']

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
    ]
]

export function TrainingContent(props) {
    const {className, onComplete} = props
    const [step, setStep] = useState(1)
    const game1 = useGame({withSuccessText: false, withSecondaryHint: false, chars: CHARS})
    const game2 = useGame({withSuccessText: false, withSecondaryHint: false, initialBoardsState: BOARDS_INITIAL_STATE, boardRows: 8, boardColumns: 7})

    function nextStep() {
        setStep(prev => prev + 1)
    }

    return (
        <div className={cn(styles.wrapper, className)}>
            <SwitchTransition mode='out-in'>
                <CSSTransition key={step} timeout={ANIMATION_DURATION} classNames={ANIMATION_NAME}>
                    <div className={styles.steps}>
                        {step === 1 && (
                            <Step1 step={step} {...game1} onNextStep={nextStep} />
                        )}
                        {step === 2 && (
                            <Step2 step={step} {...game2} onNextStep={nextStep} />
                        )}
                        {step === 3 && (
                            <Step3 step={step} onNextStep={onComplete} />
                        )}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}