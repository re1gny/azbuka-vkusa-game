import {CSSTransition, SwitchTransition} from "react-transition-group";
import {useState} from "react";
import cn from "classnames";
import Check from "../../../../assets/images/check.svg";
import {Text} from "../../../Text";
import {Button} from "../../../Button";
import {Input} from "../../../Input";
import {Checkbox} from "../../../Checkbox";
import {Image} from "../../../Image";
import styles from "./WinContent.module.scss";

const SWITCH_ANIMATION_DURATION = parseInt(styles.switchAnimationDuration)
const SWITCH_ANIMATION_NAME = styles.switchAnimationName

export function WinContent(props) {
    const {className} = props
    const [phone, setPhone] = useState('')
    const [isAgreed, setIsAgreed] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    function handleSendPhone(e) {
        e.preventDefault()

        if (phone && isAgreed) {
            setIsSuccess(true)

            const url = `https://script.google.com/macros/s/AKfycbzvm75K7Zj-3AO4M1Z0cRExiENQtY01TfgGJ56aH_TicuVCT-VmGEZJFLDdU6aGd8Na/exec?phone=${phone}`
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.send();
        }
    }

    return (
        <div className={cn(styles.wrapper, className)}>
            <Text size={20} weight={500}>Как бывает трудно найти нужные слова. Но&nbsp;у&nbsp;тебя получилось!</Text>
            <Text size={20}>Комбо-бизнес-завтрак и&nbsp;идеальная работа тебе обеспечены.</Text>
            <form className={styles.phoneWrapper} onSubmit={handleSendPhone}>
                <Text size={20}>Оставляй номер телефона для&nbsp;участия&nbsp;в&nbsp;<Text as="span" size={20} weight={500}>розыгрыше призов от&nbsp;«Азбуки вкуса»</Text> — результаты будут 1&nbsp;марта:</Text>
                <Input className={styles.phoneInput} width={286} type="tel" placeholder="+7 (999) 123-45-67" disabled={isSuccess} value={phone} onChange={setPhone}/>
                <Checkbox className={styles.phoneCheckbox} disabled={isSuccess} value={isAgreed} onChange={setIsAgreed}>
                    <Text className={styles.phoneCheckboxText} size={14} align="left">
                        Я&nbsp;согласен(а) на&nbsp;<a className={styles.phoneCheckboxLink} href="https://fut.ru/personal_data_policy/" target="_blank">обработку персональных данных</a> и&nbsp;получение информационных сообщений
                    </Text>
                </Checkbox>
                <Button className={styles.sendPhoneButton} width={284} height={44} type="submit" disabled={isSuccess}>
                    <SwitchTransition mode='out-in'>
                        <CSSTransition key={isSuccess} timeout={SWITCH_ANIMATION_DURATION} classNames={SWITCH_ANIMATION_NAME}>
                            {isSuccess ? (
                                <Image className={styles.sendPhoneButtonContent} src={Check} />
                            ) : (
                                <Text className={styles.sendPhoneButtonContent} as="span" size={20} weight={500} color="#FFFFFF">Отправить</Text>
                            )}
                        </CSSTransition>
                    </SwitchTransition>
                </Button>
            </form>
            <div className={styles.findJobWrapper}>
                <Text size={20}>А&nbsp;чтобы найти своё место в&nbsp;нашей команде, переходи на&nbsp;<Text as="span" size={20} weight={500}>карьерный сайт</Text>:</Text>
                <Button className={styles.findJobButton} width={284} height={44} color="#0B4F38">
                    <Text as="span" size={20} weight={500} color="#FFFFFF">Найти работу</Text>
                </Button>
            </div>
        </div>
    )
}