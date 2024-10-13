import { useEffect, useState } from "react";
import { IconMovie } from "@tabler/icons-react";
import Carousel from "../components/Carousel";
import imdbServer from "../components/imdbServer";
import Library from "../components/Library";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [libraries, setLibraries] = useState([]);
  const [scrolling, setScrolling] = useState(false);

  // Function to fetch and sort media data
  const fetchAndSortMedia = async () => {
    try {
      const trendingMovies = await imdbServer.trendingMedia("movie");
      const upcomingMovies = await imdbServer.upcomingMovies();
      const popularMovies = await imdbServer.popularMedia("movie");
      const topRatedMovies = await imdbServer.topRatedMedia("movie");
      const trendingTV = await imdbServer.trendingMedia("tv");
      const topRatedTV = await imdbServer.topRatedMedia("tv");

      // Sort data
      topRatedMovies.results.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date),
      );
      topRatedTV.results.sort(
        (a, b) => new Date(b.first_air_date) - new Date(a.first_air_date),
      );

      // Set libraries state
      setLibraries([
        { library_title: "Trending Movies", ...trendingMovies },
        { library_title: "Upcoming Movies", ...upcomingMovies },
        { library_title: "Popular Movies", ...popularMovies },
        { library_title: "Popular Movie Series", ...trendingTV },
        { library_title: "Top Rated Movie Series", ...topRatedTV },
        { library_title: "Top Rated Movies", ...topRatedMovies },
      ]);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  useEffect(() => {
    fetchAndSortMedia();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return libraries.length ? (
    <>
      <nav className={scrolling ? "navbar-scroll" : ""}>
        <div className="logo">
          <IconMovie />
          Trailers
        </div>
        <SearchBar />
      </nav>
      <div>
        <Carousel />
        {libraries.map((library, i) => (
          <Library data={library} key={i} />
        ))}
      </div>
    </>
  ) : (
    <Loader />
  );
}
