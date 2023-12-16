import {isBoardCellConfirmed} from "./isBoardCellConfirmed";

export function isBoardCellAvailable(current, board) {
    return !isBoardCellConfirmed(current, board)
}