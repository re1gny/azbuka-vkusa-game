import CheckIcon from "../../assets/images/check.svg";
import {Button} from "../Button";
import {Image} from "../Image";
import styles from './CompleteWordButton.module.scss'

export function CompleteWordButton(props) {
    const {className, onClick} = props

    return (
        <Button className={className} width={97} height={35} onClick={onClick}>
            <Image className={styles.icon} src={CheckIcon} />
        </Button>
    )
}