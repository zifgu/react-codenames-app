import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";

interface FooterProps {
    buttonText: string,
    onButtonPressed: () => void,
}

export function Footer(props: FooterProps) {
    return (
        <footer className="footer py-3">
            <Container>
                <Row>
                    <Col className="text-start">
                        <Button variant="outline-light"
                                onClick={() => props.onButtonPressed()}>
                            <span className="fs-4">{ props.buttonText }</span>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}