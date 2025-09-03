import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { Mock } from "vitest";
import "@testing-library/jest-dom/vitest";
import TaskDetails from "./TaskDetails";
import { MemoryRouter } from "react-router-dom";

// Mocking react-router-dom to provide a test id for useParams and allow useNavigate to function
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useParams: () => ({ id: "1" }), // Mocking the id parameter
  };
});

// Describe block for the TaskDetails component tests
describe("TaskDetails", () => {
  // beforeEach hook to set up mocks before each test
  beforeEach(() => {
    globalThis.fetch = vi.fn(); // Mocking the global fetch function
  });

  // afterEach hook to reset mocks after each test
  afterEach(() => {
    vi.resetAllMocks();
  });

  // Test case: fetches and displays the task details
  it("fetches and displays the task details", async () => {
    // Mocking the fetch response for a successful task retrieval
    (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        title: "Test Task",
        description: "This is a test task",
      }),
    });
    render(
      <MemoryRouter initialEntries={["/tasks/1"]}>
        <TaskDetails />
      </MemoryRouter>
    );
    expect(await screen.findByText("Test Task")).toBeInTheDocument();
    expect(await screen.findByText("This is a test task")).toBeInTheDocument();
  });
});
