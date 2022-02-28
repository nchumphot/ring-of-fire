import { useEffect, useState } from "react";
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
  setTurnCompleted: React.Dispatch<React.SetStateAction<boolean>>;
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
  useEffect(() => setTeamSelected(false), [props.currentPlayer]);
  if (teamSelected === false) {
    return (
      <div>
        {playersWithNoTeam.length !== 0 &&
          playersWithNoTeam.map((player) => (
            <button
              type="button"
              key={player.id}
              className="btn btn-primary me-2"
              value={player.id}
              onClick={() => {
                if (isPlayerInATeam === true && teamNo !== null) {
                  // if current player already has a team, selected player joins his/her exisitng team
                  joinExistingTeam(
                    [player],
                    teamNo,
                    props.teams,
                    props.setTeams
                  );
                } else {
                  // else if current player does not have a team, selected player joins a new team with him/her
                  createNewTeam(
                    props.currentPlayer,
                    player.id,
                    props.players,
                    props.setTeams
                  );
                }
                setTeamSelected(true);
                props.setTurnCompleted(true);
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
                key={team.id}
                className="btn btn-primary me-2"
                value={team.id}
                onClick={() => {
                  if (isPlayerInATeam === true && teamNo !== null) {
                    // CONTAINS BUGS
                    // if current player already has a team, selected team merges with his/her team
                    joinExistingTeam(
                      team.members,
                      teamNo,
                      props.teams,
                      props.setTeams
                    );
                    props.setTeams((prev) =>
                      prev.filter((t) => t.id !== team.id)
                    );
                  } else {
                    // else if current player does not have a team, he/she joins selected team
                    joinExistingTeam(
                      [props.currentPlayer],
                      team.id,
                      props.teams,
                      props.setTeams
                    );
                  }
                  setTeamSelected(true);
                  props.setTurnCompleted(true);
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
