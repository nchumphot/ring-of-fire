import { useEffect, useState } from "react";
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
  const [chanceOfBreaking, setChanceOfBreaking] = useState<number>(0);

  useEffect(() => {
    const k = (2 * Math.log(2)) / (51 * 51);
    const A = 2;
    const N = props.cards.length;
    setChanceOfBreaking(
      (A * Math.exp(-k * (51 * (N - 1) - (N - 1) ** 2 / 2)) - 1) * 100
    );
  }, [props.cards]);

  if (props.cards.length !== 0) {
    return (
      <div className="m-2 p-2">
        <h1>🔥 Ring of Fire 🔥</h1>
        <hr />
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-warning btn-lg m-1"
            onClick={() => {
              props.setCards(shuffleCards(props.cards));
              alert("Cards have been shuffled.");
            }}
          >
            ♻️ Shuffle cards
          </button>
          <button
            type="button"
            className="btn btn-success btn-lg m-1"
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
            }}
          >
            🃏 Pick a card
          </button>
        </div>

        <PickACardModal
          card={props.cards[0]}
          cards={props.cards}
          setCards={props.setCards}
          players={props.players}
          {...{
            currentPlayer,
            setCurrentPlayer,
            setThumbMaster,
            setHeavenMaster,
            setQuestionMaster,
            setRules,
            setTeams,
            teams,
            chanceOfBreaking,
          }}
        />
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
            teams,
            chanceOfBreaking,
          }}
        />
        <hr />
      </div>
    );
  } else {
    return <h1>Game over.</h1>;
  }
}
