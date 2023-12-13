import {useMemo} from 'react'
import cn from 'classnames'
import {SwitchTransition, CSSTransition} from "react-transition-group";
import {IntroScreen} from "../screens/IntroScreen";
import {TrainingScreen} from "../screens/TrainingScreen";
import {GameScreen} from "../screens/GameScreen";
import {FinalScreen} from "../screens/FinalScreen";
import {SCREENS} from "../../constants/screens";
import {useProgress} from "../../contexts/ProgressContext";
import styles from './ScreenContentResolver.module.scss'

const SCREEN_COMPONENTS = {
    [SCREENS.INTRO]: IntroScreen,
    [SCREENS.TRAINING]: TrainingScreen,
    [SCREENS.GAME]: GameScreen,
    [SCREENS.FINAL]: FinalScreen,
}
const ANIMATION_DURATION = parseInt(styles.animationDuration)
const ANIMATION_NAME = styles.animationName

export function ScreenContentResolver(props) {
    const {className} = props
    const {screen} = useProgress()
    const Screen = useMemo(() => SCREEN_COMPONENTS[screen], [screen])

    return Screen && (
        <SwitchTransition mode='out-in'>
            <CSSTransition key={screen} timeout={ANIMATION_DURATION} classNames={ANIMATION_NAME}>
                <div className={cn(styles.content, className)}>
                    <Screen />
                </div>
            </CSSTransition>
        </SwitchTransition>
    )
}