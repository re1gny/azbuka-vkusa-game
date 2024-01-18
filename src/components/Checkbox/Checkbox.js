import {useCallback} from "react";
import cn from 'classnames'
import styles from './Checkbox.module.scss'

export function Checkbox(props) {
    const {className, value, disabled, children, onChange} = props

    const handleChange = useCallback((event) => {
        onChange?.(event.target.checked)
    }, [onChange])

    return (
        <label className={cn(styles.wrapper, className)}>{children}
            <input className={styles.input} type="checkbox" disabled={disabled} checked={value} onChange={handleChange} />
            <span className={styles.mark}>
                <svg className={styles.check} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8.5L7.08108 14.5L16 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
        </label>
    )
}
