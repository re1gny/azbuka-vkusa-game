import {Modal} from "../Modal";
import {Text} from "../Text";
import {Button} from "../Button";
import styles from './WinConfirmModal.module.scss'

export function WinConfirmModal(props) {
    const {opened, onContinue, onFinish} = props

    return (
        <Modal opened={opened}>
            <div className={styles.wrapper}>
                <Text className={styles.title} size={20} weight={500}>молодец</Text>
                <Text className={styles.description1}>
                    У&nbsp;тебя получилось набрать нужное количество слов, чтобы&nbsp;участвовать в&nbsp;розыгрыше!
                    {'\n\n'}
                    Ты&nbsp;можешь уже&nbsp;сейчас закончить игру и&nbsp;получить приз!
                </Text>
                <Button className={styles.finishButton} width={213} height={36} onClick={onFinish}>
                    <Text as="span" weight={500} color="#FFFFFF">Перейти к розыгрышу</Text>
                </Button>
                <Text className={styles.description2}>
                    А&nbsp;можешь продолжить игру и&nbsp;заполнить все&nbsp;поля.
                </Text>
                <Button className={styles.continueButton} width={136} height={36} color="#0B4F38" onClick={onContinue}>
                    <Text as="span" weight={500} color="#FFFFFF">Продолжить</Text>
                </Button>
            </div>
        </Modal>
    )
}