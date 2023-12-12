import cn from "classnames";
import styles from './Image.module.scss'

export function Image(props) {
    const {className, src, alt} = props

    return <img className={cn(styles.image, className)} src={src} alt={alt} />
}
