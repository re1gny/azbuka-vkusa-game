import {Modal} from "../Modal";
import {Text} from "../Text";
import {Button} from "../Button";
import styles from './RepeatedWordErrorModal.module.scss'

export function RepeatedWordErrorModal(props) {
    const {opened, word, onClose} = props

    return (
        <Modal opened={opened}>
            <div className={styles.wrapper}>
                <Text className={styles.word} size={20} weight={500}>{word}</Text>
                <Text className={styles.description}>
                    Кажется, такое слово уже было...
                    {'\n\n'}
                    Придумаешь новое?
                </Text>
                <Button className={styles.button} width={172} height={36} onClick={onClose}>
                    <Text as="span" weight={500} color="#FFFFFF">Вернуться в игру</Text>
                </Button>
            </div>
        </Modal>
    )
}