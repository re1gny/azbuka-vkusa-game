import cn from 'classnames'
import RefreshIcon from "../../assets/images/refresh.svg";
import {isBoardCellSelected} from "../../utils/isBoardCellSelected";
import {isBoardCellAvailable} from "../../utils/isBoardCellAvailable";
import {isBoardCellConfirmed} from "../../utils/isBoardCellConfirmed";
import {MAX_CHARS} from "../../constants/game";
import styles from './BoardChars.module.scss'
import {Text} from "../Text";
import {Button} from "../Button";
import {Image} from "../Image";

export function BoardChars(props) {
    const {className, chars, onSelect, onRefresh} = props

    return (
        <div className={cn(styles.wrapper, className)}>
            <Button width={27} height={79} color="#F9DD4E" onClick={onRefresh}>
                <Image className={styles.refreshButtonIcon} src={RefreshIcon} />
            </Button>
            <div className={styles.boardChars}>
                {Object.keys(chars.current).map((key) => (
                    <div
                        key={key}
                        className={cn(styles.boardChar, !!chars.current[key].cell && styles.empty)}
                        onClick={() => onSelect(chars.current[key].char, key)}
                    >
                        {!chars.current[key].cell && <Text size={20} weight={400}>{chars.current[key].char}</Text>}
                    </div>
                ))}
            </div>
        </div>
    )
}
