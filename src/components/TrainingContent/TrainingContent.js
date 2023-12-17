import cn from "classnames";
import styles from './TrainingContent.module.scss'

export function TrainingContent(props) {
    const {className, onComplete} = props

    return (
        <div className={cn(className)}>
            TrainingContent
            <button onClick={onComplete}>onComplete</button>
        </div>
    )
}