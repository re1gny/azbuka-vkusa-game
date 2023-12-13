import {useState} from "react";
import cn from "classnames";
import {Text} from "../../../Text";
import {Button} from "../../../Button";
import {Input} from "../../../Input";
import styles from "./WinContent.module.scss";

export function WinContent(props) {
    const {className} = props
    const [email, setEmail] = useState('')

    return (
        <div className={cn(styles.wrapper, className)}>
            <Text size={24} weight={500}>Как бывает трудно найти нужные слова. Но&nbsp;у&nbsp;тебя получилось!</Text>
            <Text className={styles.subTitle} size={20}>Комбо-бизнес-завтрак и&nbsp;идеальная работа тебе обеспечены.</Text>
            <div className={styles.emailWrapper}>
                <Text size={20}>Оставляй почту для&nbsp;участия&nbsp;<Text as="span" size={20} weight={500}>в&nbsp;розыгрыше призов от&nbsp;Азбуки Вкуса</Text> — результаты будут 1&nbsp;марта:</Text>
                <Input className={styles.emailInput} width={286} placeholder="Почта" value={email} onChange={setEmail}/>
                <Button className={styles.sendEmailButton} width={284} height={44}>
                    <Text as="span" size={20} weight={500} color="#FFFFFF">Отправить</Text>
                </Button>
            </div>
            <div className={styles.findJobWrapper}>
                <Text size={20}>А&nbsp;чтобы найти своё место в&nbsp;нашей команде, переходи на&nbsp;<Text as="span" size={20} weight={500}>карьерный сайт</Text>:</Text>
                <Button className={styles.findJobButton} width={284} height={44} color="#0B4F38">
                    <Text as="span" size={20} weight={500} color="#FFFFFF">Найти работу</Text>
                </Button>
            </div>
        </div>
    )
}