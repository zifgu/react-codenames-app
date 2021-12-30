import React, {ChangeEvent} from "react";
import Container from "react-bootstrap/Container";
import {Button, Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";

interface SpymasterInputProps {
    onSubmitClue: (clueWord: string, clueNumber: number) => void,
}

interface SpymasterInputState {
    clueWord: string,
    clueNumber: number,
}

export class SpymasterInput extends React.Component<SpymasterInputProps, SpymasterInputState> {
    constructor(props: SpymasterInputProps) {
        super(props);

        this.state = {
            clueNumber: 1,
            clueWord: "",
        };
    }

    handleHintWordChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const inputWord = event.target.value;

        // Clues should only be one word, so no spaces
        if (!inputWord.includes(" ")) {
            this.setState({ clueWord: inputWord });
        }
    }

    handleHintNumberChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const inputNumber = Number(event.target.value);

        // Must match at least 1 card, and the highest number of cards per team is 9
        if (inputNumber >= 1 && inputNumber <= 9) {
            this.setState({ clueNumber: Number(event.target.value) });
        }
    }

    render() {
        return (
            <Container className="py-3 mb-3 border-bottom">
                <Row className="justify-content-center">
                    <Form.Label column lg="auto" className="fs-5 text-light" htmlFor="hintWord">
                        Think of a one-word clue:
                    </Form.Label>
                    <Col lg="auto">
                        <Form.Control
                            type="text"
                            className="bg-dark text-white"
                            id="hintWord"
                            size="lg"
                            autoComplete="off"
                            placeholder="Type here..."

                            value={this.state.clueWord}
                            onChange={(event) => {
                                this.handleHintWordChange(event);
                            }}
                        />
                    </Col>
                    <Form.Label column lg="auto" className="fs-5 text-light" htmlFor="hintNumber">
                        How many cards relate to your clue?
                    </Form.Label>
                    <Col lg="auto">
                        <Form.Control
                            type="number"
                            className="bg-dark text-white"
                            id="hintNumber"
                            size="lg"
                            min={1}
                            max={9}

                            value={this.state.clueNumber}
                            onChange={(event) => {
                                this.handleHintNumberChange(event);
                            }}
                        />
                    </Col>
                    <Col className="text-end">
                        <Button variant="outline-light"
                                disabled={this.state.clueWord.length <= 0}
                                onClick={() => {
                                    this.props.onSubmitClue(this.state.clueWord, this.state.clueNumber);
                                }}
                        >
                            <span className="fs-4">
                                Give clue ⇨
                            </span>
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}