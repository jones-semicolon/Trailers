import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import imdbServer from "../components/imdbServer";
import Library, { Results } from "../components/Library";
import SearchBar from "../components/SearchBar";
import { IconChevronLeft } from "@tabler/icons-react";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState({});

  useEffect(() => {
    imdbServer.search(location.state.query).then((data) => {
      setResults({ library_title: "Movie", ...data });
    });
  }, [location.state.query]);

  return (
    <>
      <nav>
        <button className="return" onClick={() => navigate(-1)}>
          <IconChevronLeft />
        </button>
        <SearchBar />
      </nav>
      <div className="query">Searched for "{location.state.query}"</div>
      {Object.keys(results).length ? <Results data={results} /> : null}
    </>
  );
}
