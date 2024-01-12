import ModalCross from '../../assets/images/modalCross.svg';
import Word1 from '../../assets/images/word1.png';
import Word2 from '../../assets/images/word2.png';
import Word3 from '../../assets/images/word3.png';
import Word4 from '../../assets/images/word4.png';
import Word5 from '../../assets/images/word5.png';
import Word6 from '../../assets/images/word6.png';
import Word7 from '../../assets/images/word7.png';
import Word8 from '../../assets/images/word8.png';
import Word9 from '../../assets/images/word9.png';
import Word10 from '../../assets/images/word10.png';
import {Text} from "../Text";
import {Modal} from "../Modal";
import {Image} from "../Image";
import styles from "./WordInfoModal.module.scss";

const WORDS_INFO = {
    'кофе': {
        text: <Text as="span">Клиенты «Азбуки вкуса» покупают <Text as="span" weight={500}>21&nbsp;000&nbsp;стаканчиков кофе в&nbsp;день</Text>. Этим можно заполнить 5&nbsp;детских бассейнов (и&nbsp;ещё&nbsp;останется…)</Text>,
        image: Word1,
        imageWidth: 193,
        imageHeight: 142,
    },
    'блин': {
        text: <Text as="span">Что&nbsp;тяжелее: 10&nbsp;слонов{'\n'}или&nbsp;<Text as="span" weight={500}>40&nbsp;тонн блинов</Text>? Одинаково!{'\n'}Кстати, именно столько блинов мы&nbsp;печём на&nbsp;Масленицу.</Text>,
        image: Word2,
        imageWidth: 231,
        imageHeight: 149,
    },
    'багет': {
        text: <Text as="span">Мы&nbsp;знаем, как&nbsp;наши покупатели{'\n'}любят багеты, поэтому <Text as="span" weight={500}>выпекаем{'\n'}2000–2500&nbsp;штук</Text> ежедневно.{'\n'}Если&nbsp;сложить их&nbsp;вместе, получится 1600&nbsp;метров&nbsp;— это&nbsp;как&nbsp;высота, на&nbsp;которой расположен курортный посёлок Домбай. Только представь:{'\n'} ты, горы и&nbsp;вкуснейшая выпечка!</Text>,
        image: Word3,
        imageWidth: 169,
        imageHeight: 131,
    },
    'команда': {
        text: <Text as="span">Мы&nbsp;за&nbsp;одно не&nbsp;только на&nbsp;работе, но&nbsp;и&nbsp;за&nbsp;её&nbsp;пределами: у&nbsp;нас&nbsp;есть{'\n'}<Text as="span" weight={500}>свои команды</Text> по&nbsp;футболу, хоккею, тэг-регби, бегу и&nbsp;йоге.</Text>,
        image: Word4,
        imageWidth: 221,
        imageHeight: 130,
    },
    'проект': {
        text: <Text as="span">Необычные коллаборации&nbsp;— это&nbsp;про&nbsp;нас! На&nbsp;«азбучных» полках есть&nbsp;даже <Text as="span" weight={500}>напиток от&nbsp;певца Стинга</Text>.</Text>,
        image: Word5,
        imageWidth: 171,
        imageHeight: 137,
    },
    'круассан': {
        text: <Text as="span">Пекари «Азбуки вкуса» любят удивлять покупателей нестандартной выпечкой. На&nbsp;наших полках есть&nbsp;сеты <Text as="span" weight={500}>кубических круассанов</Text> с&nbsp;солёной и&nbsp;сладкой начинкой&nbsp;— вкуснее чем&nbsp;в&nbsp;Париже!</Text>,
        image: Word6,
        imageWidth: 227,
        imageHeight: 138,
    },
    'отчет': {
        text: <Text as="span">Рекорды&nbsp;— это&nbsp;круто!{'\n'}Самый длинный чек&nbsp;в&nbsp;«Азбуке вкуса» содержал <Text as="span" weight={500}>228&nbsp;позиций</Text>. Это&nbsp;145&nbsp;см&nbsp;— прямо как&nbsp;размах крыльев{'\n'}розового фламинго.</Text>,
        image: Word7,
        imageWidth: 195,
        imageHeight: 134,
    },
    'прогресс': {
        text: <Text as="span">Мы&nbsp;за&nbsp;<Text as="span" weight={500}>технологичность</Text>: разрабатываем web-сервисы, корпоративные информационные системы и&nbsp;приложения. Одно из&nbsp;них&nbsp;— «АВ&nbsp;Пульс», благодаря которому наши сотрудники получают актуальные новости и&nbsp;автоматизируют рабочие процессы продуктового ритейла.</Text>,
        image: Word8,
        imageWidth: 155,
        imageHeight: 145,
    },
    'компания': {
        text: <Text as="span">У&nbsp;нас&nbsp;<Text as="span" weight={500}>более 12 000&nbsp;сотрудников</Text>, и&nbsp;вклад каждого важен. Ты&nbsp;знаешь, что&nbsp;название нашей компании придумал работник склада Александр&nbsp;Волков?</Text>,
        image: Word9,
        imageWidth: 194,
        imageHeight: 140,
    },
    'карьера': {
        text: <Text as="span">Карьера в&nbsp;«Азбуке вкуса» — это&nbsp;чувствовать, что&nbsp;тебя ценят. Наши сотрудники получают <Text as="span" weight={500}>бесплатные консультации</Text> психологов, нутрициологов и&nbsp;юристов.</Text>,
        image: Word10,
        imageWidth: 149,
        imageHeight: 124,
    },
}

export function WordInfoModal(props) {
    const {opened, word, onClose} = props

    return (
        <Modal opened={opened}>
            <div className={styles.wrapper}>
                <div className={styles.closeButtonWrapper} onClick={onClose}>
                    <Image className={styles.closeButton} src={ModalCross} />
                </div>
                <Text>{WORDS_INFO[word]?.text}</Text>
                <div className={styles.imageWrapper} style={{
                    '--width': `${WORDS_INFO[word]?.imageWidth}px`,
                    '--height': `${WORDS_INFO[word]?.imageHeight}px`,
                }}>
                    <Image className={styles.image} src={WORDS_INFO[word]?.image} />
                </div>
            </div>
        </Modal>
    )
}