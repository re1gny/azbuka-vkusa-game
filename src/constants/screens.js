export const SCREENS = {
    INTRO: 'INTRO',
    TRAINING: 'TRAINING',
    GAME: 'GAME',
    FINAL: 'FINAL',
}

export const NEXT_SCREENS = {
    [SCREENS.INTRO]: SCREENS.FINAL,
    [SCREENS.TRAINING]: SCREENS.GAME,
    [SCREENS.GAME]: SCREENS.FINAL,
    [SCREENS.FINAL]: null,
}