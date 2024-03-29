import {CSSTransition, SwitchTransition} from "react-transition-group";
import {useState} from "react";
import cn from "classnames";
import { useIMask } from 'react-imask';
import Check from "../../../../assets/images/check.svg";
import {Text} from "../../../Text";
import {Button} from "../../../Button";
import {Input} from "../../../Input";
import {Checkbox} from "../../../Checkbox";
import {Image} from "../../../Image";
import {goToVacancies} from "../../../../utils/goToVacancies";
import {reachMetrikaGoal} from "../../../../utils/reachMetrikaGoal";
import styles from "./WinContent.module.scss";

const SWITCH_ANIMATION_DURATION = parseInt(styles.switchAnimationDuration)
const SWITCH_ANIMATION_NAME = styles.switchAnimationName

const PHONE_MASK_OPTIONS = {
    mask: '+{7} (000) 000-00-00',
}

export function WinContent(props) {
    const {className} = props
    const [isAgreed, setIsAgreed] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const {
        ref: phoneInputRef,
        maskRef,
        value: phone,
        setValue: setPhone,
    } = useIMask(PHONE_MASK_OPTIONS);

    function handleSendPhone(e) {
        e.preventDefault()

        if (phone && maskRef.current?.masked?.isComplete && isAgreed) {
            setIsSuccess(true)
            reachMetrikaGoal('number')

            const url = `https://script.google.com/macros/s/AKfycbzvm75K7Zj-3AO4M1Z0cRExiENQtY01TfgGJ56aH_TicuVCT-VmGEZJFLDdU6aGd8Na/exec?phone=${phone}`
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.send();
        }
    }

    function handleFindJob() {
        reachMetrikaGoal(isSuccess ? 'work1' : 'work2')
        goToVacancies()
    }

    return (
        <div className={cn(styles.wrapper, className)}>
            <Text size={20} weight={500}>Как бывает трудно {'\n'}найти нужные слова.{'\n'}Но&nbsp;у&nbsp;тебя получилось!</Text>
            <Text size={20}>Комбо-бизнес-завтрак и&nbsp;идеальная работа тебе обеспечены.</Text>
            <form className={styles.phoneWrapper} onSubmit={handleSendPhone}>
                <Text size={20}>Оставляй номер телефона для участия в <Text as="span" size={20} weight={500}>розыгрыше кофе</Text>. {'\n'}Результаты опубликуем в ТГ-канале «Азбука вкуса Карьера»:</Text>
                <div className={styles.fields}>
                    <Input ref={phoneInputRef} className={styles.phoneInput} width={286} type="tel"
                           placeholder="+7 (999) 123-45-67" disabled={isSuccess} value={phone} onChange={setPhone}/>
                    <Checkbox className={styles.phoneCheckbox} disabled={isSuccess} value={isAgreed}
                              onChange={setIsAgreed}>
                        <Text className={styles.phoneCheckboxText} size={14} align="left">
                            Я&nbsp;согласен(а) на&nbsp;<a className={styles.phoneCheckboxLink}
                                                          href="https://fut.ru/personal_data_policy/" target="_blank">обработку
                            персональных данных</a> и&nbsp;получение информационных сообщений
                        </Text>
                    </Checkbox>
                </div>
                <Button className={styles.sendPhoneButton} width={284} height={44} type="submit" disabled={isSuccess}>
                    <SwitchTransition mode='out-in'>
                        <CSSTransition key={isSuccess} timeout={SWITCH_ANIMATION_DURATION}
                                       classNames={SWITCH_ANIMATION_NAME}>
                            {isSuccess ? (
                                <Image className={styles.sendPhoneButtonContent} src={Check}/>
                            ) : (
                                <Text className={styles.sendPhoneButtonContent} as="span" size={20} weight={500}
                                      color="#FFFFFF">Отправить</Text>
                            )}
                        </CSSTransition>
                    </SwitchTransition>
                </Button>
            </form>
            <div className={styles.findJobWrapper}>
                <Text size={20}>А&nbsp;чтобы найти своё место в&nbsp;нашей команде, переходи на&nbsp;<Text as="span" size={20} weight={500}>карьерный сайт</Text>:</Text>
                <Button className={styles.findJobButton} width={284} height={44} color="#0B4F38" onClick={handleFindJob}>
                    <Text as="span" size={20} weight={500} color="#FFFFFF">Найти работу</Text>
                </Button>
            </div>
        </div>
    )
}