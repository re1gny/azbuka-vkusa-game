import {isSameBoardCell} from "./isSameBoardCell";

export function isBoardCellSelected(current, board) {
    return isSameBoardCell(current, board.selected)
}