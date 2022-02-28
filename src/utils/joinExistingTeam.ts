import { IPlayer } from "../interfaces/IPlayer";
import { ITeam } from "../interfaces/ITeam";

export function joinExistingTeam(
  playersToAdd: IPlayer[],
  chosenTeamId: number,
  teams: ITeam[],
  setTeams: React.Dispatch<React.SetStateAction<ITeam[]>>
): void {
  const newTeams = teams.map((team) => {
    if (team.id === chosenTeamId) {
      return { ...team, members: [...team.members, ...playersToAdd] };
    } else {
      return team;
    }
  });
  setTeams(newTeams);
}
