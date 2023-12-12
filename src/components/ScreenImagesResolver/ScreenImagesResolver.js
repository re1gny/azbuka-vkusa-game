import cn from "classnames";
import Broccoli from '../../assets/images/broccoli.png'
import Croissant from '../../assets/images/croissant.png'
import Egg from '../../assets/images/egg.png'
import Toast from '../../assets/images/toast.png'
import {Image} from "../Image";
import {SCREENS} from "../../constants/screens";
import {useProgress} from "../../contexts/ProgressContext";
import styles from './ScreenImagesResolver.module.scss'

export function ScreenImagesResolver(props) {
    const {className} = props
    const {screen} = useProgress()
    const isMuted = screen !== SCREENS.INTRO

    return (
        <div className={cn(styles.wrapper, className)}>
            <Image className={cn(styles.image, styles.broccoli, isMuted && styles.muted)} src={Broccoli} />
            <Image className={cn(styles.image, styles.croissant, isMuted && styles.muted)} src={Croissant} />
            <Image className={cn(styles.image, styles.egg, isMuted && styles.muted)} src={Egg} />
            <Image className={cn(styles.image, styles.toast, isMuted && styles.muted)} src={Toast} />
        </div>
    )
}