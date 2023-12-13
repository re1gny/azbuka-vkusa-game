import {createElement} from 'react'
import cn from 'classnames'
import styles from './Text.module.scss'

export function Text(props) {
    const {
        className,
        children,
        as = 'p',
        weight = 300,
        size = 16,
        align = 'center',
        color = '#0B4F38',
    } = props

    return createElement(
        as,
        {
            className: cn(styles.text, styles[size], styles[weight], className),
            style: {'--font-weight': weight, '--font-size': `${size}px`, '--text-align': align, '--color': color},
        },
        children,
    )
}
