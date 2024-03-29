import cn from "classnames";
import ArrowRightShort from "../../../assets/images/arrowRightShort.svg";
import {Image} from "../../Image";
import {Button} from "../../Button";
import {Text} from "../../Text";
import {Panel} from "../../Panel";
import {Board} from "../../Board";
import styles from './Step6.module.scss'

export function Step6(props) {
    const {className, step, onPrevStep, onNextStep, onComplete, ...game} = props
    const {board} = game

    return (
        <div className={cn(styles.wrapper, className)}>
            <Button className={styles.backButton} width={165} height={37} color="#0B4F38" onClick={onComplete}>
                <Text as="span" weight={400} color="#FFFFFF">Вернуться в игру</Text>
            </Button>
            <Text size={44} weight={500}>как нельзя</Text>
            <Panel className={styles.panel} padding={[20, 25, 26]} withBorder color="#FFF6DB">
                <Text size={20}>
                    <Text as="span" size={20} weight={500}>Нельзя</Text> располагать слова <Text as="span" size={20}
                                                                                                 weight={500}>вплотную</Text> друг
                    к&nbsp;другу и&nbsp;<Text as="span" size={20} weight={500}>по&nbsp;диагонали</Text>:
                </Text>
                <Board className={styles.board} board={board}/>
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