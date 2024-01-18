import cn from "classnames";
import {Button} from "../../Button";
import {Text} from "../../Text";
import {Panel} from "../../Panel";
import {Image} from "../../Image";
import ArrowRightShort from "../../../assets/images/arrowRightShort.svg";
import {MAX_HINTS, MAX_BOARDS, REQUIRED_BREAKFAST_WORDS, REQUIRED_CAREER_WORDS} from "../../../constants/game";
import styles from './Step4.module.scss'

export function Step4(props) {
    const {className, onPrevStep} = props

    return (
        <div className={cn(styles.wrapper, className)}>
            <Text size={44} weight={500}>ещё немного</Text>
            <Panel className={styles.panel} padding={[20, 25, 26]} withBorder color="#FFF6DB">
                <Text size={20}>
                    <Text as="span" size={20} weight={500}>У тебя в запасе —&nbsp;{MAX_BOARDS}&nbsp;полей</Text>.{'\n'}Заполни их наибольшим количеством слов.
                    {'\n\n'}
                    Если&nbsp;не&nbsp;будет получаться, мы&nbsp;покажем первые буквы. Также&nbsp;у&nbsp;тебя есть <Text as="span" size={20} weight={500}>{MAX_HINTS}&nbsp;подсказок</Text>, чтобы&nbsp;узнать все&nbsp;буквы одного слова.
                    {'\n\n'}
                    Чтобы&nbsp;участвовать в&nbsp;розыгрыше, <Text as="span" size={20} weight={500}>достаточно составить {REQUIRED_CAREER_WORDS}&nbsp;слов</Text> на&nbsp;тему <Text as="span" size={20} weight={500}>карьеры</Text> и&nbsp;<Text as="span" size={20} weight={500}>{REQUIRED_BREAKFAST_WORDS}&nbsp;слов</Text> на&nbsp;тему <Text as="span" size={20} weight={500}>завтрака</Text>. Следи за&nbsp;счётчиком&nbsp;во&nbsp;время игры!
                </Text>
            </Panel>
            <Button className={styles.prevButton} width={123} height={36} onClick={onPrevStep}>
                <Image className={styles.prevButtonIcon} src={ArrowRightShort}/>
            </Button>
        </div>
    )
}