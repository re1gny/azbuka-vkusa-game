import {useCallback, useMemo} from "react";
import cn from 'classnames'
import styles from './Input.module.scss'

export function Input(props) {
    const {className, placeholder, width = '100%', value, onChange} = props

    const formattedWidth = useMemo(() => {
        if (typeof width === 'number') {
            return `calc(${width}px * var(--size-ratio))`
        }

        return width
    }, [width])

    const handleChange = useCallback((event) => {
        onChange?.(event.target.value)
    }, [onChange])

    return (
        <input
            type="text"
            className={cn(styles.input, className)}
            style={{width: formattedWidth}}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
        />
    )
}
