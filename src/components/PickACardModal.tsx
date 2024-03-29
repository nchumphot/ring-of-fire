import { useEffect, useState } from "react";
import { ICard } from "../interfaces/ICard";
import { IPlayer } from "../interfaces/IPlayer";
import { ITeam } from "../interfaces/ITeam";
import { cardDefinitions } from "../utils/cardDefinitions";
import { cardImageURL } from "../utils/cardImageURL";
import { displaySuit } from "../utils/displaySuit";
import { AddARule } from "./AddARule";
import { PickAMate } from "./PickAMate";

export function PickACardModal(props: {
  card: ICard;
  cards: ICard[];
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  players: IPlayer[];
  currentPlayer: IPlayer;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<IPlayer>>;
  setThumbMaster: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  setHeavenMaster: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  setQuestionMaster: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  setRules: React.Dispatch<React.SetStateAction<string[]>>;
  teams: ITeam[];
  setTeams: React.Dispatch<React.SetStateAction<ITeam[]>>;
  chanceOfBreaking: number;
}): JSX.Element {
  const random = Math.random();
  const [turnCompleted, setTurnCompleted] = useState<boolean>(false);
  useEffect(() => {
    switch (props.card.rank) {
      case "8":
        if (props.teams[0].members.length === props.players.length) {
          setTurnCompleted(true);
        } else {
          setTurnCompleted(false);
        }
        break;
      case "J":
        setTurnCompleted(false);
        break;
      default:
        setTurnCompleted(true);
        break;
    }
  }, [props.card, props.players.length, props.teams]);
  return (
    <div
      className="modal"
      id="pick-a-card-modal"
      data-keyboard="false"
      data-backdrop="static"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title text-success" id="exampleModalLabel">
              {`${props.card.rank} of ${props.card.suit} ${displaySuit(
                props.card
              )}`}
            </h1>
          </div>
          <div className="modal-body">
            {random * 100 <= props.chanceOfBreaking && (
              <h2 className="text-danger">You broke the ring!</h2>
            )}
            <img
              alt={"Card"}
              src={cardImageURL(props.card)}
              className="mx-auto d-block"
            />
            <br />
            {cardDefinitions(props.card)}

            {props.card.rank === "J" && (
              <AddARule
                card={props.card}
                setRules={props.setRules}
                setTurnCompleted={setTurnCompleted}
              />
            )}
            {props.card.rank === "8" && (
              <PickAMate
                players={props.players}
                teams={props.teams}
                currentPlayer={props.currentPlayer}
                setTeams={props.setTeams}
                setTurnCompleted={setTurnCompleted}
              />
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              disabled={!turnCompleted}
              data-dismiss="modal"
              onClick={() => {
                const updatedCards = props.cards.filter(
                  (card, idx) => idx !== 0
                );
                props.setCards(updatedCards);
                const idx = props.players.indexOf(props.currentPlayer);
                const newIdx = idx + 1 < props.players.length ? idx + 1 : 0;
                props.setCurrentPlayer(props.players[newIdx]);
              }}
            >
              Next turn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
