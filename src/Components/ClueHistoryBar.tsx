import {Button, Col, Container, Offcanvas, Row} from "react-bootstrap";
import React, {useState} from "react";
import {Clue} from "./Game";
import {CluesList} from "./CluesList";

interface ClueHistoryBarProps {
    clues: Clue[],
}

export function ClueHistoryBar(props: ClueHistoryBarProps) {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const toggleClose = () => setOpen(!open);

    return (
        <>
            <Offcanvas
                show={open}
                className="h-100 bg-dark text-white"
            >
                <Offcanvas.Header>
                    <Offcanvas.Title as="span" className="fs-3">PAST CLUES</Offcanvas.Title>
                    <button type="button"
                            className="btn-close btn-close-white"
                            aria-label="Close"
                            onClick={handleClose}
                    />
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CluesList clues={props.clues}/>
                </Offcanvas.Body>
            </Offcanvas>

            <footer className="footer py-3 px-5">
                <Container fluid>
                    <Row>
                        <Col className="text-end">
                            <Button variant="outline-light"
                                    onClick={toggleClose}>
                                <span className="fs-4">{ open ? "Hide clues" : "Show clues" }</span>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>

    );
}