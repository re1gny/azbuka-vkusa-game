import {useProgress} from "../../../contexts/ProgressContext";
import {TrainingContent} from "../../TrainingContent";

export function TrainingScreen() {
    const {next} = useProgress()

    return <TrainingContent onComplete={next} />
}