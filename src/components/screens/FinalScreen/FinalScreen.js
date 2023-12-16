import {WinContent} from "./WinContent";
import {LoseContent} from "./LoseContent";
import {useProgress} from "../../../contexts/ProgressContext";

export function FinalScreen() {
    const {isWin} = useProgress()

    return isWin ? <WinContent /> : <LoseContent />
}