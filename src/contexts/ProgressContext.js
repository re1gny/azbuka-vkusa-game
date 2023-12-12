import {createContext, useCallback, useContext, useMemo, useState} from 'react'
import {NEXT_SCREENS, SCREENS} from "../constants/screens";
import {getUrlParam} from "../utils/getUrlParam";

const initialState = {
    screen: SCREENS.INTRO,
}

const ProgressContext = createContext(initialState)

export function ProgressProvider(props) {
    const {children} = props
    const [screen, setScreen] = useState(getUrlParam('screen') || initialState.screen)

    const next = useCallback(() => {
        setScreen(prev => NEXT_SCREENS[prev])
    }, [])

    const state = useMemo(() => ({screen, next}), [screen, next])

    return (
        <ProgressContext.Provider value={state}>
            {children}
        </ProgressContext.Provider>
    )
}

export function useProgress() {
    return useContext(ProgressContext)
}
