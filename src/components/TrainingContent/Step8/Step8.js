import cn from "classnames";
import {Button} from "../../Button";
import {Text} from "../../Text";
import {Panel} from "../../Panel";
import {REQUIRED_BREAKFAST_WORDS, REQUIRED_CAREER_WORDS} from "../../../constants/game";
import styles from './Step8.module.scss'

export function Step8(props) {
    const {className, onNextStep} = props

    return (
        <div className={cn(styles.wrapper, className)}>
            <Text size={44} weight={500}>пора играть</Text>
            <Panel className={styles.panel} padding={[29, 26]} withBorder color="#FFF6DB">
                <Text size={20}>
                    <Text as="span" size={20} weight={500}>Впереди&nbsp;— 5&nbsp;полей</Text>. Заполни каждое поле наибольшим количеством слов.
                    {'\n\n'}
                    Чтобы&nbsp;участвовать в&nbsp;розыгрыше, <Text as="span" size={20} weight={500}>достаточно составить {REQUIRED_CAREER_WORDS}&nbsp;слов</Text> на&nbsp;тему <Text as="span" size={20} weight={500}>карьеры</Text> и&nbsp;<Text as="span" size={20} weight={500}>{REQUIRED_BREAKFAST_WORDS}&nbsp;слов</Text> на&nbsp;тему <Text as="span" size={20} weight={500}>завтрака</Text>.
                    {'\n\n'}
                    На&nbsp;<Text as="span" size={20} weight={500}>счётчике</Text> это&nbsp;отобразится&nbsp;— следи за&nbsp;ним&nbsp;во&nbsp;время игры!
                </Text>
            </Panel>
            <Button className={styles.nextButton} width={284} height={44} onClick={onNextStep}>
                <Text as="span" size={20} weight={500} color="#FFFFFF">Старт</Text>
            </Button>
        </div>
    )
}