import {useMemo} from 'react'
import {IntroScreen} from "../screens/IntroScreen";
import {TrainingScreen} from "../screens/TrainingScreen";
import {GameScreen} from "../screens/GameScreen";
import {FinalScreen} from "../screens/FinalScreen";
import {SCREENS} from "../../constants/screens";
import {useProgress} from "../../contexts/ProgressContext";

export const SCREEN_COMPONENTS = {
    [SCREENS.INTRO]: IntroScreen,
    [SCREENS.TRAINING]: TrainingScreen,
    [SCREENS.GAME]: GameScreen,
    [SCREENS.FINAL]: FinalScreen,
}

export function ScreenContentResolver(props) {
    const {className} = props
    const {screen} = useProgress()
    const Screen = useMemo(() => SCREEN_COMPONENTS[screen], [screen])

    return Screen && (
        <div className={className}>
            <Screen />
        </div>
    )
}