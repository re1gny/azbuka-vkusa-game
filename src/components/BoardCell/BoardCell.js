import cn from 'classnames'
import styles from './BoardCell.module.scss'

export function BoardCell(props) {
    const {
        className,
        children,
        size = 35,
        border = 1.2,
        color = '#6DB63D',
        borderColor = '#0B4F38',
    } = props

    return (
        <div
            className={cn(styles.boardCell, className)}
            style={{
                '--size': `${size}px`,
                '--border-width': `${border}px`,
                '--background-color': color,
                '--border-color': borderColor,
            }}
        >
            {children}
        </div>
    )
}
