import { ICard } from "../interfaces/ICard";

export function shuffleCards(current: ICard[]): ICard[] {
  let oldDeck = current;
  const newDeck = [];
  for (let i = current.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i);
    newDeck.push(oldDeck[j]);
    oldDeck.splice(j, 1);
  }
  return newDeck;
}
