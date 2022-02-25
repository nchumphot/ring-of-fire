import { ICard } from "../interfaces/ICard";

export function cardDefinitions(card: ICard): string {
  switch (card.rank) {
    case "A":
      return "Ace is for waterfall. Everyone drinks until the first player stops like a cascading waterfall.";
    case "2":
      return "Two is for you. Pick a person to drink.";
    case "3":
      return "Three is for me. Whoever picked this card, drink up!";
    case "4":
      return "Four is for whore. Drink if you're a whore!";
    case "5":
      return "Five is for thumb master.";
    case "6":
      return "Six is for dicks. Drink if you have a dick!";
    case "7":
      return "Seven is for heaven.";
    case "8":
      return "Eight is for mate. Pick your drinking mate.";
    case "9":
      return "Nine is for rhyme.";
    case "10":
      return "Ten is for category.";
    case "J":
      return "Jack is for rules.";
    case "Q":
      return "Queen is for question master.";
    case "K":
      return "King is for King's cup.";
    default:
      return "Invalid card.";
  }
}
