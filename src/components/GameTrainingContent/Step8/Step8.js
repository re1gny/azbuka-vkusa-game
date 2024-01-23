import cn from "classnames";
import {Button} from "../../Button";
import {Text} from "../../Text";
import {Panel} from "../../Panel";
import {REQUIRED_BREAKFAST_WORDS, REQUIRED_CAREER_WORDS} from "../../../constants/game";
import styles from './Step8.module.scss'
import {Image} from "../../Image";
import ArrowRightShort from "../../../assets/images/arrowRightShort.svg";

export function Step8(props) {
    const {className, onPrevStep, onComplete} = props

    return (
        <div className={cn(styles.wrapper, className)}>
            <Text size={44} weight={500}>ещё немного</Text>
            <Panel className={styles.panel} padding={[29, 26]} withBorder color="#FFF6DB">
                <Text size={20}>
                    <Text as="span" size={20} weight={500}>Впереди&nbsp;— 5&nbsp;полей</Text>. Заполни каждое поле
                    наибольшим количеством слов.
                    {'\n\n'}
                    Чтобы&nbsp;участвовать в&nbsp;розыгрыше, <Text as="span" size={20} weight={500}>достаточно
                    составить {REQUIRED_CAREER_WORDS}&nbsp;слов</Text> на&nbsp;тему <Text as="span" size={20}
                                                                                          weight={500}>карьеры</Text> и&nbsp;
                    <Text as="span" size={20}
                          weight={500}>{REQUIRED_BREAKFAST_WORDS}&nbsp;слов</Text> на&nbsp;тему <Text as="span"
                                                                                                      size={20}
                                                                                                      weight={500}>завтрака</Text>.
                    {'\n\n'}
                    На&nbsp;<Text as="span" size={20} weight={500}>счётчике</Text> это&nbsp;отобразится&nbsp;— следи
                    за&nbsp;ним&nbsp;во&nbsp;время игры!
                </Text>
            </Panel>
            <div className={styles.buttons}>
                <Button className={styles.prevButton} width={80} height={36}
                        onClick={onPrevStep}>
                    <Image className={styles.prevButtonIcon} src={ArrowRightShort}/>
                </Button>
                <Button className={styles.backButton} width={165} height={37} color="#0B4F38" onClick={onComplete}>
                    <Text as="span" weight={400} color="#FFFFFF">Вернуться в игру</Text>
                </Button>
            </div>
        </div>
    )
}