import cn from "classnames";
import {Text} from "../Text";
import styles from './BoardProgress.module.scss'

export function BoardProgress(props) {
    const {className, name, max, required, current} = props
    const isRequiredReached = current >= required

    return (
        <div className={cn(styles.wrapper, isRequiredReached && styles.fill, className)}>
            <Text as="span" size={18} weight={400}>{name}:</Text>
            <Text className={styles.amounts} as="span" size={16} weight={400}>
                <Text as="span" size={16} weight={400} color={isRequiredReached ? '#0B4F38' : '#6DB63D'}>{current}</Text>
                <Text as="span" size={16} weight={400}>/{max}</Text>
            </Text>
        </div>
    )
}