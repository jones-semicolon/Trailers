import react from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
console.log(API_KEY);
const BASED_URL = "https://api.themoviedb.org/3";
const headers = {
  accept: "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

export default {
  upcomingMovies() {
    return (async () => {
      let res = await axios.request({
        method: "GET",
        url: `${BASED_URL}/movie/upcoming?api_key=${API_KEY}&page=1`,
        headers,
      });
      return await res.data;
    })();
  },
  topRatedMovies() {
    return (async () => {
      let res = await axios.request({
        method: "GET",
        url: `${BASED_URL}/movie/top_rated?language=en&page=1`,
        headers,
      });
      return await res.data;
    })();
  },
  movieDetails(id) {
    return (async () => {
      let res = await axios.request({
        method: "GET",
        url: `${BASED_URL}/movie/${id}?language=en`,
        headers,
      });
      return await res.data;
    })();
  },
  movieCast(id) {
    return (async () => {
      let res = await axios.request({
        method: "GET",
        url: `${BASED_URL}/movie/${id}/credits?language=en`,
        headers,
      });
      return await res.data;
    })();
  },
  popularMovies() {
    return (async () => {
      let res = await axios.request({
        method: "GET",
        url: `${BASED_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
        headers,
      });
      return await res.data;
    })();
  },
  trendingMovies() {
    return (async () => {
      let res = await axios.request({
        method: "GET",
        url: `${BASED_URL}/trending/movie/week`,
        headers,
      });
      return await res.data;
    })();
  },
  similarMovies(id) {
    return (async () => {
      let res = await axios.request({
        method: "GET",
        url: `${BASED_URL}/movie/${id}/similar?page=1`,
        headers,
      });
      return await res.data;
    })();
  },
  recommendedMovies(id) {
    return (async () => {
      let res = await axios.request({
        method: "GET",
        url: `${BASED_URL}/movie/${id}/recommendations?page=1`,
        headers,
      });
      return await res.data;
    })();
  },
  trailer(id) {
    return (async () => {
      let res = await axios.request({
        method: "GET",
        url: `${BASED_URL}/movie/${id}/videos`,
        headers,
      });
      return await res.data;
    })();
  },

  backdrop(id) {
    return (async () => {
      let res = await axios.request({
        method: "GET",
        url: `${BASED_URL}/movie/${id}/images?language=en`,
        headers,
      });
      return await res.data;
    })();
  },
  search(query) {
    return (async () => {
      let res = await axios.request({
        method: "GET",
        url: `${BASED_URL}/search/movie?language=en&query=${query}`,
        headers,
      });
      return await res.data;
    })();
  },
};
