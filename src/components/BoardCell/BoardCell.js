import cn from 'classnames'
import {Text} from "../Text";
import styles from './BoardCell.module.scss'

export function BoardCell(props) {
    const {className, char, selected, confirmed, available, onClick} = props

    return (
        <div
            className={cn(
                styles.boardCell,
                selected && styles.selected,
                confirmed && styles.confirmed,
                available && styles.available,
                !!char && styles.withChar,
                className,
            )}
            onClick={onClick}
        >
            {!!char && <Text size={20} weight={400} color={confirmed ? '#FFFFFF' : '#0B4F38'}>{char}</Text>}
        </div>
    )
}
