import {Modal} from "../Modal";
import {Text} from "../Text";
import {Button} from "../Button";
import styles from './UnknownWordErrorModal.module.scss'

export function UnknownWordErrorModal(props) {
    const {opened, word, onClose} = props

    return (
        <Modal opened={opened}>
            <div className={styles.wrapper}>
                <Text className={styles.word} size={20} weight={500}>{word}</Text>
                <Text className={styles.description}>
                    Упс, такое мы&nbsp;не&nbsp;загадывали&nbsp;<Text as="span" wrap="nowrap">:(</Text>
                    {'\n\n'}
                    Проверь орфографию или&nbsp;попробуй другое слово.
                    {'\n\n'}
                    Помни, что&nbsp;нужно отправлять по&nbsp;одному слову за&nbsp;раз.
                </Text>
                <Button className={styles.button} width={172} height={36} onClick={onClose}>
                    <Text as="span" weight={500} color="#FFFFFF">Вернуться в игру</Text>
                </Button>
            </div>
        </Modal>
    )
}