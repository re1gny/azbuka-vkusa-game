import cn from "classnames";
import {Button} from "../../Button";
import {Text} from "../../Text";
import {Panel} from "../../Panel";
import {MAX_HINTS, MAX_BOARDS, REQUIRED_BREAKFAST_WORDS, REQUIRED_CAREER_WORDS} from "../../../constants/game";
import styles from './Step3.module.scss'

export function Step3(props) {
    const {className, onNextStep} = props

    return (
        <div className={cn(styles.wrapper, className)}>
            <Text size={44} weight={500}>пора играть</Text>
            <Panel className={styles.panel} padding={[20, 25, 26]} withBorder color="#FFF6DB">
                <Text size={20}>
                    У тебя <Text as="span" size={20} weight={500}>в запасе —&nbsp;{MAX_BOARDS}&nbsp;полей</Text>.{'\n'}Заполни их наибольшим количеством слов.
                    {'\n\n'}
                    Тебе доступны <Text as="span" size={20} weight={500}>{MAX_HINTS}&nbsp;подсказок</Text>, чтобы&nbsp;узнать все&nbsp;буквы одного слова.
                    {'\n\n'}
                    Чтобы&nbsp;участвовать в&nbsp;розыгрыше, <Text as="span" size={20} weight={500}>достаточно составить {REQUIRED_CAREER_WORDS}&nbsp;слов</Text> на&nbsp;тему <Text as="span" size={20} weight={500}>карьеры</Text> и&nbsp;<Text as="span" size={20} weight={500}>{REQUIRED_BREAKFAST_WORDS}&nbsp;слов</Text> на&nbsp;тему <Text as="span" size={20} weight={500}>завтрака</Text>. Следи за&nbsp;счётчиком&nbsp;во&nbsp;время игры!
                </Text>
            </Panel>
            <Button className={styles.nextButton} width={284} height={44} onClick={onNextStep}>
                <Text as="span" size={20} weight={500} color="#FFFFFF">Старт</Text>
            </Button>
        </div>
    )
}