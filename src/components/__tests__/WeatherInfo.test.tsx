// Import necessary functions and modules for testing
import { render, screen } from "@testing-library/react";
import WeatherInfo from "../WeatherInfo";

// Mock the `iconMap` module to simulate the mapping of weather icons
jest.mock("../../utils/iconMap", () => ({
  "01d": "clearIcon.png", // Icon for clear weather during the day
  "02d": "cloudIcon.png", // Icon for cloudy weather during the day
}));

// Describe the test suite for the `WeatherInfo` component
describe("WeatherInfo Component", () => {
  // Sample mock data to be passed as props to the component
  const mockData = {
    temp: 20,
    city: "Paris",
    icon: "01d",
    humidity: 75,
    wind: 15,
  };

  // Test to check if the correct icon is displayed based on the icon prop
  it("displays the correct icon based on the icon prop", () => {
    // Render the component with the initial mock data
    const { rerender } = render(<WeatherInfo {...mockData} />);

    // Verify that the correct icon is displayed initially
    let weatherIcon = screen.getByAltText("weather");
    expect(weatherIcon).toHaveAttribute("src", "clearIcon.png");

    // Update the mock data to simulate a change in the weather icon
    const updatedMockData = { ...mockData, icon: "02d" };

    // Re-render the component with the updated icon
    rerender(<WeatherInfo {...updatedMockData} />);

    // Verify that the weather icon has been updated correctly
    weatherIcon = screen.getByAltText("weather");
    expect(weatherIcon).toHaveAttribute("src", "cloudIcon.png");
  });
});
