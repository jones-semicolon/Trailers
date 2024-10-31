import { useEffect, useState } from "react";
import { Routes, Route, createBrowserRouter } from "react-router-dom";
import Home from "./Routes/Home";
import Movie from "./Routes/Movie";
import Search from "./Routes/Search";
import Artist from "./Routes/Artist";

const App = createBrowserRouter([
  {
    path: "/Trailers",
    element: (
      <main>
        <Home />
      </main>
    ),
  },
  {
    path: "/Trailers/movie/:id",
    element: (
      <main>
        <Movie />
      </main>
    ),
  },
  {
    path: "/Trailers/search/:query",
    element: (
      <main>
        <Search />
      </main>
    ),
  },
  {
    path: "/Trailers/artist/:id",
    element: (
      <main>
        <Artist />
      </main>
    ),
  },
]);

export default App;
