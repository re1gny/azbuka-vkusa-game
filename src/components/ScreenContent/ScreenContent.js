import {ScreenContentResolver} from "../ScreenContentResolver";
import {ScreenImagesResolver} from "../ScreenImagesResolver";
import styles from './ScreenContent.module.scss'

export function ScreenContent() {
    return (
        <div className={styles.wrapper}>
            <ScreenImagesResolver className={styles.images} />
            <ScreenContentResolver className={styles.content} />
        </div>
    )
}