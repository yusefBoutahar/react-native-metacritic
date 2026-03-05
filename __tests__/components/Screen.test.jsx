import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { Screen } from "../../components/Screen";

describe("Screen", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Screen>
        <Text>Hello World</Text>
      </Screen>
    );
    expect(getByText("Hello World")).toBeTruthy();
  });

  it("renders without crashing", () => {
    expect(() => render(<Screen />)).not.toThrow();
  });

  it("accepts custom className", () => {
    expect(() =>
      render(
        <Screen className="custom-class">
          <Text>Content</Text>
        </Screen>
      )
    ).not.toThrow();
  });
});
