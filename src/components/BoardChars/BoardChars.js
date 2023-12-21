import {forwardRef} from "react";
import cn from 'classnames'
import RefreshIcon from "../../assets/images/refresh.svg";
import {MAX_CHARS} from "../../constants/game";
import {Text} from "../Text";
import {Button} from "../Button";
import {Image} from "../Image";
import styles from './BoardChars.module.scss'

function BoardCharsComponent(props, ref) {
    const {className, chars, onSelect, onRefresh} = props

    return (
        <div ref={ref} className={cn(styles.wrapper, className)}>
            <Button width={27} height={79} color="#F9DD4E" onClick={onRefresh}>
                <Image className={styles.refreshButtonIcon} src={RefreshIcon} />
            </Button>
            <div className={styles.boardChars}>
                {chars.slice(0, MAX_CHARS).map(({char, cell}, index) => (
                    <div
                        key={index}
                        className={cn(styles.boardChar, !!cell && styles.empty)}
                        onClick={() => onSelect?.(char, index)}
                    >
                        {!cell && <Text size={20} weight={400}>{char}</Text>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export const BoardChars = forwardRef(BoardCharsComponent)