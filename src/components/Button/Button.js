import {createElement, forwardRef, useMemo} from 'react'
import cn from 'classnames'
import styles from './Button.module.scss'

function ButtonComponent(props, ref) {
    const {
        className,
        children,
        width = '100%',
        height = 'auto',
        color = '#6DB63D',
        as = 'button',
        type = 'button',
        disabled = false,
        onClick,
    } = props

    const formattedWidth = useMemo(() => {
        if (typeof width === 'number') {
            return `calc(${width}px * var(--size-ratio))`
        }

        return width
    }, [width])

    const formattedHeight = useMemo(() => {
        if (typeof height === 'number') {
            return `calc(${height}px * var(--size-ratio))`
        }

        return height
    }, [height])

    return createElement(
        as,
        {
            ref,
            className: cn(styles.button, className),
            type,
            disabled,
            style: {width: formattedWidth, height: formattedHeight, '--background-color': color},
            onClick,
        },
        children,
    )
}

export const Button = forwardRef(ButtonComponent)
