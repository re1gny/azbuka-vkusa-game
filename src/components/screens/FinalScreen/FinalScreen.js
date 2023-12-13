import {WinContent} from "./WinContent";
import {LoseContent} from "./LoseContent";
import {getUrlParam} from "../../../utils/getUrlParam";

export function FinalScreen() {
    const win = getUrlParam('win') === 'true'

    return win ? <WinContent /> : <LoseContent />
}