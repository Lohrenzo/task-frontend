import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { Mock } from "vitest";
import "@testing-library/jest-dom/vitest";
import App from "./App";

// Mocking react-router-dom to allow useNavigate and useParams to function in tests
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    BrowserRouter: actual.MemoryRouter, // Use MemoryRouter for testing
    useParams: () => ({ id: "1" }), // Default mock for useParams
    useNavigate: vi.fn(), // Mocking useNavigate
  };
});

describe("App", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
    // Set up a default mock for fetch to return an empty array of tasks
    (globalThis.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => [],
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
    cleanup(); // Clean up DOM after each test
  });

  it("renders the Task List title", async () => {
    render(<App />);
    expect(screen.getByText("Task List")).toBeInTheDocument();
    // Expect at least one "Add Task" button to be present
    expect(screen.getAllByText("Add Task").length).toBeGreaterThan(0);
  });

  // Test case: clicks add task button and verifies the add task modal opens
  it("clicks add task button and openAdd becomes true", async () => {
    render(<App />);
    const button = screen.getAllByRole("button", { name: /Add Task/i })[0]; // Select the first 'Add Task' button
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    // After clicking, the "Add New Task" modal title should be visible
    expect(screen.getByText("Add New Task")).toBeInTheDocument();
  });
});
