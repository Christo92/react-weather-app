import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

// Mock function for the onSearch prop
const mockOnSearch = jest.fn();

test("it triggers onSearch with the correct city name", () => {
  // Render the component with the mock function
  render(<SearchBar onSearch={mockOnSearch} />);

  // Find the input field by its placeholder text
  const inputElement = screen.getByPlaceholderText("Chercher une ville");

  // Simulate user typing a city name into the input field
  fireEvent.change(inputElement, { target: { value: "Paris" } });

  // Find the search button by its aria-label
  const buttonElement = screen.getByRole("button", { name: /Rechercher la ville/i });

  // Simulate clicking the search button
  fireEvent.click(buttonElement);

  // Assert that onSearch was called with the city name "Paris"
  expect(mockOnSearch).toHaveBeenCalledWith("Paris");
});
