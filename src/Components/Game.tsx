import React from "react";
import {CardData, CardType, OperativeView} from "./OperativeView";
import {SpymasterView} from "./SpymasterView";
import {TurnHeader} from "./TurnHeader";
import {codeNameWords} from "./Words";
import {GameWonModal} from "./GameWonModal";
import {ClueHistoryBar} from "./ClueHistoryBar";

interface GameProps {

}

export interface Clue {
    word: string,
    count: number,
    team: CardType.RED | CardType.BLUE,
}

interface GameState {
    cards: CardData[],
    revealedCards: boolean[],

    clueHistory: Clue[],

    isCurrentTeamRed: boolean,
    isSpymasterTurn: boolean,

    redWordsLeft: number,
    blueWordsLeft: number,

    winningTeam: CardType.RED | CardType.BLUE | null,
}

export class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);

        this.state = {
            cards: this.generateCards(),
            revealedCards: Array(25).fill(false),
            clueHistory: [],

            isCurrentTeamRed: true,
            isSpymasterTurn: true,

            redWordsLeft: 9,
            blueWordsLeft: 8,

            winningTeam: null,
        };
    }

    generateCards(): CardData[] {
        const cards: CardData[] = []
        const codeNames: string[] = randomCodeNames();
        const cardTypes: CardType[] = randomCardTypes();

        for (let i = 0; i < 25; i++) {
            cards.push({
                type: cardTypes[i],
                codename: codeNames[i],
            });
        }

        return cards;
    }

    getCurrentTeam(): CardType.RED | CardType.BLUE {
        return this.state.isCurrentTeamRed ? CardType.RED : CardType.BLUE
    }

    handleRevealCard(i: number) {
        const newVisibilities = this.state.revealedCards.slice();
        newVisibilities[i] = true;

        this.setState({ revealedCards: newVisibilities });

        this.determineWinner(i);
    }

    determineWinner(guessedIndex: number) {
        let remainingRed = this.state.redWordsLeft;
        let remainingBlue = this.state.blueWordsLeft;

        if (this.state.cards[guessedIndex].type === CardType.RED) {
            remainingRed--;
        } else if (this.state.cards[guessedIndex].type === CardType.BLUE) {
            remainingBlue--;
        }

        this.setState({
            redWordsLeft: remainingRed,
            blueWordsLeft: remainingBlue,
        });

        if (remainingRed <= 0) {
            this.setState({ winningTeam: CardType.RED });
        } else if (remainingBlue <= 0) {
            this.setState({ winningTeam: CardType.BLUE });
        } else if (this.state.cards[guessedIndex].type === CardType.ASSASSIN) {
            const teamWon = this.state.isCurrentTeamRed ? CardType.BLUE : CardType.RED;

            this.setState({ winningTeam: teamWon })
        }
    }

    handleSpymasterSubmitClue(clueWord: string, clueNumber: number) {
        console.log(this.state.clueHistory);
        const newCluesList = this.state.clueHistory.concat({
            word: clueWord,
            count: clueNumber,
            team: this.getCurrentTeam(),
        });

        this.setState({
            isSpymasterTurn: false,
            clueHistory: newCluesList,
        });
    }

    handleEndTurn() {
        this.setState({
            isCurrentTeamRed: !this.state.isCurrentTeamRed,
            isSpymasterTurn: true,
        });
    }

    render() {
        let currentClueWord: string = "";
        let currentClueCount: number = 0;
        const lastClue = this.state.clueHistory.at(-1);
        if (lastClue) {
            currentClueWord = lastClue.word;
            currentClueCount = lastClue.count;
        }

        const view = this.state.isSpymasterTurn ? (
            <SpymasterView
                cards={this.state.cards}
                revealedCards={this.state.revealedCards}

                onSubmitClue={(clueWord, clueNumber) => {
                    this.handleSpymasterSubmitClue(clueWord, clueNumber);
                }}
            />
        ) : (
            <OperativeView
                cards={this.state.cards}
                revealedCards={this.state.revealedCards}

                currentTeam={this.getCurrentTeam()}
                currentHintWord={currentClueWord}
                currentHintNumber={currentClueCount}

                onRevealCard={(i) => {
                    this.handleRevealCard(i);
                }}
                onEndTurn={() => {
                    this.handleEndTurn();
                }}
            />
        );

        return (
            <>
                <TurnHeader
                    currentTeam={this.getCurrentTeam()}
                    isSpymasterTurn={this.state.isSpymasterTurn}
                    redCards={ 9 - this.state.redWordsLeft }
                    blueCards={ 8 - this.state.blueWordsLeft }
                />
                {view}
                <ClueHistoryBar
                    clues={this.state.clueHistory}
                />
                <GameWonModal
                    winningTeam={ this.state.winningTeam }
                    redScore={ 9 - this.state.redWordsLeft }
                    blueScore={ 8 - this.state.blueWordsLeft }
                />
            </>

        );
    }
}

function getAllCodeNames(): string[] {
    return codeNameWords.split("\n");
}

function randomCodeNames(): string[] {
    // Source: https://github.com/Gullesnuffs/Codenames/blob/master/wordlist-eng.txt
    const allCodeNames = getAllCodeNames();

    return selectRandom(allCodeNames, 25);
}

function randomCardTypes(): CardType[] {
    const cardTypes: CardType[] = Array<CardType>(25);

    const indices = Array.from(Array(25).keys());
    shuffleArray(indices);

    for (let i = 0; i < 25; i++) {
        if (i < 9) {
            cardTypes[indices[i]] = CardType.RED;
        } else if (i < 17) {
            cardTypes[indices[i]] = CardType.BLUE;
        } else if (i < 24) {
            cardTypes[indices[i]] = CardType.BYSTANDER;
        } else {
            cardTypes[indices[i]] = CardType.ASSASSIN;
        }
    }

    return cardTypes
}

// Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Source:
// https://stackoverflow.com/questions/196017/unique-non-repeating-random-numbers-in-o1
// https://stackoverflow.com/questions/7158654/how-to-get-random-elements-from-an-array
function selectRandom(array: any[], count: number): any[] {
    const min = array.length - count;

    for (let i = array.length - 1; i > min; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array.slice(min);
}