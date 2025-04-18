import React, { useRef } from "react";
import searchIcon from "../../assets/search.png";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current?.value) {
      onSearch(inputRef.current.value);
    }
  };

  return (
    <div className="weather__search-bar">
      <input ref={inputRef} type="text" placeholder="Search" className="weather__input" />
      <img src={searchIcon} alt="search" onClick={handleClick} className="weather__search-icon" />
    </div>
  );
};

export default SearchBar;
