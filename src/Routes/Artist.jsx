import imdbServer from "../components/imdbServer";
import { IconChevronLeft, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";

export default function Artist() {
  let navigate = useNavigate();
  const location = useLocation();
  const [movies, setMovies] = useState({});
  const [series, setSeries] = useState({});
  const [artistDetails, setArtistDetails] = useState({});
  const [id, setId] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (!id) return;
    imdbServer.person(id).then((data) => {
      setArtistDetails(data);
      console.log(artistDetails);
    });
  }, [id]);

  useEffect(() => {
    setId(params.id);
    setArtistDetails({});
  }, [params.id]);

  return Object.keys(artistDetails).length && id ? (
    <>
      <nav>
        <button className="return" onClick={() => navigate(-1)}>
          <IconChevronLeft />
        </button>
        <SearchBar />
      </nav>
      <div className="profile">
        <div className="cast">
          <img
            src={`https://image.tmdb.org/t/p/w500/${artistDetails.profile_path}`}
            alt={artistDetails.original_name}
          />
          <div className="name">
            <div>{artistDetails.name}</div>
          </div>
          <div className="date">
            <div>
              Born:{" "}
              <span>{new Date(artistDetails.birthday).toDateString()}</span>
              <div>
                Death:{" "}
                <span>
                  {!artistDetails.deathday ??
                    new Date(artistDetails.deathday).toDateString()}
                </span>
              </div>
              <div>
                Age:{" "}
                <span>
                  {new Date(Date.now()).getFullYear() -
                    new Date(artistDetails.birthday).getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
}
