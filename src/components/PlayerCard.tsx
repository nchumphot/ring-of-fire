import { IPlayer } from "../interfaces/IPlayer";

export function PlayerCard(props: { player: IPlayer }): JSX.Element {
  return (
    <div className="border border-success m-2 p-2">
      <h3>{props.player.name}</h3>
    </div>
  );
}
