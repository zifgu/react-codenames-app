import React from "react";
import {CardGrid} from "./CardGrid";
import {CardData} from "./OperativeView";
import {SpymasterInput} from "./SpymasterInput";

interface SpymasterViewProps {
    cards: CardData[],
    revealedCards: boolean[],

    onSubmitClue: (clueWord: string, clueNumber: number) => void,
}

interface SpymasterViewState {
}

export class SpymasterView extends React.Component<SpymasterViewProps, SpymasterViewState> {
    render() {
        return (
            <>
                <SpymasterInput
                    onSubmitClue={this.props.onSubmitClue}
                />
                <CardGrid
                    cards={ this.props.cards }
                    revealedCards={ Array(25).fill(true) }
                    fadedCards={ this.props.revealedCards }
                />
            </>
        );
    }
}