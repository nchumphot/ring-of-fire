import { useState } from "react";
import { PickACardModal } from "../components/PickACardModal";
import { ICard } from "../interfaces/ICard";
import { IPlayer } from "../interfaces/IPlayer";
import { ITeam } from "../interfaces/ITeam";
import { shuffleCards } from "../utils/shuffleCards";

export function GamePlay(props: {
  players: IPlayer[];
  cards: ICard[];
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
}): JSX.Element {
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(props.players[0]);
  const [teams, setTeams] = useState<ITeam[]>([]);
  if (props.cards.length !== 0) {
    return (
      <div>
        <h1>🔥 Ring of Fire 🔥</h1>
        <h2>Current Player: {currentPlayer.name}</h2>
        <hr />
        <h3>There are {props.cards.length} cards left.</h3>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => {
            props.setCards(shuffleCards(props.cards));
            alert("Cards have been shuffled.");
          }}
        >
          ♻️ Shuffle cards
        </button>
        <button
          type="button"
          className="btn btn-success"
          data-toggle="modal"
          data-target="#pick-a-card-modal"
          onClick={() => {
            const updatedCards = props.cards.filter((card, idx) => idx !== 0);
            props.setCards(updatedCards);
          }}
        >
          🃏 Pick a card
        </button>
        <PickACardModal
          card={props.cards[0]}
          players={props.players}
          {...{ currentPlayer, setCurrentPlayer }}
        />
      </div>
    );
  } else {
    return <h1>Game over.</h1>;
  }
}
