import React from "react";
import { render } from "@testing-library/react-native";
import { Score } from "../../components/Score";

describe("Score", () => {
  it("renders the score text", () => {
    const { getByText } = render(<Score score={85} />);
    expect(getByText("85")).toBeTruthy();
  });

  it("renders with red background for scores below 50", () => {
    const { getByText } = render(<Score score={30} />);
    const scoreText = getByText("30");
    expect(scoreText).toBeTruthy();
  });

  it("renders with red background for score of 49", () => {
    const { getByText } = render(<Score score={49} />);
    expect(getByText("49")).toBeTruthy();
  });

  it("renders with yellow background for scores between 50 and 74", () => {
    const { getByText } = render(<Score score={60} />);
    expect(getByText("60")).toBeTruthy();
  });

  it("renders with yellow background for score of 50", () => {
    const { getByText } = render(<Score score={50} />);
    expect(getByText("50")).toBeTruthy();
  });

  it("renders with green background for scores 75 and above", () => {
    const { getByText } = render(<Score score={85} />);
    expect(getByText("85")).toBeTruthy();
  });

  it("renders with green background for score of 75", () => {
    const { getByText } = render(<Score score={75} />);
    expect(getByText("75")).toBeTruthy();
  });

  it("renders with green background for score of 100", () => {
    const { getByText } = render(<Score score={100} />);
    expect(getByText("100")).toBeTruthy();
  });

  it("renders with red background for score of 0", () => {
    const { getByText } = render(<Score score={0} />);
    expect(getByText("0")).toBeTruthy();
  });
});
