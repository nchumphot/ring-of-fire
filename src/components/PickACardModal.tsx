import { useEffect } from "react";
import { ICard } from "../interfaces/ICard";
import { IPlayer } from "../interfaces/IPlayer";
import { cardDefinitions } from "../utils/cardDefinitions";

export function PickACardModal(props: {
  card: ICard;
  players: IPlayer[];
  currentPlayer: IPlayer;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<IPlayer>>;
  setThumbMaster: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  setHeavenMaster: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  setQuestionMaster: React.Dispatch<React.SetStateAction<IPlayer[]>>;
}): JSX.Element {
  return (
    <div
      className="modal fade"
      id="pick-a-card-modal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title text-success" id="exampleModalLabel">
              {`${props.card.rank} of ${props.card.suit}`}
            </h1>
          </div>
          <div className="modal-body">{cardDefinitions(props.card)}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              data-dismiss="modal"
              onClick={() => {
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
