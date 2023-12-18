import {useLayoutEffect, useRef, useState} from "react";
import useResizeObserver from "use-resize-observer";
import {useSizeRatio} from "../../contexts/SizeRatioContext";

export function ClipPath(props) {
    const {children, target, offset = [0, 0], borderRadius = 0} = props
    const childrenRef = useRef()
    const [clipPath, setClipPath] = useState()
    const sizeRatio = useSizeRatio()

    function calculateClipPath() {
        if (!childrenRef.current || !target.current) {
            return
        }

        const childrenElement = childrenRef.current
        const targetElement = target.current
        const targetRect = targetElement.getBoundingClientRect()
        const childrenRect = childrenElement.getBoundingClientRect()

        const radius = borderRadius * sizeRatio
        const offsetY = offset[0] * sizeRatio
        const offsetX = offset[1] * sizeRatio
        const width = childrenElement.clientWidth
        const height = childrenElement.clientHeight
        const holeX = targetRect.left - childrenRect.left - offsetX
        const holeY = targetRect.top - childrenRect.top - offsetY
        const holeWidth = targetRect.width + 2 * offsetX
        const holeHeight = targetRect.height + 2 * offsetY

        const holePath = `M ${holeX} ${holeY} L ${holeX + holeWidth - radius} ${holeY} a ${radius} ${radius} 0 0 1 ${radius} ${radius} L ${holeX + holeWidth} ${holeY + holeHeight - radius} a ${radius} ${radius} 0 0 1 ${-radius} ${radius} L ${holeX + radius} ${holeY + holeHeight} a ${radius} ${radius} 0 0 1 ${-radius} ${-radius} L ${holeX} ${holeY + radius} a ${radius} ${radius} 0 0 1 ${radius} ${-radius}`

        const path = `M 0 0 L 0 ${height} L ${width} ${height} L ${width} 0 L 0 0 ${holePath} Z`

        setClipPath(`path('${path}')`)
    }

    useLayoutEffect(() => {
        calculateClipPath()
    }, [target, offset]);

    useResizeObserver({ref: childrenRef, onResize: calculateClipPath})

    return children?.({ref: childrenRef, clipPath})
}