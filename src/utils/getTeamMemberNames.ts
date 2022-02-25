import { ITeam } from "../interfaces/ITeam";

export function getTeamMemberNames(team: ITeam): string {
  let names = "";
  team.members.map((member) => (names += member.name + ", "));
  return names.substring(0, names.length - 2);
}
