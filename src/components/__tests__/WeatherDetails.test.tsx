// Import necessary functions from the testing library
import { render, screen } from '@testing-library/react';

// Import the component to be tested
import WeatherDetails from '../WeatherDetails';

// Test for the `WeatherDetails` component
test('it displays humidity and wind correctly', () => {
  // Render the component with props for humidity and wind
  render(<WeatherDetails humidity={75} wind={10} />);

  // Verify that the humidity is correctly displayed
  expect(screen.getByText(/75%/)).toBeInTheDocument();

  // Verify that the wind speed is correctly displayed
  expect(screen.getByText(/10 km\/h/)).toBeInTheDocument();
});
