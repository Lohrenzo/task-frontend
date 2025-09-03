import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import NotFound from "./NotFound";

// Describe block for the NotFound component tests
describe("NotFound", () => {
  // Test case: renders page with the correct text
  it("renders page with the correct text", () => {
    render(<NotFound />);
    expect(screen.queryByText("Page Not Found")).toBeInTheDocument();
  });
});
