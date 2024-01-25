import {forwardRef, useCallback, useMemo} from "react";
import cn from 'classnames'
import styles from './Input.module.scss'

function InputComponent(props, ref) {
    const {className, placeholder, width = '100%', type = 'text', pattern, disabled, value, onChange} = props

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
            ref={ref}
            className={cn(styles.input, className)}
            style={{width: formattedWidth}}
            value={value}
            type={type}
            disabled={disabled}
            pattern={pattern}
            placeholder={placeholder}
            onChange={handleChange}
        />
    )
}

export const Input = forwardRef(InputComponent)