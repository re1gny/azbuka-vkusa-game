import {useMemo} from "react";
import cn from 'classnames'
import styles from './Panel.module.scss'

export function Panel(props) {
    const {className, children, withBorder = false, padding = [12, 16], color = '#FFF2C4'} = props

    const formattedPadding = useMemo(() => {
        if (typeof padding === 'number') {
            return [padding, padding, padding, padding]
        }

        if (padding?.length === 1) {
            return [padding[0], padding[0], padding[0], padding[0]]
        }

        if (padding?.length === 2) {
            return [padding[0], padding[1], padding[0], padding[1]]
        }

        if (padding?.length === 3) {
            return [padding[0], padding[1], padding[2], padding[1]]
        }

        if (padding?.length === 4) {
            return [padding[0], padding[1], padding[2], padding[3]]
        }

        return [0, 0, 0, 0]
    }, [padding])

    return (
        <div
            className={cn(styles.panel, withBorder && styles.withBorder, className)}
            style={{
                '--padding-top': `${formattedPadding?.[0]}px`,
                '--padding-right': `${formattedPadding?.[1]}px`,
                '--padding-bottom': `${formattedPadding?.[2]}px`,
                '--padding-left': `${formattedPadding?.[3]}px`,
                '--background-color': color,
            }}
        >
            {children}
        </div>
    )
}
