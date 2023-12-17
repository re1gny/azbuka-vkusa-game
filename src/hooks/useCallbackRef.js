import {useRef} from "react";

export function useCallbackRef(callback) {
    const callbackRef = useRef()
    callbackRef.current = callback

    return (...args) => callbackRef.current(...args)
}