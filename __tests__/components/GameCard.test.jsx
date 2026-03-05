import React from "react";
import { render } from "@testing-library/react-native";
import { GameCard } from "../../components/GameCard";

jest.mock("expo-router", () => ({
  Link: ({ children }) => children,
}));

jest.mock("../../components/Score", () => ({
  Score: ({ score }) => {
    const { Text } = require("react-native");
    return <Text>{score}</Text>;
  },
}));

const mockGame = {
  title: "Test Game Title",
  slug: "test-game",
  description: "This is a test game description that is long enough to be truncated by the component logic in the card.",
  score: 85,
  image: "https://example.com/image.jpg",
};

describe("GameCard", () => {
  it("renders the game title", () => {
    const { getByText } = render(<GameCard game={mockGame} />);
    expect(getByText("Test Game Title")).toBeTruthy();
  });

  it("renders the game score", () => {
    const { getByText } = render(<GameCard game={mockGame} />);
    expect(getByText("85")).toBeTruthy();
  });

  it("truncates description to 100 characters", () => {
    const longDescription = "A".repeat(150);
    const game = { ...mockGame, description: longDescription };
    const { getByText } = render(<GameCard game={game} />);
    const expected = "A".repeat(100) + " ...";
    expect(getByText(expected)).toBeTruthy();
  });

  it("handles short description without error", () => {
    const game = { ...mockGame, description: "Short" };
    const { getByText } = render(<GameCard game={game} />);
    expect(getByText("Short ...")).toBeTruthy();
  });

  it("handles null description without crashing", () => {
    const game = { ...mockGame, description: null };
    expect(() => render(<GameCard game={game} />)).not.toThrow();
  });

  it("handles undefined description without crashing", () => {
    const game = { ...mockGame, description: undefined };
    expect(() => render(<GameCard game={game} />)).not.toThrow();
  });

  it("handles empty description", () => {
    const game = { ...mockGame, description: "" };
    expect(() => render(<GameCard game={game} />)).not.toThrow();
  });

  it("renders the game image", () => {
    const { UNSAFE_getByType } = render(<GameCard game={mockGame} />);
    const images = UNSAFE_getByType("Image");
    expect(images).toBeTruthy();
  });
});
