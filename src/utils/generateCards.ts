import { ICard } from "../interfaces/ICard";
export function generateCards(): ICard[] {
  const suits = ["clubs", "diamonds", "hearts", "spades"];
  const ranks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const deckOfCards: ICard[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deckOfCards.push({ suit: suit, rank: rank });
    }
  }
  return deckOfCards;
}
