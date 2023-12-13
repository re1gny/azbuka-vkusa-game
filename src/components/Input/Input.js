import {useCallback} from "react";
import cn from 'classnames'
import styles from './Input.module.scss'

export function Input(props) {
    const {className, placeholder, value, onChange} = props

    const handleChange = useCallback((event) => {
        onChange?.(event.target.value)
    }, [onChange])

    return (
        <input
            type="text"
            className={cn(styles.input, className)}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
        />
    )
}
