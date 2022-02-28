import { useEffect, useState } from "react";
import { IPlayer } from "../interfaces/IPlayer";

export function EditPlayerModal(props: {
  player: IPlayer;
  players: IPlayer[];
  setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>;
}): JSX.Element {
  const [typedName, setTypedName] = useState<string>("");
  useEffect(() => setTypedName(props.player.name), [props.player]);
  return (
    <div
      className="modal fade"
      id={`edit-player-${props.player.id}`}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit player
            </h5>
          </div>
          <div className="modal-body">
            <input
              type="text"
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              data-dismiss="modal"
              onClick={() => {
                const updated = props.players.map((p) => {
                  if (p.id === props.player.id) {
                    return { ...p, name: typedName };
                  } else {
                    return p;
                  }
                });
                props.setPlayers(updated);
                setTypedName("");
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
