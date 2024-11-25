import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

// スタイル ------------------------------------------
const FormWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 400px;
    margin: auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledFormControl = styled(FormControl)`
    && {
        width: 100%;
    }
`;
// スタイルここまで------------------------------------


const SearchForm = ({ onSearch }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(""); // ジャンル
  const [selectedYear, setSelectedYear] = useState(""); // 公開年数
  const [selectedRating, setSelectedRating] = useState(""); // 評価
  const [selectedRuntime, setSelectedRuntime] = useState(""); // 上映時間
  const [actor, setActor] = useState(""); // 俳優名
  const [actorSuggestions, setActorSuggestions] = useState([]); // 予測候補

  useEffect(() => {
    // ジャンルをAPIから取得
    axios
      .get("http://localhost:8000/api/genres")
      .then((response) => {
        setGenres(response.data);
      })
      .catch((error) => {
        console.error("ジャンルの取得に失敗しました:", error);
      });
  }, []);

  // 俳優予測APIを呼び出す
  const fetchActorSuggestions = async (query) => {
    if (!query) {
      setActorSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost/api/actors?query=${query}`
      );
      setActorSuggestions(response.data.results);
    } catch (error) {
      console.error("俳優の予測候補の取得に失敗しました:", error);
    }
  };

  const handleActorChange = (e) => {
    const value = e.target.value;
    setActor(value);
    fetchActorSuggestions(value); // 入力値に基づいて予測候補を取得
  };

  const handleActorSelect = (actorName) => {
    setActor(actorName);
    setActorSuggestions([]); // 候補リストをクリア
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      genre: selectedGenre,
      year: selectedYear,
      rating: selectedRating,
      runtime: selectedRuntime,
      actor, // 俳優名を追加
    });
  };

  return (
    <FormWrapper
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ジャンル選択 */}
      <StyledFormControl>
        <InputLabel id="genre-label">ジャンル</InputLabel>
        <Select
          labelId="genre-label"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <MenuItem value="">すべて</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      {/* 年選択 */}
      <StyledFormControl>
        <InputLabel id="year-label">年</InputLabel>
        <Select
          labelId="year-label"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <MenuItem value="">すべて</MenuItem>
          {Array.from({ length: 30 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            );
          })}
        </Select>
      </StyledFormControl>

      {/* 評価選択 */}
      <StyledFormControl>
        <InputLabel id="rating-label">評価</InputLabel>
        <Select
          labelId="rating-label"
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
        >
          <MenuItem value="">すべて</MenuItem>
          {[...Array(10)].map((_, i) => {
            const rating = (i + 1) / 2;
            return (
              <MenuItem key={rating} value={rating}>
                {rating} 以上
              </MenuItem>
            );
          })}
        </Select>
      </StyledFormControl>

      {/* 上映時間選択 */}
      <StyledFormControl>
        <InputLabel id="runtime-label">上映時間</InputLabel>
        <Select
          labelId="runtime-label"
          value={selectedRuntime}
          onChange={(e) => setSelectedRuntime(e.target.value)}
        >
          <MenuItem value="">すべて</MenuItem>
          <MenuItem value="short">100時間未満</MenuItem>
          <MenuItem value="medium">100〜150時間</MenuItem>
          <MenuItem value="long">150時間以上</MenuItem>
        </Select>
      </StyledFormControl>

       {/* 出演俳優検索 */}
      <StyledFormControl>
        出演俳優:
        <input
          type="text"
          value={actor}
          onChange={handleActorChange}
          placeholder="俳優名を入力"
        />
        {actorSuggestions.length > 0 && (
          <ul
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: 0,
              listStyle: "none",
            }}
          >
            {actorSuggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                style={{ cursor: "pointer", padding: "5px 0" }}
                onClick={() => handleActorSelect(suggestion.name)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </StyledFormControl>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        検索
      </Button>
    </FormWrapper>
  );
};

export default SearchForm;