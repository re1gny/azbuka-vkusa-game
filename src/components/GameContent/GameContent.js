import {useState} from "react";
import cn from "classnames";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import Logo from "../../assets/images/logo.png";
import Lamp from "../../assets/images/lamp.svg";
import {Image} from "../Image";
import {Text} from "../Text";
import {Button} from "../Button";
import {
    MAX_BREAKFAST_WORDS,
    MAX_CAREER_WORDS,
    REQUIRED_BREAKFAST_WORDS,
    REQUIRED_CAREER_WORDS
} from "../../constants/game";
import {GameTrainingContent} from "../GameTrainingContent";
import {Board} from "../Board";
import {BoardProgress} from "../BoardProgress";
import {BoardChars} from "../BoardChars";
import {CompleteBoardButton} from "../CompleteBoardButton";
import {CompleteWordButton} from "../CompleteWordButton";
import {ClearCharButton} from "../ClearCharButton";
import {UnknownWordErrorModal} from "../UnknownWordErrorModal";
import {RepeatedWordErrorModal} from "../RepeatedWordErrorModal";
import {MultipleWordsErrorModal} from "../MultipleWordsErrorModal";
import {WordInfoModal} from "../WordInfoModal";
import {WinConfirmModal} from "../WinConfirmModal";
import {reachMetrikaGoal} from "../../utils/reachMetrikaGoal";
import styles from "./GameContent.module.scss";

const SUCCESS_TEXT_ANIMATION_DURATION = parseInt(styles.successTextAnimationDuration)
const SUCCESS_TEXT_ANIMATION_NAME = styles.successTextAnimationName
const TRAINING_ANIMATION_DURATION = parseInt(styles.trainingAnimationDuration)
const TRAINING_ANIMATION_NAME = styles.trainingAnimationName

export function GameContent(props) {
    const {className, charsRef, boardRef, hintsRef, helpRef, actionsGroup1Ref, actionsGroup2Ref, helpDisabled, onComplete, ...game} = props
    const {
        unknownWordErrorShown,
        unknownWordErrorParam,
        closeUnknownWordError,
        repeatedWordErrorShown,
        repeatedWordErrorParam,
        closeRepeatedWordError,
        multipleWordsErrorShown,
        multipleWordsErrorParam,
        closeMultipleWordsError,
        successText,
        successTextShown,
        wordInfoShown,
        wordInfoParam,
        closeWordInfo,
        winConfirmShown,
        closeWinConfirm,
        boards,
        board,
        chars,
        primaryHintedChars,
        secondaryHintedChars,
        hintsAmount,
        selectCell,
        selectChar,
        refreshChars,
        careerWords,
        breakfastWords,
        clearChar,
        completeBoard,
        completeWord,
        primaryHintChars,
    } = game
    const [trainingShown, setTrainingShown] = useState(false)

    function handleComplete() {
        const events = {
            1: 'prize1',
            2: 'prize2',
            3: 'prize3',
            4: 'prize4',
            5: 'prize5',
        }

        reachMetrikaGoal(events[boards.length])
        onComplete()
    }

    function handleContinue() {
        const events = {
            1: 'resume1',
            2: 'resume2',
            3: 'resume3',
            4: 'resume4',
            5: 'resume5',
        }

        reachMetrikaGoal(events[boards.length])
        closeWinConfirm()
    }

    return (
        <SwitchTransition mode='out-in'>
            <CSSTransition key={trainingShown} timeout={TRAINING_ANIMATION_DURATION} classNames={TRAINING_ANIMATION_NAME}>
                {trainingShown ? (
                    <GameTrainingContent className={cn(styles.training, className)} onComplete={() => setTrainingShown(false)} />
                ) : (
                    <div className={cn(styles.wrapper, className)}>
                        <div className={styles.header}>
                            <Button ref={hintsRef}  className={styles.hintsButton} width={56} height={30} onClick={primaryHintChars}>
                                <Image className={styles.hintsImage} src={Lamp} />
                                <Text className={styles.hintsText} size={18} weight={400} color="#FFFFFF">{hintsAmount}</Text>
                            </Button>
                            <Image className={styles.logo} src={Logo}/>
                            <Button ref={helpRef} className={styles.helpButton} disabled={helpDisabled} width={31} height={31} onClick={() => setTrainingShown(true)}>
                                <Text size={20} weight={400}>?</Text>
                            </Button>
                        </div>
                        <div className={styles.subHeader}>
                            <Text size={18} weight={500} wrap="nowrap">
                                Поле №{boards.length}
                            </Text>
                        </div>
                        <div className={styles.progresses}>
                            <BoardProgress
                                className={styles.progress}
                                name="карьера"
                                max={MAX_CAREER_WORDS}
                                required={REQUIRED_CAREER_WORDS}
                                current={careerWords.length}
                            />
                            <BoardProgress
                                className={styles.progress}
                                name="завтрак"
                                max={MAX_BREAKFAST_WORDS}
                                required={REQUIRED_BREAKFAST_WORDS}
                                current={breakfastWords.length}
                            />
                        </div>
                        <div className={styles.successTextWrapper}>
                            <CSSTransition
                                in={successTextShown}
                                timeout={SUCCESS_TEXT_ANIMATION_DURATION}
                                classNames={SUCCESS_TEXT_ANIMATION_NAME}
                                mountOnEnter
                                unmountOnExit
                            >
                                <Text className={styles.successText} size={20} weight={500} wrap="nowrap">
                                    {successText?.text}
                                </Text>
                            </CSSTransition>
                        </div>
                        <Board ref={boardRef} className={styles.board} board={board} onSelectedChange={selectCell}/>
                        <BoardChars ref={charsRef} className={styles.chars} chars={chars} primaryHintedChars={primaryHintedChars} secondaryHintedChars={secondaryHintedChars} onSelect={selectChar}
                                    onRefresh={refreshChars}/>
                        <div className={styles.actions}>
                            <div ref={actionsGroup1Ref} className={styles.actionsGroup}>
                                <CompleteBoardButton className={styles.action} onClick={completeBoard}/>
                            </div>
                            <div ref={actionsGroup2Ref} className={styles.actionsGroup}>
                                <CompleteWordButton className={styles.action} onClick={completeWord}/>
                                <ClearCharButton className={styles.action} onClick={clearChar}/>
                            </div>
                        </div>
                        <UnknownWordErrorModal
                            opened={unknownWordErrorShown}
                            word={unknownWordErrorParam}
                            onClose={closeUnknownWordError}
                        />
                        <RepeatedWordErrorModal
                            opened={repeatedWordErrorShown}
                            word={repeatedWordErrorParam}
                            onClose={closeRepeatedWordError}
                        />
                        <MultipleWordsErrorModal
                            opened={multipleWordsErrorShown}
                            words={multipleWordsErrorParam}
                            onClose={closeMultipleWordsError}
                        />
                        <WordInfoModal
                            opened={wordInfoShown}
                            word={wordInfoParam}
                            onClose={closeWordInfo}
                        />
                        <WinConfirmModal
                            opened={winConfirmShown}
                            onContinue={handleContinue}
                            onFinish={handleComplete}
                        />
                    </div>
                )}
            </CSSTransition>
        </SwitchTransition>
    )
}