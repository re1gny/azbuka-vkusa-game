import {Modal} from "../Modal";
import {Text} from "../Text";
import {Button} from "../Button";
import styles from './MultipleWordsErrorModal.module.scss'

export function MultipleWordsErrorModal(props) {
    const {opened, words, onClose} = props

    return (
        <Modal opened={opened}>
            <div className={styles.wrapper}>
                <Text className={styles.words} size={20} weight={500}>{words?.join(', ')}</Text>
                <Text className={styles.description}>
                    Ой, кажется, здесь несколько слов…
                    {'\n\n'}
                    Помни, что&nbsp;нужно отправлять по&nbsp;одному слову за&nbsp;раз!
                </Text>
                <Button className={styles.button} width={172} height={36} onClick={onClose}>
                    <Text as="span" weight={500} color="#FFFFFF">Вернуться в игру</Text>
                </Button>
            </div>
        </Modal>
    )
}