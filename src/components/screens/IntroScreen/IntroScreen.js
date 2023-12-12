import {useProgress} from "../../../contexts/ProgressContext";

export function IntroScreen() {
    const {next} = useProgress()

    return (
        <div>
            IntroScreen
            <button onClick={next}>next</button>
        </div>
    )
}