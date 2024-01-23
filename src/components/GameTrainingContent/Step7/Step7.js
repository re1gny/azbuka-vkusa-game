import cn from "classnames";
import ArrowRightShort from "../../../assets/images/arrowRightShort.svg";
import ArrowRightLong from "../../../assets/images/arrorRightLong.svg";
import ArrowBottomLong from "../../../assets/images/arrowBottomLong.svg";
import {Image} from "../../Image";
import {Button} from "../../Button";
import {Text} from "../../Text";
import {Panel} from "../../Panel";
import {Board} from "../../Board";
import styles from './Step7.module.scss'

export function Step7(props) {
    const {className, step, onPrevStep, onNextStep, onComplete, ...game} = props
    const {board} = game

    return (
        <div className={cn(styles.wrapper, className)}>
            <Button className={styles.backButton} width={165} height={37} color="#0B4F38" onClick={onComplete}>
                <Text as="span" weight={400} color="#FFFFFF">Вернуться в игру</Text>
            </Button>
            <Text size={44} weight={500}>как можно</Text>
            <Panel className={styles.panel} padding={[20, 25, 26]} withBorder color="#FFF6DB">
                <Text size={20}>
                    Слова читаются <Text as="span" size={20} weight={500}>слева направо и&nbsp;сверху вниз</Text>:
                </Text>
                <div className={styles.boardWrapper}>
                    <Board className={styles.board} board={board}/>
                    <Image className={styles.topArrow} src={ArrowRightLong}/>
                    <Image className={styles.rightArrow} src={ArrowBottomLong}/>
                </div>
            </Panel>
            <div className={styles.buttons}>
                <Button className={styles.prevButton} width={80} height={36}
                        onClick={onPrevStep}>
                    <Image className={styles.prevButtonIcon} src={ArrowRightShort}/>
                </Button>
                <Button className={styles.nextButton} width={80} height={36}
                        onClick={onNextStep}>
                    <Image className={styles.nextButtonIcon} src={ArrowRightShort}/>
                </Button>
            </div>
        </div>
    )
}