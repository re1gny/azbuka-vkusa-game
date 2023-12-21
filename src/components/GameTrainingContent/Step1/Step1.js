import cn from "classnames";
import styles from './Step1.module.scss'
import {Text} from "../../Text";
import {Panel} from "../../Panel";
import {Board} from "../../Board";
import {Button} from "../../Button";
import {Image} from "../../Image";
import ArrowRightShort from "../../../assets/images/arrowRightShort.svg";
import {BoardCell} from "../../BoardCell";
import {BoardChars} from "../../BoardChars";
import {CompleteWordButton} from "../../CompleteWordButton";
import {ClearCharButton} from "../../ClearCharButton";
import {CompleteBoardButton} from "../../CompleteBoardButton";

export function Step1(props) {
    const {className, step, onNextStep, ...game} = props
    const {chars} = game

    return (
        <div className={cn(styles.wrapper, className)}>
            <Text size={44} weight={500}>навигация</Text>
            <div className={styles.panels}>
                <Panel className={styles.panel1} padding={[12, 16]} withBorder color="#FFF6DB">
                    <div className={styles.cells}>
                        <BoardCell className={styles.cell1} />
                        <BoardCell className={styles.cell2} selected />
                    </div>
                    <Text className={styles.panel1Text1}>
                        <Text as="span" weight={500}>Выделяй&nbsp;пустую клетку</Text>, в&nbsp;которую собираешься поставить букву. Далее <Text as="span" weight={500}>по&nbsp;порядку ставь нужные буквы из&nbsp;набора</Text>.
                    </Text>
                    <BoardChars className={styles.chars} chars={chars} />
                    <Text className={styles.panel1Text2}>
                        Ты можешь <Text as="span" weight={500}>обновлять</Text> его сколько хочешь, в&nbsp;любой момент игры.
                    </Text>
                </Panel>
                <Panel className={styles.panel2} padding={[12, 16]} withBorder color="#FFF6DB">
                    <div className={styles.item}>
                        <div className={styles.itemButtonWrapper}>
                            <CompleteWordButton className={styles.itemButton}/>
                        </div>
                        <Text align="left">
                            <Text as="span" weight={500} align="left">Отправляй</Text> по&nbsp;одному слову за&nbsp;раз.
                        </Text>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemButtonWrapper}>
                            <ClearCharButton className={styles.itemButton}/>
                        </div>
                        <Text align="left">
                            Если&nbsp;нужно, выбери ячейку и&nbsp;<Text as="span" weight={500} align="left">удали</Text> букву.
                        </Text>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemButtonWrapper}>
                            <CompleteBoardButton className={styles.itemButton}/>
                        </div>
                        <Text align="left">
                            <Text as="span" weight={500} align="left">Сдавай поле</Text>, если&nbsp;для новых слов нет&nbsp;места.
                        </Text>
                    </div>
                </Panel>
            </div>
            <Button className={styles.nextButton} width={123} height={36} onClick={onNextStep}>
                <Image className={styles.nextButtonIcon} src={ArrowRightShort}/>
            </Button>
        </div>
    )
}