import React, { useState } from "react";
import axios from "axios";
import SearchForm from "./components/SearchForm";
import MovieList from "./components/MovieList";

export const App = () => {
  const [movies, setMovies] = useState(null);

  const handleSearch = async (params) => {
    try{
      const response = await axios.get("http://localhost:8000/api/movies", { params });
      setMovies(response.data);
    } catch (error) {
      console.error("映画データの取得に失敗しました:",error);
    }
  };

  return (
    <div>
      <h1>Movie Finder</h1>
      <SearchForm onSearch={handleSearch} />
      {movies && <MovieList movies={movies} />}
    </div>
  );
};
