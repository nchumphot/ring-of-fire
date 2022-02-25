import { IPlayer } from "../interfaces/IPlayer";
import { ITeam } from "../interfaces/ITeam";
import { getPlayerById } from "./getPlayerById";

export function createNewTeam(
  currentPlayer: IPlayer,
  chosenMateId: number,
  allPlayers: IPlayer[],
  setTeams: React.Dispatch<React.SetStateAction<ITeam[]>>
): void {
  setTeams((prev) => [
    ...prev,
    {
      id: prev.length + 1,
      members: [currentPlayer, getPlayerById(chosenMateId, allPlayers)],
    },
  ]);
}
