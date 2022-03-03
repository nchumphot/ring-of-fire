import { generateCards } from "./generateCards";

describe("generateCards should return 52 cards in a deck", () => {
  test("Should be defined", () => {
    expect(generateCards()).toBeDefined();
  });
  test("Returns 52 cards", () => {
    expect(generateCards()).toHaveLength(52);
  });
  test("Returns four cards of each rank", () => {
    const cards = generateCards();
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
    const countArr = [];
    for (const rank of ranks) {
      let count = 0;
      for (const card of cards) {
        if (card.rank === rank) {
          count++;
        }
      }
      countArr.push(count);
    }
    expect(countArr).toStrictEqual([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
  });
  test("Returns 13 cards for each suit", () => {
    const cards = generateCards();
    const suits = ["clubs", "diamonds", "hearts", "spades"];
    const countArr = [];
    for (const suit of suits) {
      let count = 0;
      for (const card of cards) {
        if (card.suit === suit) {
          count++;
        }
      }
      countArr.push(count);
    }
    expect(countArr).toStrictEqual([13, 13, 13, 13]);
  });
});
