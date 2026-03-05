import React from "react";
import { render } from "@testing-library/react-native";
import { AnimatedCard } from "../../components/AnimatedCard";

jest.mock("../../components/GameCard", () => ({
  GameCard: ({ game }) => {
    const { Text } = require("react-native");
    return <Text>{game.title}</Text>;
  },
}));

const mockGame = {
  title: "Test Game",
  slug: "test-game",
  description: "desc",
  score: 85,
  image: "img.jpg",
};

describe("AnimatedCard", () => {
  it("renders the GameCard component", () => {
    const { getByText } = render(<AnimatedCard game={mockGame} index={0} />);
    expect(getByText("Test Game")).toBeTruthy();
  });

  it("renders without crashing for different indices", () => {
    expect(() => render(<AnimatedCard game={mockGame} index={0} />)).not.toThrow();
    expect(() => render(<AnimatedCard game={mockGame} index={5} />)).not.toThrow();
    expect(() => render(<AnimatedCard game={mockGame} index={10} />)).not.toThrow();
  });
});
