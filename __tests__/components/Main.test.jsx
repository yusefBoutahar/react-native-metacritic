import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { Main } from "../../components/Main";
import { getLatestGames } from "../../lib/metacritic";

jest.mock("../../lib/metacritic");

jest.mock("../../components/AnimatedCard", () => ({
  AnimatedCard: ({ game }) => {
    const { Text } = require("react-native");
    return <Text>{game.title}</Text>;
  },
}));

jest.mock("../../components/Screen", () => ({
  Screen: ({ children }) => {
    const { View } = require("react-native");
    return <View>{children}</View>;
  },
}));

const mockGames = [
  { title: "Game 1", slug: "game-1", description: "desc 1", score: 90, image: "img1.jpg" },
  { title: "Game 2", slug: "game-2", description: "desc 2", score: 80, image: "img2.jpg" },
];

describe("Main", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading indicator initially", () => {
    getLatestGames.mockReturnValue(new Promise(() => {}));
    const { getByTestId, UNSAFE_getByType } = render(<Main />);
    const { ActivityIndicator } = require("react-native");
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it("renders games after successful fetch", async () => {
    getLatestGames.mockResolvedValueOnce(mockGames);
    const { getByText } = render(<Main />);

    await waitFor(() => {
      expect(getByText("Game 1")).toBeTruthy();
      expect(getByText("Game 2")).toBeTruthy();
    });
  });

  it("shows error message when fetch fails", async () => {
    getLatestGames.mockRejectedValueOnce(new Error("Network error"));
    const { getByText } = render(<Main />);

    await waitFor(() => {
      expect(getByText("Error: Network error")).toBeTruthy();
    });
  });

  it("calls getLatestGames on mount", () => {
    getLatestGames.mockReturnValue(new Promise(() => {}));
    render(<Main />);
    expect(getLatestGames).toHaveBeenCalledTimes(1);
  });
});
