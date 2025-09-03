import { render, screen } from "@testing-library/react";
import Index from "./Index";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

// Describe block for the Index component tests
describe("Index", () => {
  // Test case: renders without tasks
  it("renders without tasks", () => {
    render(<Index />);
    expect(screen.queryByText("No tasks available")).toBeInTheDocument();
  });
});
