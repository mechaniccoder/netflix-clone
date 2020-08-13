import React, {useState, useEffect} from "react";
import axios from "../api/axios";
import styled from "styled-components";
import YouTube, {Options} from "react-youtube";
const movieTrailer = require("movie-trailer");

const RowWrapper = styled.div`
  margin-bottom: 20px;
  h2 {
    text-align: left;
    color: #e5e5e5;
  }
  .row__posters {
    display: flex;
    padding: 20px 0;
    /* overflow-y: hidden; */
    overflow-x: scroll;
  }

  .row__posters::-webkit-scrollbar {
    display: none;
  }

  .row__poster {
    /* width: 100%; */
    margin-right: 3px;
    object-fit: contain;
    max-width: 200px;
    transition: all 0.2s;
  }
  .row__poster:hover {
    transform: scale(1.2);
    margin: 0 30px;
  }
  @media screen and (max-width: 650px) {
    .row__poster {
      max-width: 120px;
    }
  }
`;

interface RowProps {
  title: string;
  fetchUrl: string;
  isLarge?: boolean;
}

function Row({title, fetchUrl, isLarge}: RowProps) {
  const baseURL = "https://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movieName, setMovieName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      console.log(request);
    };
    fetchData();
  }, [fetchUrl]);

  const option: Options = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const searchTrailer = (movie: any) => {
    movieTrailer(movie?.original_title || "")
      .then((url: string) => {
        setTrailerUrl(url.split("=")[url.split("=").length - 1]);
      })
      .catch((err: any) => console.error(err));
  };

  const handleClick = (movie: any) => {
    if (movie?.original_title !== movieName) {
      setMovieName(movie?.original_title);
    }
    if (trailerUrl) {
      if (movie?.original_title === movieName) {
        setTrailerUrl("");
      } else {
        searchTrailer(movie);
      }
    } else {
      searchTrailer(movie);
    }
  };

  return (
    <RowWrapper>
      {/* title */}
      <h2>{title}</h2>
      {/* posters */}
      <ul className="row__posters">
        {movies.map((movie: any) =>
          movie.poster_path && movie.backdrop_path ? (
            <img
              className="row__poster"
              key={movie.id}
              src={`${baseURL}${
                isLarge ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.original_title}
              onClick={() => handleClick(movie)}
            />
          ) : (
            ""
          )
        )}
      </ul>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={option} />}
    </RowWrapper>
  );
}

export default Row;
