import cn from 'classnames'
import {BoardCell} from "../BoardCell";
import {isBoardCellSelected} from "../../utils/isBoardCellSelected";
import {isBoardCellAvailable} from "../../utils/isBoardCellAvailable";
import {isBoardCellConfirmed} from "../../utils/isBoardCellConfirmed";
import styles from './Board.module.scss'

export function Board(props) {
    const {className, board, onSelectedChange} = props

    function handleCellClick(current, board) {
        if (!isBoardCellAvailable(current, board)) {
            return
        }

        onSelectedChange(current)
    }

    return (
        <div className={cn(styles.board, className)}>
            {board.chars.map((row, y) => (
                <div key={y} className={styles.row}>
                    {row.map((char, x) => (
                        <BoardCell
                            key={x}
                            className={styles.cell}
                            char={char}
                            selected={isBoardCellSelected([x, y], board)}
                            confirmed={isBoardCellConfirmed([x, y], board)}
                            available={isBoardCellAvailable([x, y], board)}
                            onClick={() => handleCellClick([x, y], board)}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
