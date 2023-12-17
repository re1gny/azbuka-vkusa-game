import cn from "classnames";
import ArrowRightShort from "../../../assets/images/arrowRightShort.svg";
import {Image} from "../../Image";
import {Button} from "../../Button";
import {Text} from "../../Text";
import {Panel} from "../../Panel";
import {Board} from "../../Board";
import styles from './Step5.module.scss'

export function Step5(props) {
    const {className, step, onNextStep, ...game} = props
    const {board} = game

    return (
        <div className={cn(styles.wrapper, className)}>
            <Text size={44} weight={500}>как нельзя</Text>
            <Panel className={styles.panel} padding={[20, 25, 26]} withBorder color="#FFF6DB">
                <Text size={20}>
                    <Text as="span" size={20} weight={500}>Нельзя</Text> располагать слова <Text as="span" size={20} weight={500}>вплотную</Text> друг к&nbsp;другу и&nbsp;<Text as="span" size={20} weight={500}>по&nbsp;диагонали</Text>:
                </Text>
                <Board className={styles.board} board={board}/>
            </Panel>
            <Button className={styles.nextButton} width={123} height={36} onClick={onNextStep}>
                <Image className={styles.nextButtonIcon} src={ArrowRightShort}/>
            </Button>
        </div>
    )
}