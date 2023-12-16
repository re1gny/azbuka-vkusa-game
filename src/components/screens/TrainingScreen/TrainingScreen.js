import {useProgress} from "../../../contexts/ProgressContext";

export function TrainingScreen() {
    const {next} = useProgress()

    return (
        <div>
            TrainingScreen
            <button onClick={next}>next</button>
        </div>
    )
}