import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export function Start(props: {}) {
    return (
        <Container fluid className="vh-100 d-flex flex-column justify-content-center">
            <Row className="text-center text-white">
                <Col>
                    <h1 className="fs-1 text-uppercase">
                        Codenames
                    </h1>
                    <p className="fw-light">
                        <i>A card game for 4-8 players, about word association and revealing secret identities.</i>
                    </p>
                    <p>
                        <a href="https://czechgames.com/en/codenames/" className="link-secondary">Official website</a>
                    </p>

                    <div className="fs-5 mt-5">
                        <p>Starting cards:</p>
                        <span className="text-danger">RED</span> – 9 words<br/>
                        <span className="text-primary">BLUE</span> – 8 words
                    </div>

                    <Button variant="outline-light" className="mt-5">
                        <Link to={"/game"} className="text-decoration-none text-reset text-uppercase fs-4">
                            Start game
                        </Link>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}