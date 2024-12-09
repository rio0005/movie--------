import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FormControl, InputLabel, Select, MenuItem, Button, TextField } from "@mui/material";

// スタイル ------------------------------------------
const FormWrapper = styled(motion.div)`
    color: black;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 400px;
    margin: auto;
    padding: 30px;
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
  const [selectedRuntime, setSelectedRuntime] = useState(""); // 上映時間
  const [selectedPerson, setSelectedPerson] = useState(""); // 俳優・監督検索
  const [personSuggestions, setPersonSuggestions] = useState([]); // サジェスト候補
  const [searchQuery, setSearchQuery] = useState(""); // 検索クエリ

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

    const handlePersonSearch = (query) => {
      setSearchQuery(query);
      if (query.trim() === "") {
        setPersonSuggestions([]);
        return;
      }

      // TMDb APIで俳優・監督検索
      axios
        .get(`https://api.themoviedb.org/3/search/person`, {
          params: {
            api_key: "338014730556f227e32d631536c4b9cf",
            query,
          },
        })
        .then((response) => {
          setPersonSuggestions(response.data.results);
        })
        .catch((error) => {
          console.error("俳優・監督の検索に失敗しました:", error);
        });
    };

      const handlePersonSelect = (personName) => {
        setSelectedPerson(personName);
        setSearchQuery(personName);
        setPersonSuggestions([]); // サジェストをクリア
      };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      genre: selectedGenre,
      year: selectedYear,
      runtime: selectedRuntime,
      person: selectedPerson,
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

      {/*俳優・監督選択 */}
      <StyledFormControl>
        <TextField
          label="俳優・監督 ※苗字と名前にスペースを入れる"
          value={searchQuery}
          onChange={(e) => handlePersonSearch(e.target.value)}
        />
        {personSuggestions.length > 0 && (
          <ul>
            {personSuggestions.map((person) => (
              <li
                key={person.id}
                onClick={() => handlePersonSelect(person.name)}
                style={{ cursor: "pointer" }}
              >
                {person.name}
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