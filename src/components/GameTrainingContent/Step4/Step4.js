import cn from "classnames";
import {Button} from "../../Button";
import {Text} from "../../Text";
import {Panel} from "../../Panel";
import {Image} from "../../Image";
import ArrowRightShort from "../../../assets/images/arrowRightShort.svg";
import {REQUIRED_BREAKFAST_WORDS, REQUIRED_CAREER_WORDS} from "../../../constants/game";
import styles from './Step4.module.scss'

export function Step4(props) {
    const {className, onPrevStep} = props

    return (
        <div className={cn(styles.wrapper, className)}>
            <Text size={44} weight={500}>ещё немного</Text>
            <Panel className={styles.panel} padding={[29, 26]} withBorder color="#FFF6DB">
                <Text size={20}>
                    <Text as="span" size={20} weight={500}>У тебя в запасе —&nbsp;5&nbsp;полей</Text>.{'\n'}Заполни каждое поле наибольшим количеством слов.
                    {'\n\n'}
                    Чтобы&nbsp;участвовать в&nbsp;розыгрыше, <Text as="span" size={20} weight={500}>достаточно составить {REQUIRED_CAREER_WORDS}&nbsp;слов</Text> на&nbsp;тему <Text as="span" size={20} weight={500}>карьеры</Text> и&nbsp;<Text as="span" size={20} weight={500}>{REQUIRED_BREAKFAST_WORDS}&nbsp;слов</Text> на&nbsp;тему <Text as="span" size={20} weight={500}>завтрака</Text>.
                    {'\n\n'}
                    Следи за&nbsp;<Text as="span" size={20} weight={500}>счётчиком</Text>&nbsp;во&nbsp;время игры!
                </Text>
            </Panel>
            <Button className={styles.prevButton} width={123} height={36} onClick={onPrevStep}>
                <Image className={styles.prevButtonIcon} src={ArrowRightShort}/>
            </Button>
        </div>
    )
}