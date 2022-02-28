import { ICard } from "../interfaces/ICard";

export function cardImageURL(card: ICard): string {
  const suit = card.suit.substring(0, 1).toUpperCase();
  return `https://deckofcardsapi.com/static/img/${card.rank}${suit}.png`;
}
