import {useRef} from 'react'
import {SizeRatioContextProvider} from "../../contexts/SizeRatioContext";
import styles from './ScreenTemplate.module.scss'

const TARGET_WIDTH = parseInt(styles.targetWidth)
const TARGET_HEIGHT = parseInt(styles.targetHeight)

export function ScreenTemplate(props) {
    const {children} = props
    const wrapperRef = useRef()
    const wrapperInnerRef = useRef()

    return (
        <SizeRatioContextProvider target={wrapperInnerRef} targetWidth={TARGET_WIDTH} targetHeight={TARGET_HEIGHT}>
            {(sizeRatio) => (
                <div ref={wrapperRef} className={styles.wrapper} style={{'--size-ratio': sizeRatio}}>
                    <div ref={wrapperInnerRef} className={styles.wrapperInner}>
                        <div className={styles.content}>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </SizeRatioContextProvider>
    )
}