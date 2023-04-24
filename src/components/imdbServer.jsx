import react from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASED_URL = "https://api.themoviedb.org/3";

export default {
  upcomingMovies() {
    return (async () => {
      let res = await axios.get(
        `${BASED_URL}/movie/upcoming?api_key=${API_KEY}&page=1`
      );
      return await res.data;
    })();
  },
  topRatedMovies() {
    return (async () => {
      let res = await axios.get(
        `${BASED_URL}/movie/top_rated?api_key=${API_KEY}&language=en&page=1`
      );
      return await res.data;
    })();
  },
  movieDetails(id) {
    return (async () => {
      let res = await axios.get(
        `${BASED_URL}/movie/${id}?api_key=${API_KEY}&language=en`
      );
      return await res.data;
    })();
  },
  movieCast(id) {
    return (async () => {
      let res = await axios.get(
        `${BASED_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en`
      );
      return await res.data;
    })();
  },
  popularMovies() {
    return (async () => {
      let res = await axios.get(
        `${BASED_URL}/movie/popular?api_key=${API_KEY}&language=en`
      );
      return await res.data;
    })();
  },
  trendingMovies() {
    return (async () => {
      let res = await axios.get(
        `${BASED_URL}/trending/movie/week?api_key=${API_KEY}`
      );
      return await res.data;
    })();
  },
  similarMovies(id) {
    return (async () => {
      let res = await axios.get(
        `${BASED_URL}/movie/${id}/similar?api_key=${API_KEY}&page=1`
      );
      return await res.data;
    })();
  },
  recommendedMovies(id) {
    return (async () => {
      let res = await axios.get(
        `${BASED_URL}/movie/${id}/recommendations?api_key=${API_KEY}&page=1`
      );
      return await res.data;
    })();
  },
  trailer(id) {
    return (async () => {
      let res = await axios.get(
        `${BASED_URL}/movie/${id}/videos?api_key=${API_KEY}`
      );
      return await res.data;
    })();
  },

  backdrop(id) {
    return (async () => {
      let res = await axios.get(
        `${BASED_URL}/movie/${id}/images?api_key=${API_KEY}&language=en`
      );
      return await res.data;
    })();
  },
  search(query) {
    return (async () => {
      let res = await axios.get(
        `${BASED_URL}/search/movie?api_key=${API_KEY}&language=en&query=${query}`
      );
      return await res.data;
    })();
  },
};
