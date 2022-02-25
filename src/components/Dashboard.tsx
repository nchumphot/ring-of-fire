import { useEffect, useState } from "react";
import { ICard } from "../interfaces/ICard";
import { IPlayer } from "../interfaces/IPlayer";
import { ITeam } from "../interfaces/ITeam";
import { getTeamMemberNames } from "../utils/getTeamMemberNames";

export function Dashboard(props: {
  currentPlayer: IPlayer;
  cards: ICard[];
  rules: string[];
  questionMaster: IPlayer[];
  setQuestionMaster: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  heavenMaster: IPlayer[];
  setHeavenMaster: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  thumbMaster: IPlayer[];
  setThumbMaster: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  teams: ITeam[];
}): JSX.Element {
  const [noOfKings, setNoOfKings] = useState<number>(0);
  useEffect(() => {
    setNoOfKings(props.cards.filter((c) => c.rank === "K").length);
  }, [props.cards]);
  return (
    <div className="container-lg">
      <div className="row">
        <div className="col m-2 p-2 border border-dark">
          <p>Current player: {props.currentPlayer.name}</p>
        </div>
      </div>
      <div className="row">
        <div className="col m-2 p-2 border border-dark">
          <h3>The Deck</h3>
          <p>There are {props.cards.length} cards left.</p>
          <p>Probability of breaking: </p>
        </div>
        <div
          className={`col m-2 p-2 border border-${
            noOfKings > 1 ? "dark" : "danger"
          }`}
        >
          <h3>The King's Cup</h3>
          <p>{`There are ${noOfKings} King${noOfKings > 1 && "s"} left.`}</p>
          <p>{`Probability of getting the King's cup: ${
            noOfKings > 1 ? "0" : (noOfKings / props.cards.length).toString()
          }`}</p>
        </div>
      </div>
      <div className="row">
        <div
          className={`col m-2 p-2 border border-${
            props.questionMaster.length !== 0 ? "danger" : "dark"
          }`}
        >
          <h3>❓ Question Master</h3>
          <p>
            {props.questionMaster.length !== 0
              ? props.questionMaster[0].name
              : "None"}
          </p>
        </div>
        <div
          className={`col m-2 p-2 border border-${
            props.thumbMaster.length !== 0 ? "danger" : "dark"
          }`}
        >
          <h3>👍🏼 Thumb Master</h3>
          <p>
            {props.thumbMaster.length !== 0
              ? props.thumbMaster[0].name
              : "None"}
          </p>
          <button
            type="button"
            className="btn btn-warning btn-sm"
            onClick={() => props.setThumbMaster([])}
          >
            Reset
          </button>
        </div>
        <div
          className={`col m-2 p-2 border border-${
            props.heavenMaster.length !== 0 ? "danger" : "dark"
          }`}
        >
          <h3>😇 Heaven Master</h3>
          <p>
            {props.heavenMaster.length !== 0
              ? props.heavenMaster[0].name
              : "None"}
          </p>
          <button
            type="button"
            className="btn btn-warning btn-sm"
            onClick={() => props.setHeavenMaster([])}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col m-2 p-2 border border-dark">
          <h3>Rules</h3>
          {props.rules.length === 0 ? (
            <p>None</p>
          ) : (
            <ul>
              {props.rules.map((r) => (
                <li>{r}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="col m-2 p-2 border border-dark">
          <h3>Mates</h3>
          {props.teams.length === 0 ? (
            <p>None</p>
          ) : (
            <ul>
              {props.teams.map((t) => (
                <li>{getTeamMemberNames(t)}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
