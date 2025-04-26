import "@testing-library/jest-dom";
// Import utilities from React Testing Library
import { render, screen, act } from "@testing-library/react";
// Import MemoryRouter to simulate routing context
import { MemoryRouter } from "react-router-dom";
// Import the component under test
import SplashScreen from "../SplashScreen";

// ---
// MOCKS

// Create a mock function to track navigation calls
const mockNavigate = jest.fn();

// Mock react-router-dom to override only the useNavigate hook
jest.mock("react-router-dom", () => ({
  // Keep all the real exports except useNavigate
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Use fake timers to control setTimeout in tests
jest.useFakeTimers();

// ---
// TEST SUITE

describe("SplashScreen", () => {
  // Reset all mock calls before each test to avoid cross-test pollution
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Weather title and sun icon", () => {
    // Render SplashScreen inside a router context
    render(
      <MemoryRouter>
        <SplashScreen />
      </MemoryRouter>
    );

    // Assert that the title and sun icon are present
    expect(screen.getByText("Weather")).toBeInTheDocument();
    expect(screen.getByAltText("Sun")).toBeInTheDocument();
  });

  it("navigates after 2 seconds", () => {
    // Render SplashScreen inside a router context
    render(
      <MemoryRouter>
        <SplashScreen />
      </MemoryRouter>
    );

    // Fast-forward time by 2000ms to trigger the navigation
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Assert that navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/weather");
  });
});
