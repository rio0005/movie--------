import React, { useState } from "react";
import axios from "axios";
import styled,{ createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import SearchForm from "./components/SearchForm";
import MovieList from "./components/MovieList";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    background: linear-gradient(135deg, #336666, #003333);
    font-family: Arial, sans-serif;
  }

  #root {
    height: 100%;
  }
`;

// 背景デザイン-----------------------------------------------------
const BackGround = styled.div`
  min-height: 100vh;
  background-color: rgba(0, 77, 64, 1);
  background-image: radial-gradient(
      rgb(0, 137, 123) 4%,
      rgb(0, 105, 92) 9%,
      rgba(0, 121, 107, 0) 9%
    ),
    radial-gradient(
      rgb(0, 137, 123) 4%,
      rgb(0, 105, 92) 9%,
      rgba(102, 0, 0, 0) 9%
    ),
    radial-gradient(rgba(0, 150, 136, 0.8) 20%, rgba(0, 121, 107, 0) 100%),
    radial-gradient(rgba(0, 150, 136, 0.8) 20%, rgba(0, 121, 107, 0) 100%),
    radial-gradient(rgb(0, 121, 107) 35%, rgba(0, 121, 107, 0) 60%),
    radial-gradient(rgb(0, 121, 107) 35%, rgba(0, 121, 107, 0) 60%),
    radial-gradient(rgba(0, 121, 107, 0.7) 0, rgba(0, 121, 107, 0) 100%),
    radial-gradient(rgba(0, 121, 107, 0.7) 0, rgba(0, 121, 107, 0) 100%),
    linear-gradient(
      45deg,
      rgba(0, 121, 107, 0) 49%,
      rgb(0, 0, 0) 50%,
      rgba(0, 121, 107, 0) 70%
    ),
    linear-gradient(
      -45deg,
      rgba(0, 121, 107, 0) 49%,
      rgb(0, 0, 0) 50%,
      rgba(102, 0, 0, 0) 70%
    );
  background-position: 0 0, 50px 50px, 50px 0, 0 50px, 50px 0, 100px 50px, 0 0,
    50px 50px, 0 0, 0 0;
  background-size: 100px 100px;
  /* background: linear-gradient(140deg, #006666, #336633, #003366); */
  color: #fff;
`;
// 背景デザインここまで-----------------------------------------------

const Title = styled.h1`
  font-family: "游明朝", sans-serif; /* フォントを指定 */
  text-align: center;
  padding: 40px;
  color: #ffffff;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15);
`;

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
    <>
      <GlobalStyle />
      <BackGround>
        <Title>ムービーデータベース</Title>
        <SearchForm onSearch={handleSearch} />
        {movies && <MovieList movies={movies} />}
      </BackGround>
    </>
  );
};
