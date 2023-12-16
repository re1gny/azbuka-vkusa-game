import {Button} from "../Button";
import {Text} from "../Text";

export function CompleteBoardButton(props) {
    const {className, onClick} = props

    return (
        <Button className={className} width={113} height={35} color="#0B4F38" onClick={onClick}>
            <Text as="span" size={18} weight={400} color="#FFFFFF">сдать поле</Text>
        </Button>
    )
}