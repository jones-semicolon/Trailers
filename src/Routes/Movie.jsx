import { useState, useEffect } from "react";
import {
  IconStar,
  IconPlayerPlay,
  IconShare3,
  IconChevronLeft,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import Library from "../components/Library";
import SearchBar from "../components/SearchBar";
import imdbServer from "../components/imdbServer";
import Loader from "../components/Loader";

export default function Movie(argument) {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({});
  const [casts, setCasts] = useState({});
  const [libraries, setLibraries] = useState([]);
  const [play, setPlay] = useState(false);
  const [trailer, setTrailer] = useState({});
  const [id, setId] = useState(null);
  useEffect(() => {
    if (!id) return;
    imdbServer.movieDetails(id).then((data) => {
      setData(data);
    });
    imdbServer.movieCast(id).then((data) => {
      setCasts(data);
    });
    imdbServer.similarMovies(id).then((data) => {
      imdbServer.recommendedMovies(id).then((data1) => {
        setLibraries([
          {
            library_title: "Similar Movies",
            ...data,
          },
          { library_title: "Recommended Movies", ...data1 },
        ]);
      });
    });
    imdbServer.trailer(id).then((data) => {
      data = data.results.filter(
        (item) => item.type === "Trailer" && item.official === true
      );
      setTrailer(data[0]);
    });
  }, [id]);
  const share = () => {
    navigator.share({
      title: data.title,
      url: `https://jonestly-source.github.io/Trailers/${data.id}`,
    });
  }

  useEffect(() => {
    setData({});
    setCasts({});
    setLibraries([]);
    setId(location.state.id);
  }, [location.state.id]);
  return Object.keys(data).length &&
    Object.keys(casts).length &&
    libraries.length &&
    id ? (
    <>
      <nav>
        <button className="return" onClick={() => navigate(-1)}>
          <IconChevronLeft />
        </button>
        <SearchBar />
      </nav>
      <div className="details">
        <div className="banner">
          {!play ? (
            <>
              <img
                src={`https://image.tmdb.org/t/p/original/${
                  data.backdrop_path ? data.backdrop_path : data.poster_path
                }`}
                alt={data.title}
              />
              <IconPlayerPlay onClick={() => setPlay(true)} />
            </>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              width="100%"
              height="100%"
              allow="autoplay"
            />
          )}
        </div>
        <div className="info">
          <div className="reviews">
            <div className="imdb-rating">IMDb 8.0</div>
            <div className="rating">
              <IconStar />
              {parseFloat(data.vote_average).toFixed(1)}
            </div>
            <div className="total-review">({data.popularity})</div>
            <button>
              <IconShare3 onClick={() => share(data.id)}/>
            </button>
          </div>
          <div className="title">{data.title}</div>
          <div className="genre">
            {data.genres?.map((genre, key) => (
              <button key={key}>{genre.name}</button>
            ))}
          </div>
        </div>
        <div className="cast">
          <div className="title">Top Cast</div>
          <div className="casts">
            {casts.cast?.slice(0, 10).map((ferson, i) => (
              <div key={i}>
                {ferson.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${ferson.profile_path}`}
                    alt={ferson.original_name}
                  />
                ) : (
                  <IconUser />
                )}
                <div className="name">
                  <div>{ferson.original_name}</div>
                  <div>{ferson.character}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="synopsis">
          <div className="title">Overview</div>
          <p>{data.overview}</p>
        </div>
      </div>
      {libraries.map((library, i) =>
        library.results.length ? <Library data={library} key={i} /> : null
      )}
    </>
  ) : (
    <Loader />
  );
}
