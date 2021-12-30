import React from "react";
import Container from "react-bootstrap/Container";
import {Button, Col, Row} from "react-bootstrap";

interface HintHeaderProps {
    hintWord: string,
    hintNumber: number,
    guessesLeft: number,

    onEndTurn: () => void,
}

export function HintHeader(props: HintHeaderProps){
    const hasMadeGuess = props.guessesLeft <= props.hintNumber;

    return (
        <header className="py-3 mb-3 border-bottom">
            <Container>
                <Row>
                    <Col lg={6} className="text-center">
                        <span className="text-light fs-4">
                            Hint: {props.hintWord.toUpperCase()} ({props.hintNumber})
                        </span>
                    </Col>
                    <Col lg={4}>
                        <span className="text-light fs-4">
                            Guesses left: {props.guessesLeft}
                        </span>
                    </Col>
                    <Col className="text-end">
                        <Button variant="outline-light"
                                onClick={() => props.onEndTurn()}
                                disabled={!hasMadeGuess}
                        >
                            <span className="fs-4">End turn ⇨</span>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}