import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASED_URL = "https://api.themoviedb.org/3";
const headers = {
  accept: "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

const fetchData = async (url) => {
  const res = await axios.get(`${BASED_URL}${url}`, { headers });
  return res.data;
};

export default {
  upcomingMovies() {
    return fetchData("/movie/upcoming?page=1");
  },
  topRatedMedia(mediaType) {
    return fetchData(`/${mediaType}/top_rated?language=en&page=1`);
  },
  mediaDetails(id, mediaType) {
    return fetchData(`/${mediaType}/${id}?language=en`);
  },
  mediaCast(id, mediaType) {
    return fetchData(`/${mediaType}/${id}/credits?language=en`);
  },
  popularMedia(mediaType) {
    return fetchData(
      `/discover/${mediaType}?include_adult=true&language=en-US&page=1&sort_by=popularity.desc`,
    );
  },
  trendingMedia(mediaType) {
    return fetchData(`/trending/${mediaType}/week`);
  },
  similarMedia(id, mediaType) {
    return fetchData(`/${mediaType}/${id}/similar?page=1`);
  },
  recommendedMedia(id, mediaType) {
    return fetchData(`/${mediaType}/${id}/recommendations?page=1`);
  },
  trailer(id, mediaType) {
    return fetchData(`/${mediaType}/${id}/videos`);
  },
  backdrop(id, mediaType) {
    return fetchData(`/${mediaType}/${id}/images?language=en`);
  },
  search(query) {
    return fetchData(`/search/multi?language=en&query=${query}`);
  },
};
