import {CSSTransition} from "react-transition-group";
import styles from './Modal.module.scss'

const ANIMATION_DURATION = parseInt(styles.animationDuration)
const ANIMATION_NAME = styles.animationName

export function Modal(props) {
    const {opened, children} = props

    return (
        <CSSTransition
            in={opened}
            timeout={ANIMATION_DURATION}
            classNames={ANIMATION_NAME}
            mountOnEnter
            unmountOnExit
        >
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </CSSTransition>
    )
}