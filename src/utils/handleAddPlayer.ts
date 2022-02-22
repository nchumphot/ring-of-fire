import { IPlayer } from "../interfaces/IPlayer";

export function handleAddPlayer(
  name: string,
  setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>
): void {
  setPlayers((prev) => [...prev, { id: prev.length + 1, name: name }]);
}
