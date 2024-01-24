import cn from "classnames";
import {Text} from "../../../Text";
import {Button} from "../../../Button";
import {useProgress} from "../../../../contexts/ProgressContext";
import {goToVacancies} from "../../../../utils/goToVacancies";
import {reachMetrikaGoal} from "../../../../utils/reachMetrikaGoal";
import styles from "./LoseContent.module.scss";

export function LoseContent(props) {
    const {className} = props
    const {reset} = useProgress()

    function handleFindJob() {
        reachMetrikaGoal('work3')
        goToVacancies()
    }

    function handleRestart() {
        reachMetrikaGoal('restart')
        reset()
    }

    return (
        <div className={cn(styles.wrapper, className)}>
            <Text size={25} weight={500}>Набрать нужное количество слов не&nbsp;вышло&nbsp;<Text as="span" size={25} weight={500} wrap="nowrap">:(</Text></Text>
            <div className={styles.findJobWrapper}>
                <Text size={20}>Зато ты можешь <Text as="span" size={20} weight={500}>стать частью&nbsp;нашей команды</Text>:</Text>
                <Button className={styles.findJobButton} width={284} height={44} color="#0B4F38" onClick={handleFindJob}>
                    <Text as="span" size={20} weight={500} color="#FFFFFF">Найти работу</Text>
                </Button>
            </div>
            <div className={styles.tryAgainWrapper}>
                <Text size={20}>Или&nbsp;ещё&nbsp;раз попробуй угадать слова, чтобы&nbsp;<Text as="span" size={20} weight={500}>участвовать в&nbsp;розыгрыше</Text></Text>
                <Button className={styles.tryAgainButton} width={284} height={44} onClick={handleRestart}>
                    <Text as="span" size={20} weight={500} color="#FFFFFF">Играть снова</Text>
                </Button>
            </div>
        </div>
    )
}