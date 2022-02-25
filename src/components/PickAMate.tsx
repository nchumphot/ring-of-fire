import { useState } from "react";
import { IPlayer } from "../interfaces/IPlayer";
import { ITeam } from "../interfaces/ITeam";
import { createNewTeam } from "../utils/createNewTeam";
import { doesPlayerHaveATeam } from "../utils/doesPlayerHaveATeam";
import { getTeamMemberNames } from "../utils/getTeamMemberNames";
import { joinExistingTeam } from "../utils/joinExistingTeam";

export function PickAMate(props: {
  currentPlayer: IPlayer;
  players: IPlayer[];
  teams: ITeam[];
  setTeams: React.Dispatch<React.SetStateAction<ITeam[]>>;
}): JSX.Element {
  const [isPlayerInATeam, teamNo] = doesPlayerHaveATeam(
    props.currentPlayer,
    props.teams
  );
  const [teamSelected, setTeamSelected] = useState<boolean>(false);
  const playersWithATeam: IPlayer[] = [];
  for (const team of props.teams) {
    playersWithATeam.push(...team.members);
  }
  const playersWithNoTeam: IPlayer[] = props.players.filter(
    (player) =>
      !playersWithATeam.some((p) => p.id === player.id) &&
      player.id !== props.currentPlayer.id
  );
  if (teamSelected === false) {
    return (
      <div>
        {playersWithNoTeam.length !== 0 &&
          playersWithNoTeam.map((player) => (
            <button
              type="button"
              className="btn btn-primary me-2"
              value={player.id}
              onClick={() => {
                if (isPlayerInATeam === true && teamNo !== null) {
                  joinExistingTeam(player, teamNo, props.teams, props.setTeams);
                } else {
                  createNewTeam(
                    props.currentPlayer,
                    player.id,
                    props.players,
                    props.setTeams
                  );
                }
                setTeamSelected(true);
              }}
            >
              {player.name}
            </button>
          ))}
        {props.teams.length !== 0 &&
          props.teams
            .filter((team) => team.id !== teamNo)
            .map((team) => (
              <button
                type="button"
                className="btn btn-primary me-2"
                value={team.id}
                onClick={() => {
                  if (isPlayerInATeam === true && teamNo !== null) {
                    for (const member of team.members) {
                      joinExistingTeam(
                        member,
                        teamNo,
                        props.teams,
                        props.setTeams
                      );
                    }
                    props.setTeams((prev) =>
                      prev.filter((t) => t.id !== team.id)
                    );
                  } else {
                    joinExistingTeam(
                      props.currentPlayer,
                      team.id,
                      props.teams,
                      props.setTeams
                    );
                  }
                  setTeamSelected(true);
                }}
              >
                {getTeamMemberNames(team)}
              </button>
            ))}
      </div>
    );
  } else {
    return <p className="text-danger">You will no longer drink alone!</p>;
  }
}
