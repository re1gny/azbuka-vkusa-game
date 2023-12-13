import {createElement, useMemo} from 'react'
import cn from 'classnames'
import styles from './Button.module.scss'

export function Button(props) {
    const {className, children, width = '100%', height = 'auto', color = '#6DB63D', as = 'button'} = props

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
            className: cn(styles.button, className),
            style: {width: formattedWidth, height: formattedHeight, '--background-color': color}
        },
        children,
    )
}
