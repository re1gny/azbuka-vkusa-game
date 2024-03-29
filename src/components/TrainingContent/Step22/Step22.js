import cn from "classnames";
import ArrowRightShort from "../../../assets/images/arrowRightShort.svg";
import ArrowRightLong from "../../../assets/images/arrorRightLong.svg";
import ArrowBottomLong from "../../../assets/images/arrowBottomLong.svg";
import {Image} from "../../Image";
import {Button} from "../../Button";
import {Text} from "../../Text";
import {Panel} from "../../Panel";
import {Board} from "../../Board";
import styles from './Step22.module.scss'

export function Step22(props) {
    const {className, step, onNextStep, ...game} = props
    const {board} = game

    return (
        <div className={cn(styles.wrapper, className)}>
            <Text size={44} weight={500}>как можно</Text>
            <Panel className={styles.panel} padding={[24, 25, 29]} withBorder color="#FFF6DB">
                <Text>
                    Принимаются только <Text as="span" weight={500}>существительные</Text> в&nbsp;<Text as="span" weight={500}>единственном числе</Text>. Слова читаются <Text as="span" weight={500}>слева направо и&nbsp;сверху вниз</Text>:
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