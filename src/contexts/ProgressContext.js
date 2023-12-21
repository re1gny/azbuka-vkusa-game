import {createContext, useCallback, useContext, useMemo, useState} from 'react'
import {NEXT_SCREENS, SCREENS} from "../constants/screens";
import {getUrlParam} from "../utils/getUrlParam";

const INITIAL_STATE = {
    screen: SCREENS.INTRO,
    isWin: false,
}

const ProgressContext = createContext(INITIAL_STATE)

export function ProgressProvider(props) {
    const {children} = props
    const [screen, setScreen] = useState(getUrlParam('screen') || INITIAL_STATE.screen)
    const [isWin, setIsWin] = useState(INITIAL_STATE.isWin)

    const next = useCallback(() => {
        const nextScreen = NEXT_SCREENS[screen]

        if (!nextScreen) {
            return
        }

        setScreen(nextScreen)
    }, [screen])

    const win = useCallback(() => {
        setIsWin(true)
    }, [])

    const reset = useCallback(() => {
        setScreen(getUrlParam('screen') || INITIAL_STATE.screen)
        setIsWin(INITIAL_STATE.isWin)
    }, [])

    const state = useMemo(
        () => ({
            screen,
            isWin,
            next,
            win,
            reset,
        }),
        [
            screen,
            isWin,
            next,
            win,
            reset,
        ],
    )

    return (
        <ProgressContext.Provider value={state}>
            {children}
        </ProgressContext.Provider>
    )
}

export function useProgress() {
    return useContext(ProgressContext)
}
