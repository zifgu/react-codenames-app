import {Clue} from "./Game";
import {CardType} from "./OperativeView";
import {ListGroup} from "react-bootstrap";

interface CluesListProps {
    clues: Clue[],
}

export function CluesList(props: CluesListProps) {
    const listItems = props.clues
        .map((clue) => {
            return (
                <ClueListItem clue={clue} key={clue.word}/>
            );
        });

    return (
        <ListGroup>
            {listItems}
        </ListGroup>
    );
}

function ClueListItem(props: {clue: Clue}) {
    const textColorStyle = props.clue.team === CardType.RED ? "text-danger" : "text-primary";
    const teamString =  props.clue.team === CardType.RED ? "RED" : "BLUE";

    return (
        <ListGroup.Item variant="dark" className="fs-5">
            <span className={`${textColorStyle}`}>
                {teamString}
            </span>
            &nbsp;– {props.clue.word.toUpperCase()} ({props.clue.count})
        </ListGroup.Item>
    );
}