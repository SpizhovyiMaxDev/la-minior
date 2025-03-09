import React from "react";
import { render, screen, cleanup, within } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import MobileExpandableDescription from "./MobileExpandableDescription";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("MobileExpandableDescription", () => {
  beforeEach(cleanup);
  it("renders message if ingredients list is empty", rendersEmptyMessage);
  it("renders desktop ingredients fully", rendersDesktopIngredients);
  it("expands ingredients view on mobile devices", expandsMobileIngredients);
});

function rendersEmptyMessage() {
  render(<MobileExpandableDescription ingredients={[]} />);
  expect(screen.getByText("No ingredients available")).toBeInTheDocument();
}

function rendersDesktopIngredients() {
  render(
    <MobileExpandableDescription
      ingredients={["bananas", "apples", "ketchup", "cheese", "lettuce"]}
    />,
  );

  expect(
    screen.getByText("bananas, apples, ketchup, cheese, lettuce"),
  ).toBeInTheDocument();
}

async function expandsMobileIngredients() {
  const originalWidth = global.innerWidth;
  global.innerWidth = 415;

  render(
    <MobileExpandableDescription
      ingredients={["bananas", "apples", "ketchup", "cheese", "lettuce"]}
    />,
  );

  const expandedView = screen.getByText("bananas,...").closest("div");
  const button = expandedView.querySelector("button");

  expect(button).toHaveTextContent("Read more");
  await userEvent.click(button);
  expect(button).toHaveTextContent("Read less");

  expect(
    within(expandedView).getByText("bananas, apples, ketchup, cheese, lettuce"),
  ).toBeInTheDocument();

  global.innerWidth = originalWidth;
}
