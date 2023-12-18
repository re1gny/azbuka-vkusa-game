import {createContext, useCallback, useContext, useLayoutEffect, useState} from 'react'
import useResizeObserver from "use-resize-observer";
import {getSizeRatio} from "../utils/getSizeRatio";

const INITIAL_STATE = 1

const SizeRatioContext = createContext(INITIAL_STATE)

export function SizeRatioContextProvider(props) {
    const {children, target, targetWidth, targetHeight} = props

    const [sizeRatio, setSizeRatio] = useState(INITIAL_STATE);

    const calculateSizeRatio = useCallback(() => {
        const width = target?.current?.clientWidth
        const height = target?.current?.clientHeight
        setSizeRatio(getSizeRatio(width, height, targetWidth, targetHeight))
    }, [target])

    useLayoutEffect(() => {
        calculateSizeRatio()
    }, [])

    useResizeObserver({ onResize: calculateSizeRatio, ref: target })

    return (
        <SizeRatioContext.Provider value={sizeRatio}>
            {typeof children === 'function' ? children(sizeRatio) : children}
        </SizeRatioContext.Provider>
    )
}

export function useSizeRatio() {
    return useContext(SizeRatioContext)
}
