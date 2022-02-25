import { ICard } from "../interfaces/ICard";

export function displaySuit(card: ICard): string {
  switch (card.suit) {
    case "clubs":
      return "♣️";
    case "hearts":
      return "♥️";
    case "diamonds":
      return "♦️";
    case "spades":
      return "♠️";
    default:
      return "Not valid";
  }
}
