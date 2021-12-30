import React from "react";
import {CardGrid} from "./CardGrid";
import {HintHeader} from "./HintHeader";

export enum CardType {
    RED,
    BLUE,
    BYSTANDER,
    ASSASSIN,
}

export interface CardData {
    type: CardType,
    codename: string,
}

interface OperativeViewProps {
    cards: CardData[],
    revealedCards: boolean[],

    currentTeam: CardType.RED | CardType.BLUE,
    currentHintWord: string,
    currentHintNumber: number,

    onRevealCard: (i: number) => void,
    onEndTurn: () => void,
}

interface OperativeViewState {
    guessesLeftInTurn: number,
}

export class OperativeView extends React.Component<OperativeViewProps, OperativeViewState>{
    constructor(props: OperativeViewProps) {
        super(props);

        this.state = {
            guessesLeftInTurn: props.currentHintNumber + 1,
        };
    }

    guessCard(i: number) {
        if (this.props.revealedCards[i] || this.state.guessesLeftInTurn <= 0) {
            return;
        }

        if (this.props.cards[i].type !== this.props.currentTeam) {
            this.setState({
                guessesLeftInTurn: 0
            });
        } else {
            this.setState({
                guessesLeftInTurn: this.state.guessesLeftInTurn - 1
            });
        }

        this.props.onRevealCard(i);
    }

    render() {
        // TODO: use different text if guesses left > 0 or guesses left = 0
        return (
            <>
                <HintHeader
                    hintWord={ this.props.currentHintWord }
                    hintNumber={ this.props.currentHintNumber }
                    guessesLeft={ this.state.guessesLeftInTurn }

                    onEndTurn={() => this.props.onEndTurn()}
                />
                <CardGrid
                    cards={ this.props.cards }
                    revealedCards={ this.props.revealedCards }
                    fadedCards={ Array(25).fill(false) }
                    onCardClicked={(i) => {
                        this.guessCard(i);
                    }}
                />
            </>
        );
    }
}