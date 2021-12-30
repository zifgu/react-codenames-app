import {Button, Modal} from "react-bootstrap";
import {CardType} from "./OperativeView";
import {Link} from "react-router-dom";

interface GameWonModalProps {
    winningTeam: CardType.RED | CardType.BLUE | null,
    redScore: number,
    blueScore: number,
}

export function GameWonModal(props: GameWonModalProps) {
    let show = false;

    let message = "";
    if (props.winningTeam === CardType.RED) {
        show = true;
        message = "red team";
    } else if (props.winningTeam === CardType.BLUE) {
        show = true;
        message = "blue team";
    }

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>
                    Winner: {message}!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Red agents found – {props.redScore}</p>
                <p>Blue agents found – {props.blueScore}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">
                    <Link to={"/"} className="text-decoration-none text-reset text-uppercase">
                        End game
                    </Link>
                </Button>
            </Modal.Footer>
        </Modal>
    );
}