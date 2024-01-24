import {useProgress} from "../../../contexts/ProgressContext";
import {TrainingContent} from "../../TrainingContent";
import {reachMetrikaGoal} from "../../../utils/reachMetrikaGoal";

export function TrainingScreen() {
    const {next} = useProgress()

    function handleNext() {
        reachMetrikaGoal('start')
        next()
    }

    return <TrainingContent onComplete={handleNext} />
}