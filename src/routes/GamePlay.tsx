import { useState } from "react";
import { Dashboard } from "../components/Dashboard";
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

  // states to be passed to dashboard
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [rules, setRules] = useState<string[]>([]);
  const [questionMaster, setQuestionMaster] = useState<IPlayer[]>([]);
  const [heavenMaster, setHeavenMaster] = useState<IPlayer[]>([]);
  const [thumbMaster, setThumbMaster] = useState<IPlayer[]>([]);

  if (props.cards.length !== 0) {
    return (
      <div>
        <h1>🔥 Ring of Fire 🔥</h1>
        <hr />
        <Dashboard
          cards={props.cards}
          {...{
            currentPlayer,
            rules,
            questionMaster,
            setQuestionMaster,
            heavenMaster,
            setHeavenMaster,
            thumbMaster,
            setThumbMaster,
          }}
        />
        <hr />
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
            if (props.cards[0].rank === "5") {
              setThumbMaster([currentPlayer]);
            } else if (props.cards[0].rank === "7") {
              setHeavenMaster([currentPlayer]);
            } else if (props.cards[0].rank === "Q") {
              setQuestionMaster([currentPlayer]);
            }
            const updatedCards = props.cards.filter((card, idx) => idx !== 0);
            props.setCards(updatedCards);
          }}
        >
          🃏 Pick a card
        </button>
        <PickACardModal
          card={props.cards[0]}
          players={props.players}
          {...{
            currentPlayer,
            setCurrentPlayer,
            setThumbMaster,
            setHeavenMaster,
            setQuestionMaster,
          }}
        />
      </div>
    );
  } else {
    return <h1>Game over.</h1>;
  }
}
