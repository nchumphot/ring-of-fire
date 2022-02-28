import { useState } from "react";
import { PlayerCard } from "../components/PlayerCard";
import { StartGameModal } from "../components/StartGameModal";
import { IPlayer } from "../interfaces/IPlayer";
import { handleAddPlayer } from "../utils/handleAddPlayer";

export function HomePage(props: {
  players: IPlayer[];
  setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>;
}): JSX.Element {
  const [typedName, setTypedName] = useState<string>("");
  return (
    <div className="m-2 p-2">
      <h1>🔥 Welcome to Pacific Ring of Fire! 🔥</h1>
      <small>Created by Veta</small>
      {props.players.length < 3 ? (
        <p className="text-danger">Please add at least 3 players to start.</p>
      ) : (
        <div>
          <button
            type="button"
            className="btn btn-success btn-lg my-2"
            data-toggle="modal"
            data-target="#start-game-modal"
          >
            Start game
          </button>
          <StartGameModal />
        </div>
      )}
      <div>
        <input
          className="me-2"
          type="text"
          value={typedName}
          onChange={(e) => setTypedName(e.target.value)}
          placeholder="Enter player name here..."
        />
        <button
          className="btn btn-success btn-sm"
          type="button"
          onClick={() => {
            handleAddPlayer(typedName, props.setPlayers);
            setTypedName("");
          }}
        >
          Add player
        </button>
      </div>
      {props.players.length >= 1 && (
        <div>
          <h2>Current players:</h2>
          {props.players.map((p) => (
            <PlayerCard
              key={p.id}
              player={p}
              players={props.players}
              setPlayers={props.setPlayers}
            />
          ))}
        </div>
      )}
    </div>
  );
}
