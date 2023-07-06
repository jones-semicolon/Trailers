import { useEffect, useState } from "react";
import { Routes, Route, createBrowserRouter } from "react-router-dom";
import Home from "./Routes/Home";
import Movie from "./Routes/Movie";
import Search from "./Routes/Search";

// function App() {
//   return (
//     <main>
//       <Routes>
//         <Route path="/Trailers" element={<Home />} />
//         <Route path="/Trailers/movie/:id" element={<Movie />} />
//         <Route path="/Trailers/search/:query" element={<Search />} />
//       </Routes>
//     </main>
//   );
// }

const App = createBrowserRouter([
  {
    path: "/Trailers",
    element: <main><Home /></main>,
  },
  {
    path: "/Trailers/movie/:id",
    element: <main><Movie /></main>,
  },
  {
    path: "/Trailers/search/:query",
    element: <main><Search /></main>,
  }
])

export default App;
