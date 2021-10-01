// https://thirsty-sammet-5a9a2b.netlify.app/


import styled from "styled-components";
import axios from "axios";
import Header from "./components/Header";
import AppName from "./components/AppName";
import SearchBox from "./components/SearchBox";
import SearchInput from "./components/SearchInput";
import MovieListContainer from "./components/MovieListContainer";
import MovieComponent from "./components/MovieComponent";
import MovieInfo from "./components/MovieInfo";

import "./App.css";
import { useState } from "react";

const API_KEY = "60abaef";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  const [query, setQuery] = useState();
  const [timeoutID, setTimeoutID] = useState(0);
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie,setSelectedMovie] = useState();

  const fetchData = async (MOVIE_NAME) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${MOVIE_NAME}&apikey=${API_KEY}`,
    );
    setMovieList(response.data.Search);
  };

  const handleChange = (e) => {
    clearTimeout(timeoutID);
    setQuery(e.target.value);
    const val = setTimeout(() => fetchData(e.target.value), 500);
    setTimeoutID(val);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <i className="fas fa-film"></i>
          React Movie App
        </AppName>
        <SearchBox>
          <i className="fas fa-search"></i>
          <SearchInput
            placeholder="Search Movie"
            onChange={handleChange}
            value={query}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfo selectedMovie={selectedMovie} />}
      <MovieListContainer>
        {movieList && movieList.length
          ? movieList.map((movie, key) => (
              <MovieComponent key={key} movie={movie} onMovieSelect={setSelectedMovie} />
            ))
          : "No Search found"}
      </MovieListContainer>
    </Container>
  );
}

export default App;
