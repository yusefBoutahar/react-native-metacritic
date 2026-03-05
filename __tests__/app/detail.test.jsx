import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { Detail } from "../../app/[id]";
import { getGameDetails } from "../../lib/metacritic";

jest.mock("../../lib/metacritic");

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ id: "test-game" }),
  Stack: {
    Screen: () => null,
  },
}));

jest.mock("../../components/Score", () => ({
  Score: ({ score }) => {
    const { Text } = require("react-native");
    return <Text>{score}</Text>;
  },
}));

jest.mock("../../components/Screen", () => ({
  Screen: ({ children }) => {
    const { View } = require("react-native");
    return <View>{children}</View>;
  },
}));

const mockGameDetails = {
  title: "Test Game",
  slug: "test-game",
  description: "Full game description",
  score: 85,
  img: "https://example.com/card.jpg",
  reviews: [
    { quote: "Great!", score: 90, date: "2024-01-01", publicationName: "IGN", author: "Author" },
  ],
};

describe("Detail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading indicator while fetching", () => {
    getGameDetails.mockReturnValue(new Promise(() => {}));
    const { UNSAFE_getByType } = render(<Detail />);
    const { ActivityIndicator } = require("react-native");
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it("renders game details after successful fetch", async () => {
    getGameDetails.mockResolvedValueOnce(mockGameDetails);
    const { getByText } = render(<Detail />);

    await waitFor(() => {
      expect(getByText("Test Game")).toBeTruthy();
      expect(getByText("Full game description")).toBeTruthy();
      expect(getByText("85")).toBeTruthy();
    });
  });

  it("shows error message when fetch fails", async () => {
    getGameDetails.mockRejectedValueOnce(new Error("Not found"));
    const { getByText } = render(<Detail />);

    await waitFor(() => {
      expect(getByText("Error: Not found")).toBeTruthy();
    });
  });

  it("calls getGameDetails with the correct slug", () => {
    getGameDetails.mockReturnValue(new Promise(() => {}));
    render(<Detail />);
    expect(getGameDetails).toHaveBeenCalledWith("test-game");
  });
});
