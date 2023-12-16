import CrossIcon from "../../assets/images/cross.svg";
import {ClearButton} from "../ClearButton";
import {Image} from "../Image";
import styles from './ClearCharButton.module.scss'

export function ClearCharButton(props) {
    const {className, onClick} = props

    return (
        <ClearButton className={className} width={47} height={35} color="#FB7D64" onClick={onClick}>
            <Image className={styles.icon} src={CrossIcon} />
        </ClearButton>
    )
}