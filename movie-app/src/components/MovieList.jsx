import React from "react";

const MovieList = ({ movies }) => {
    return (
        <div>
            {movies.results.map((movie) => (
                <div key={movie.id}>
                    <h2>{movie.title}</h2>
                    <img src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt={movie.title} />
                    <p>{movie.overview}</p>
                </div>
            ))}
        </div>
    );
};

export default MovieList;