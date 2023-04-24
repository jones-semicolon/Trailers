import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { IconStarFilled, IconMovie } from "@tabler/icons-react";
import imdbServer from "./imdbServer";

export default function Library(props) {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setData(props.data);
  }, []);

  return (
    <div className="library">
      <div className="library-top">
        <div className="library-title">{data.library_title}</div>
        {data.total_results <= data.results?.length ? null : (
          <button className="secondary">See all &#62;</button>
        )}
      </div>
      <div className="items">
        {data.results?.map((item, key) => (
          <div
            className="item"
            onClick={() =>
              navigate(`/Trailers/movie/${item.id}`, { state: { id: item.id } })
            }
            key={key}
          >
            {item.backdrop_path || item.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${
                  item.backdrop_path || item.poster_path
                }`}
              />
            ) : (
              <IconMovie />
            )}
            <div className="info">
              <div className="title">{item.title}</div>
              <div className="year">
                {new Date(item.release_date).getFullYear()}
              </div>
            </div>
            <div className="rating">
              <IconStarFilled />
              {item.vote_average}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Results(props) {
  let navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, []);

  return (
    <div className="results">
      <div class="library-title">{data.library_title}</div>
      <div className="items">
        {data.results?.map((item, key) => (
          <div
            className="item"
            onClick={() =>
              navigate(`/Trailers/movie/${item.id}`, { state: { id: item.id } })
            }
            key={key}
          >
            {item.backdrop_path || item.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${
                  item.backdrop_path || item.poster_path
                }`}
                alt={item.title}
              />
            ) : (
              <IconMovie />
            )}
            <div className="info">
              <div className="title">{item.title}</div>
              <div class="year">
                {new Date(item.release_date).getFullYear()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
