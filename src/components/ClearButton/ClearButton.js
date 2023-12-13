import cn from 'classnames'
import {Button} from "../Button";
import styles from './ClearButton.module.scss'

function ClearButtonComponent(props) {
    const {className, children, ...rest} = props

    return (
        <button className={cn(styles.clearButtonInner, className)} {...rest}>
            <svg className={styles.clearButtonInnerBackground} viewBox="0 0 48 35" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path
                    d="M10.4938 2.8841C12.0138 1.05683 14.2675 0 16.6443 0H39.8928C44.3111 0 47.8928 3.58172 47.8928 8V27C47.8928 31.4183 44.3111 35 39.8928 35H16.6443C14.2675 35 12.0138 33.9432 10.4938 32.1159L1.27897 21.0376C0.4525 20.044 0 18.7924 0 17.5C0 16.2076 0.452502 14.956 1.27897 13.9624L10.4938 2.8841Z"
                    fill="var(--background-color)"
                />
            </svg>
            <span className={styles.clearButtonInnerSizer} />
            {children}
        </button>
    )
}

export function ClearButton(props) {
    const {className, as, ...rest} = props

    return <Button className={cn(styles.clearButton, className)} as={ClearButtonComponent} {...rest} />
}
