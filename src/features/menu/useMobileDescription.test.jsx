import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useMobileDescription from "./useMobileDescripiton";
import "@testing-library/jest-dom/vitest";

describe("useMobileDescription", () => {
  it("test if it defines Mobile view", definesMobileView);
  it("test if it defines Desktop view", definesDesktopView);
});

function definesMobileView() {
  const originalWidth = global.innerWidth;
  global.innerWidth = 415;

  const {
    result: { current: isMobile },
  } = renderHook(() => useMobileDescription());

  expect(isMobile).toBe(true);

  global.innerWidth = originalWidth;
}

function definesDesktopView() {
  const {
    result: { current: isMobile },
  } = renderHook(() => useMobileDescription());
  expect(isMobile).toBe(false);
}
