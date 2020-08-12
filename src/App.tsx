import React from "react";
import "./App.css";
import requests from "./api/requests";
import Row from "./Components/Row";
import Banner from "./Components/Banner";
import Nav from "./Components/Nav";

function App() {
  return (
    <div className="App">
      {/* Nav */}
      <Nav />
      {/* Banner */}
      <Banner />

      {/* Row */}
      <Row
        title="지금 뜨는 트렌드 영화"
        fetchUrl={requests.fetchTrending}
        isLarge
      />
      <Row title="Netflix 오리지널" fetchUrl={requests.fetchNetflixOriginals} />
      <Row title="Top랭킹" fetchUrl={requests.fetchTopRated} />
      <Row title="액션 영화" fetchUrl={requests.fetchActionMovies} />
      <Row title="어드벤처 영화" fetchUrl={requests.fetchAdventureMovies} />
      <Row title="범죄 영화" fetchUrl={requests.fetchCrimeMovies} />
      <Row title="판타지 영화" fetchUrl={requests.fetchFantasyMovies} />
      <Row title="로맨스 영화" fetchUrl={requests.fetchRomanceMovies} />
    </div>
  );
}

export default App;
