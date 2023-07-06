import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import imdbServer from "../components/imdbServer";
import Library, { Results } from "../components/Library";
import SearchBar from "../components/SearchBar";
import { IconChevronLeft } from "@tabler/icons-react";

export default function Search() {
  const location = useLocation();
  const params = useParams()
  const navigate = useNavigate();
  const [results, setResults] = useState({});

  useEffect(() => {
    imdbServer.search(params.query).then((data) => {
      setResults({ library_title: "Movie", ...data });
    });
  }, [params.query]);

  return (
    <>
      <nav>
        <button className="return" onClick={() => navigate(-1)}>
          <IconChevronLeft />
        </button>
        <SearchBar />
      </nav>
      <div className="query">Searched for "{params.query}"</div>
      {Object.keys(results).length ? <Results data={results} /> : null}
    </>
  );
}
