import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.scss";
import { stickers } from "../../data/StickersData";
import { charms } from "../../data/CharmsData";

const Search = () => {
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      setFilteredResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const stickerResults = stickers
      .filter((item) => item.name.toLowerCase().includes(lowerQuery))
      .map((item) => ({ ...item, type: "stickers" }));

    const charmResults = charms
      .filter((item) => item.name.toLowerCase().includes(lowerQuery))
      .map((item) => ({ ...item, type: "charms" }));

    setFilteredResults([...stickerResults, ...charmResults]);
  }, [query]);

  const handleSelectItem = (item) => {
    navigate(`/${item.type}/${item.id}`, {
      state: { [item.type.slice(0, -1)]: item },
    });
    setQuery(""); // Optional: clear search after navigation
  };

  return (
    <div className="search">
      <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </g>
      </svg>
      <input
        id="search"
        className="search__input"
        type="search"
        placeholder="Type to search..."
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filteredResults.length > 0 && (
        <div className="search__results">
          {filteredResults.map((item) => (
            <div
              key={item.id}
              className="search__result-item"
              onClick={() => handleSelectItem(item)}
            >
              <img src={item.image} alt={item.name} width="50" />
              <div>
                <p className="search__result-title">{item.name}</p>
                <p className="search__result-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;