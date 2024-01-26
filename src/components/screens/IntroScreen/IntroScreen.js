import {useProgress} from "../../../contexts/ProgressContext";
import Logo from "../../../assets/images/logo.png";
import LineThrough from "../../../assets/images/lineThrough.svg";
import Subtitle from "../../../assets/images/subtitle.png";
import {Text} from "../../Text";
import {Image} from "../../Image";
import {Button} from "../../Button";
import {REQUIRED_BREAKFAST_WORDS, REQUIRED_CAREER_WORDS} from "../../../constants/game";
import {reachMetrikaGoal} from "../../../utils/reachMetrikaGoal";
import styles from './IntroScreen.module.scss'

export function IntroScreen() {
    const {next} = useProgress()

    function handleNext() {
        reachMetrikaGoal('rules')
        next()
    }

    return (
        <div className={styles.wrapper}>
            <Image className={styles.logo} src={Logo} />
            <div className={styles.titleWrapper}>
                <Text className={styles.title} size={44} weight={500}>карьерный{'\n'}скрэббл</Text>
                <Image className={styles.line} src={LineThrough} />
            </div>
            <Image className={styles.subTitle} src={Subtitle} />
            <Text className={styles.description} size={17}>
                Мы&nbsp;загадали существительные на&nbsp;2&nbsp;темы: <Text size={17} weight={500} as="span">карьера</Text> и&nbsp;<Text size={17} weight={500} as="span">завтрак</Text>. <Text size={17} weight={500} as="span">Составляй слова</Text> и&nbsp;выигрывай призы! Для&nbsp;участия в&nbsp;розыгрыше нужно составить <Text size={17} weight={500} as="span">по&nbsp;5&nbsp;слов на&nbsp;каждую тему</Text> (всего слов больше).
                {'\n\n'}
                Удачи и&nbsp;приятного аппетита!
            </Text>
            <Button className={styles.nextButton} width={284} height={44} onClick={handleNext}>
                <Text as="span" size={20} weight={500} color="#FFFFFF">Как играть?</Text>
            </Button>
        </div>
    )
}