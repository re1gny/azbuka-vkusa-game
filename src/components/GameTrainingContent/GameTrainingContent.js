import {useMemo, useState} from "react";
import cn from "classnames";
import {SwitchTransition, CSSTransition} from "react-transition-group";
import {useGame} from "../../hooks/useGame";
import {Step12345} from "./Step12345";
import {Step6} from "./Step6";
import {Step7} from "./Step7";
import {Step8} from "./Step8";
import styles from './GameTrainingContent.module.scss'

const ANIMATION_DURATION = parseInt(styles.animationDuration)
const ANIMATION_NAME = styles.animationName

const BOARDS_INITIAL_STATE_1 = [
    [
        [null, null, null, null, null, null],
        [null, null, null, null, null, 'р'],
        [null, null, null, null, null, 'а'],
        [null, null, null, null, null, 'б'],
        [null, null, null, null, null, 'о'],
        [null, null, null, null, null, 'т'],
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

const CAREER_WORDS_1 = ['работа', 'сок']

const BREAKFAST_WORDS_1 = []

const CHARS_1 = ['а', 'б', 'о' , 'к' , 'в', 'т', 'а', 'с', 'з' , 'р' , 'в', 'т']

const INITIAL_SECONDARY_HINTED_CHARS = [7]

const STEP_KEY_MAP = {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 2,
    7: 3,
    8: 4,
}

export function GameTrainingContent(props) {
    const {className, onComplete} = props
    const [step, setStep] = useState(1)
    const game1 = useGame({withSuccessText: false, withSecondaryHint: false, initialBoardsState: BOARDS_INITIAL_STATE_1, careerWords: CAREER_WORDS_1, breakfastWords: BREAKFAST_WORDS_1, chars: CHARS_1})
    const game2 = useGame({withSuccessText: false, withSecondaryHint: false, initialBoardsState: BOARDS_INITIAL_STATE_1, careerWords: CAREER_WORDS_1, breakfastWords: BREAKFAST_WORDS_1, chars: CHARS_1, initialSecondaryHintedChars: INITIAL_SECONDARY_HINTED_CHARS})
    const game3 = useGame({withSuccessText: false, withSecondaryHint: false, initialBoardsState: BOARDS_INITIAL_STATE_1, careerWords: CAREER_WORDS_1, breakfastWords: BREAKFAST_WORDS_1, chars: CHARS_1})
    const game4 = useGame({withSuccessText: false, withSecondaryHint: false, initialBoardsState: BOARDS_INITIAL_STATE_1, careerWords: CAREER_WORDS_1, breakfastWords: BREAKFAST_WORDS_1, chars: CHARS_1})
    const game5 = useGame({withSuccessText: false, withSecondaryHint: false, initialBoardsState: BOARDS_INITIAL_STATE_1, careerWords: CAREER_WORDS_1, breakfastWords: BREAKFAST_WORDS_1, chars: CHARS_1})
    const game6 = useGame({withSuccessText: false, withSecondaryHint: false, initialBoardsState: BOARDS_INITIAL_STATE_2, boardRows: 8, boardColumns: 7})
    const game7 = useGame({withSuccessText: false, withSecondaryHint: false, initialBoardsState: BOARDS_INITIAL_STATE_3, boardRows: 8, boardColumns: 7})

    const game = useMemo(() => {
        switch (step) {
            case 1:
                return game1
            case 2:
                return game2
            case 3:
                return game3
            case 4:
                return game4
            case 5:
                return game5
            case 6:
                return game6
            case 7:
                return game7
            default:
                return undefined
        }
    }, [step, game1, game2, game3, game4, game5, game6, game7])

    function nextStep() {
        setStep(prev => prev + 1)
    }

    function prevStep() {
        setStep(prev => prev - 1)
    }

    return (
        <div className={cn(styles.wrapper, className)}>
            <SwitchTransition mode='out-in'>
                <CSSTransition key={STEP_KEY_MAP[step]} timeout={ANIMATION_DURATION} classNames={ANIMATION_NAME}>
                    <div className={styles.steps}>
                        {(step === 1 || step === 2 || step === 3 || step === 4 || step === 5) && (
                            <Step12345 step={step} {...game} onNextStep={nextStep} onPrevStep={prevStep} onComplete={onComplete}/>
                        )}
                        {step === 6 && (
                            <Step6 step={step} {...game} onNextStep={nextStep} onPrevStep={prevStep} onComplete={onComplete}/>
                        )}
                        {step === 7 && (
                            <Step7 step={step} {...game} onNextStep={nextStep} onPrevStep={prevStep} onComplete={onComplete}/>
                        )}
                        {step === 8 && (
                            <Step8 step={step} onPrevStep={prevStep} onComplete={onComplete}/>
                        )}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}