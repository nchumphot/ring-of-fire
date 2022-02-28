import { ICard } from "../interfaces/ICard";

export function cardImageURL(card: ICard): string {
  const rank = card.rank === "10" ? "0" : card.rank;
  const suit = card.suit.substring(0, 1).toUpperCase();
  return `https://deckofcardsapi.com/static/img/${rank}${suit}.png`;
}
