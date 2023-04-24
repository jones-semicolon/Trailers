import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {IconSearch} from "@tabler/icons-react"

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
    <form
      className="search-button"
      onSubmit={() => navigate(`/Trailers/search/${query}`, { state: { query } })}
    >
      <input
        type="text"
        placeholder="Search for a movie"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" disabled={query ? false : true}>
        <IconSearch />
      </button>
    </form>
  );
}
