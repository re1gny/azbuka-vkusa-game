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
    const {className, step, onNextStep, ...game} = props
    const {board} = game

    return (
        <div className={cn(styles.wrapper, className)}>
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
            <Button className={styles.nextButton} width={123} height={36} onClick={onNextStep}>
                <Image className={styles.nextButtonIcon} src={ArrowRightShort}/>
            </Button>
        </div>
    )
}