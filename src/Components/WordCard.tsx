import React from "react";
import {CardData, CardType} from "./OperativeView";
import {Button, Card} from "react-bootstrap";
import {Color} from "react-bootstrap/types";

interface WordCardProps {
    index: number,
    cardData: CardData,
    revealed: boolean,
    faded: boolean,
    onClick?: (i: number) => void,
}

export function WordCard(props: WordCardProps) {
    const bgString = props.revealed ? getCardBgString(props.cardData.type) : undefined;
    const textColorString = props.revealed ? getTextColor(props.cardData.type): undefined;
    const opacityString = props.faded ? "opacity-50" : "";

    const buttonVisibility = props.revealed ? "hidden" : "visible";

    // TODO: set max width better
    return (
        <Card
            bg={bgString}
            text={textColorString}
            className={`text-center ${opacityString}`}
        >
            <Card.Body>
                <Card.Title>
                    {props.cardData.codename.toUpperCase()}
                </Card.Title>
                <Button
                    variant="light"
                    style={{visibility: buttonVisibility}}
                    onClick={() => {
                        if (props.onClick) props.onClick(props.index)
                    }}
                >
                    Guess
                </Button>
            </Card.Body>
        </Card>
    );
}

function getCardBgString(cardType: CardType): string {
    switch (cardType) {
        case CardType.RED: {
            return "danger";
        }
        case CardType.BLUE: {
            return "primary";
        }
        case CardType.BYSTANDER: {
            return "light";
        }
        case CardType.ASSASSIN: {
            return "dark";
        }
    }
}

function getTextColor(cardType: CardType): Color {
    switch (cardType) {
        case CardType.RED: {
            return "white";
        }
        case CardType.BLUE: {
            return "white";
        }
        case CardType.BYSTANDER: {
            return "dark";
        }
        case CardType.ASSASSIN: {
            return "white";
        }
    }
}