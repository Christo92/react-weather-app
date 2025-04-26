import "@testing-library/jest-dom"; // Extend Jest matchers
import { render, screen, act } from "@testing-library/react"; // Render component and interact with it
import { MemoryRouter } from "react-router-dom"; // Simulate routing context
import SplashScreen from "../SplashScreen"; // The component under test

// Mock the `useNavigate` hook from `react-router-dom` to track navigation calls
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Keep actual exports
  useNavigate: () => mockNavigate, // Mock the `useNavigate` function
}));

// Use fake timers for controlling the passage of time in tests
jest.useFakeTimers();

// Test suite for the `SplashScreen` component
describe("SplashScreen", () => {
  // Reset all mocks before each test to ensure no test pollution
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test to check if the title and sun icon are rendered correctly
  it("renders the Weather title and sun icon", () => {
    render(
      <MemoryRouter>
        <SplashScreen />
      </MemoryRouter>
    );

    // Check if the "Weather" title is present
    expect(screen.getByText("Weather")).toBeInTheDocument();
    // Check if the sun icon is present
    expect(screen.getByAltText("Sun")).toBeInTheDocument();
  });

  // Test to check if the navigation happens after 2 seconds
  it("navigates after 2 seconds", () => {
    render(
      <MemoryRouter>
        <SplashScreen />
      </MemoryRouter>
    );

    // Advance the timers by 2000ms (2 seconds) to simulate time passing
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Assert that the navigate function was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/weather");
  });
});
