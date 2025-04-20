import React, { useRef } from "react";
import "./index.css";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

/**
 * `SearchBar` component allows users to input a city name and trigger a search for its weather.
 * The component uses a search icon button that, when clicked, passes the entered city name to the `onSearch` function.
 *
 * @component
 * @example
 * <SearchBar onSearch={(city) => console.log(city)} />
 *
 * @param {object} props - Component props.
 * @param {(city: string) => void} props.onSearch - Function to handle city search, receives the city name as a string.
 *
 * @returns {JSX.Element} A `div` element containing an input field and a search button.
 */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="searchbar-container">
      <input
        ref={inputRef}
        type="text"
        placeholder="Chercher une ville"
        className="searchbar-input"
      />
      <button
        onClick={() => {
          if (inputRef.current?.value) {
            onSearch(inputRef.current.value);
          }
        }}
        className="searchbar-button"
        aria-label="Rechercher la ville"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="searchbar-icon"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
