import { useRef, useEffect, useState } from "react";
import imdbServer from "./imdbServer";

export default function Carousel() {
  /*const images = [
    {
      image: "https://picsum.photos/seed/1/540/720",
      title: "Super Mario Bros.: Live Action",
    },
    {
      image: "https://picsum.photos/seed/2/1280/720",
      title: "The Desk",
    },
    {
      image: "https://picsum.photos/seed/3/1280/720",
      title: "The Paradise",
    },
  ];*/
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const carouselScroll = (e) => {
    if (
      e.currentTarget.scrollLeft % e.currentTarget.childNodes[0].offsetWidth ===
      0
    ) {
      setActiveImage(
        e.currentTarget.scrollLeft / e.currentTarget.childNodes[0].offsetWidth,
      );
    }
  };

  useEffect(() => {
    imdbServer.upcomingMovies().then((data) => {
      setImages(data.results.slice(0, 10));
    });
  }, []);

  useEffect(() => {
    if (images.length) {
      const scroll = setInterval(() => {
        setActiveImage((activeImage) =>
          activeImage >= images.length - 1 ? 0 : activeImage + 1,
        );
      }, 5000);
      return () => clearInterval(scroll);
    }
  }, [images]);

  useEffect(() => {
    if (!images.length) return;
    const movies = document.querySelector(".movies");
    movies.scrollLeft = movies.childNodes[0].offsetWidth * activeImage;
    movies.addEventListener("scroll", carouselScroll);
    return () => movies.removeEventListener("scroll", carouselScroll);
  }, [activeImage]);
  return (
    <div className="carousel">
      <div className="movies">
        {images.map((image, key) => (
          <div className="movie" key={key}>
            <img
              src={`https://image.tmdb.org/t/p/original/${image.backdrop_path}`}
              alt={image.title}
            />
            <div className="title">{image.title}</div>
          </div>
        ))}
      </div>
      <div className="indicator">
        {images.map((img, i) => (
          <span key={i} aria-selected={i === activeImage ? true : false}></span>
        ))}
      </div>
    </div>
  );
}
