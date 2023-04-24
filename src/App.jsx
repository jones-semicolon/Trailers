import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Movie from "./Routes/Movie";
import Search from "./Routes/Search";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/Trailers" element={<Home />} />
        <Route path="/Trailers/movie/:id" element={<Movie />} />
        <Route path="/Trailers/search/:query" element={<Search />} />
      </Routes>
    </main>
  );
}

export default App;
