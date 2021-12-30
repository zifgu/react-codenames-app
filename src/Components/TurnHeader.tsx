import {CardType} from "./OperativeView";
import {Col, Container, Row} from "react-bootstrap";

interface TurnHeaderProps {
    currentTeam: CardType.RED | CardType.BLUE,
    isSpymasterTurn: boolean,

    redCards: number,
    blueCards: number,
}

export function TurnHeader(props: TurnHeaderProps) {
    let textColorStyle;
    let teamText;

    if (props.currentTeam === CardType.RED) {
        textColorStyle = "text-danger";
        teamText = "RED";
    } else {
        textColorStyle = "text-primary";
        teamText = "BLUE";
    }

    const turnText = props.isSpymasterTurn ? "SPYMASTER" : "OPERATIVES";

    return (
        <header className={`text-white`}>
            <Container>
                <Row className="py-3 align-items-center justify-content-center">
                    <Col lg={6} className="text-center">
                        <span className={`fs-3 ${textColorStyle}`}>
                            {teamText}: {turnText}
                        </span>
                    </Col>
                    <Col lg={3} className="fs-4">
                        {props.redCards} <span className="text-danger"> / 9</span>
                    </Col>
                    <Col lg={3} className="fs-4">
                        {props.blueCards} <span className="text-primary"> / 8</span>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}