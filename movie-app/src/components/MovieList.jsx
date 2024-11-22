import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// グリッドスタイル
const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px ;
`;

const MovieCard = styled(motion.div)`
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 100%;
    height: auto;
  }

  h2 {
    font-size: 1.2rem;
    margin: 10px 0;
  }

  p {
    font-size: 0.9rem;
    padding: 0 10px 20px;
    color: #555;
  }
`;

// アニメーション設定
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


const MovieList = ({ movies }) => {
  return (
    <MovieGrid>
      {movies.results.map((movie) => (
        <MovieCard
          key={movie.id}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
            alt={movie.title}
          />
          <h2>{movie.title}</h2>
          {/* <p>{movie.overview}</p> */}
        </MovieCard>
      ))}
    </MovieGrid>
  );
};

export default MovieList;
