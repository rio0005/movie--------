import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchForm = ({ onSearch }) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedRating, setSelectedRating] = useState("");

    useEffect(() => {
        // ジャンルをAPIから取得
        axios.get("http://localhost:8000/api/genres")
            .then((response) => {
                setGenres(response.data);
            })
            .catch((error) => {
                console.error("ジャンルの取得に失敗しました:", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({
            genre: selectedGenre,
            year: selectedYear,
            rating: selectedRating,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* ジャンル選択 */}
            <label>
                ジャンル:
                <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                    <option value="">すべて</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </label>

            {/* 年選択 */}
            <label>
                年:
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                    <option value="">すべて</option>
                    {Array.from({ length: 30 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        );
                    })}
                </select>
            </label>

            {/* 評価選択 */}
            <label>
                評価:
                <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
                    <option value="">すべて</option>
                    {[...Array(10)].map((_, i) => {
                        const rating = (i + 1) / 2;
                        return (
                            <option key={rating} value={rating}>
                                {rating} 以上
                            </option>
                        );
                    })}
                </select>
            </label>

            <button type="submit">検索</button>
        </form>
    );
};

export default SearchForm;