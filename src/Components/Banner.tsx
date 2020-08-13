import React, {useEffect, useState} from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import styled from "styled-components";

type banner = any[];

const BannerWrapper = styled.header`
  position: relative;
  min-height: 600px;
  margin-bottom: 30px;
  margin-left: -15px;
  &:after {
    content: "";
    width: 100%;
    height: 60px;
    position: absolute;
    left: 0;
    bottom: 0px;
    background: linear-gradient(to top, #141414, transparent);
    z-index: 0;
  }
  .banner__contents {
    position: absolute;
    bottom: 50px;
    left: 0;
    margin-left: 30px;
    margin-bottom: 30px;
    text-align: left;
    width: 60%;
    h2 {
      color: #e5e5e5;
      font-size: 2rem;
    }
    p {
      color: #e5e5e5;
    }
    .banner__buttons {
      margin-top: 20px;
      .banner__button {
        width: 150px;
        height: 40px;
        background: #e5e5e5;
        font-size: 1.2rem;
        font-weight: 600;
        border: none;
        border-radius: 6px;
        transition: all 0.2s;
      }
      .banner__button:first-child {
        margin-right: 15px;
      }
      .banner__button:nth-child(2) {
        background: #6a6762;
        color: #e5e5e5;
      }
      .banner__button:hover {
        opacity: 0.5;
      }
    }
  }
  @media screen and (max-width: 650px) {
    & {
      min-height: 450px;
    }
    .banner__contents {
      width: 100%;
      margin-left: 0;
      padding: 0 30px;
      bottom: 0;
    }
    .banner__contents h2 {
      font-size: 1.5rem;
    }
    .banner__contents p {
      font-size: 0.9rem;
    }
  }
`;

function Banner() {
  const [movie, setMovie]: banner = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * (request.data.results.length - 1))
        ]
      );
      return request;
    };
    fetchData();
  }, []);
  const truncate = (str: string, n: number) => {
    if (str) {
      return str.length > n ? str.substring(0, n - 1) + "..." : str;
    }
    return;
  };
  return (
    <BannerWrapper
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center 0",
      }}
    >
      <div className="banner__contents">
        {/* title */}
        <h2>{movie.original_name}</h2>
        {/* description */}
        <p>{truncate(movie.overview, 200)}</p>
        {/* div > 2 buttons */}
        <div className="banner__buttons">
          <button className="banner__button">재생</button>
          <button className="banner__button">상세정보</button>
        </div>
      </div>
    </BannerWrapper>
  );
}

export default Banner;
