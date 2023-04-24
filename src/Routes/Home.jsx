import { useEffect, useState } from "react";
import { IconMovie, IconSearch } from "@tabler/icons-react";
import Carousel from "../components/Carousel";
import imdbServer from "../components/imdbServer";
import Library from "../components/Library";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [libraries, setLibraries] = useState([]);
  useEffect(() => {
    imdbServer.trendingMovies().then((data) => {
      imdbServer.upcomingMovies().then((data1) => {
        imdbServer.popularMovies().then((data2) => {
          imdbServer.topRatedMovies().then((data3) => {
            setLibraries([
              { library_title: "Trending Movies", ...data },
              { library_title: "Upcoming Movies", ...data1 },
              { library_title: "Popular Movies", ...data2 },
              { library_title: "Top Rated Movies", ...data3 },
            ]);
          });
        });
      });
    });
  }, []);
  return libraries.length ? (
    <>
      <nav>
        <div className="logo">
          <IconMovie />
          Trailers
        </div>
        <SearchBar />
      </nav>
      <Carousel />
      {libraries.map((library, i) => (
        <Library data={library} key={i} />
      ))}
    </>
  ) : (
    <Loader />
  );
}
