import { IPlayer } from "../interfaces/IPlayer";

export function PlayerCard(props: {
  player: IPlayer;
  players: IPlayer[];
  setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>;
}): JSX.Element {
  return (
    <div className="border border-success m-2 p-2">
      <div className="container-fluid">
        <div className="row">
          <div className="col-10">
            <h3>{props.player.name}</h3>
          </div>
          <div className="col">
            <button type="button" className="btn btn-warning btn-sm me-2">
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => {
                const updated = props.players.filter(
                  (p) => p.id !== props.player.id
                );
                props.setPlayers(updated);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
