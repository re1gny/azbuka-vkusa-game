import {useCallback, useLayoutEffect, useRef, useState} from 'react'
import useResizeObserver from "use-resize-observer"
import {getSizeRatio} from "../../utils/getSizeRatio";
import styles from './ScreenTemplate.module.scss'

const TARGET_WIDTH = parseInt(styles.targetWidth)
const TARGET_HEIGHT = parseInt(styles.targetHeight)

export function ScreenTemplate(props) {
    const {children} = props
    const wrapperRef = useRef()
    const wrapperInnerRef = useRef()
    const [sizeRatio, setSizeRatio] = useState();

    const calculateSizeRatio = useCallback(() => {
        const width = wrapperInnerRef?.current?.clientWidth
        const height = wrapperInnerRef?.current?.clientHeight
        setSizeRatio(getSizeRatio(width, height, TARGET_WIDTH, TARGET_HEIGHT))
    }, [wrapperInnerRef])

    useLayoutEffect(() => {
        calculateSizeRatio()
    }, [])

    useResizeObserver({ onResize: calculateSizeRatio, ref: wrapperRef })

    return (
        <div ref={wrapperRef} className={styles.wrapper} style={{'--size-ratio': sizeRatio}}>
            <div ref={wrapperInnerRef} className={styles.wrapperInner}>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}