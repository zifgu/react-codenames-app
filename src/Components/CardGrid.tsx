import React from "react";
import {WordCard} from "./WordCard";
import {CardData} from "./OperativeView";
import {Col, Container, Row} from "react-bootstrap";

interface CardGridProps {
    cards: CardData[],
    revealedCards: boolean[],
    fadedCards: boolean[],
    onCardClicked?: (i: number) => void,
}

interface CardGridState {

}

export class CardGrid extends React.Component<CardGridProps, CardGridState> {
    render() {
        const cardCols = this.props.cards.map((cardData, index) => {
            return (
                <Col key={cardData.codename}>
                    <WordCard
                        cardData={ cardData }
                        revealed={ this.props.revealedCards[index] }
                        faded={ this.props.fadedCards[index] }
                        onClick={ this.props.onCardClicked }
                        index={ index }
                    />
                </Col>
            );
        })

        return (
            <Container className="d-flex">
                <Row className="row-cols-5 pt-3 g-2 justify-content-center">
                    {cardCols}
                </Row>
            </Container>
        );
    }
}