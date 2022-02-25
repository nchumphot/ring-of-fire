import { IPlayer } from "../interfaces/IPlayer";
import { ITeam } from "../interfaces/ITeam";

export function doesPlayerHaveATeam(
  player: IPlayer,
  teams: ITeam[]
): [boolean, number | null] {
  let haveATeam = false;
  let teamNo = null;
  for (const team of teams) {
    if (team.members.some((p) => p.id === player.id)) {
      haveATeam = true;
      teamNo = team.id;
    }
  }
  return [haveATeam, teamNo];
}
