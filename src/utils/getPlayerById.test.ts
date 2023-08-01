import { getPlayerById } from "./getPlayerById";

describe("getPlayerById should return a player with the ID specified", () => {
  const allPlayers = [
    { id: 1, name: "John" },
    { id: 2, name: "Sarah" },
    { id: 3, name: "Tim" },
    { id: 4, name: "Adam" },
    { id: 5, name: "Lisa" },
  ];
  test("Querying an ID that exists", () => {
    const player1 = getPlayerById(1, allPlayers);
    expect(player1).toStrictEqual({ id: 1, name: "John" });
    const player5 = getPlayerById(5, allPlayers);
    expect(player5).toStrictEqual({ id: 5, name: "Lisa" });
  });
  test("Querying an ID that does not exist", () => {
    const player = getPlayerById(100, allPlayers);
    expect(player).toBeUndefined();
  });
});
