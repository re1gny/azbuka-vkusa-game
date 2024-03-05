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
            <Text className={styles.description} size={19}>
                <Text size={19} weight={500} as="span">Составь по 5 слов</Text> на темы карьеры и завтрака.
                {'\n\n'}
                100 счастливчиков получат {'\n'}<Text size={19} weight={500} as="span">купон на бесплатный кофе!</Text>
                {'\n\n'}
                Удачи!
            </Text>
            <Button className={styles.nextButton} width={284} height={44} onClick={handleNext}>
                <Text as="span" size={20} weight={500} color="#FFFFFF">Играть</Text>
            </Button>
        </div>
    )
}