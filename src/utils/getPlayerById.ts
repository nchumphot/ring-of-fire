import { IPlayer } from "../interfaces/IPlayer";

export function getPlayerById(id: number, players: IPlayer[]): IPlayer {
  return players.filter((player) => player.id === id)[0];
}
