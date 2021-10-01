import {  useState , useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const API_KEY = "60abaef";

const Container = styled.div`
display : flex;
flex-direction : row;
padding : 20px 30px;
justify-content : center;
border-bottom : 1px solid lightgray;
`;

const CoverImage = styled.img`
object-fit : cover;
height : 352px;
`;

const Info = styled.div`
display : flex;
flex-direction : column;
margin : 20px;
`;

const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const OtherDetails = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span{ 
      opacity : 0.5;
  }
`;

const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;

const MovieInfo = ({selectedMovie}) => {

    const [movieInfo , setMovieInfo] = useState();
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        axios.get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
        .then(res => {
            setMovieInfo(res.data);
            setLoading(false);
        })

    },[selectedMovie])

    return (  
        <Container>
        {movieInfo ? (<>
        <CoverImage src={movieInfo?.Poster} />
            <Info>
                <MovieName>{movieInfo?.Type} : {movieInfo?.Title} </MovieName>
                <OtherDetails>IMDB Rating : <span> {movieInfo?.imdbRating} </span></OtherDetails>
                <OtherDetails>Released : <span> {movieInfo?.Released} </span></OtherDetails>
                <OtherDetails>Rated : <span> {movieInfo?.Rated} </span></OtherDetails>
                <OtherDetails>Language : <span> {movieInfo?.Language} </span></OtherDetails>
                <OtherDetails>Runtime : <span>{movieInfo?.Runtime}</span></OtherDetails>
                <OtherDetails>Genre : <span>{movieInfo?.Genre}</span></OtherDetails>
                <OtherDetails>Actors : <span>{movieInfo?.Actors}</span></OtherDetails>
                <OtherDetails>Director : <span>{movieInfo?.Director}</span></OtherDetails>
                <OtherDetails>Writers : <span>{movieInfo?.Writer}</span></OtherDetails>
                <OtherDetails>Box Office : <span>{movieInfo?.BoxOffice}</span></OtherDetails>
                <OtherDetails>Awards : <span>{movieInfo?.Awards}</span></OtherDetails>
                <OtherDetails>Plot : <span>{movieInfo?.Plot}</span></OtherDetails>

            </Info>
            <Close onClick={()=> {setMovieInfo(); setLoading(false)}} >X</Close>
        </>) : loading ? ("Loading...") : ("Click Movie to view details.")
        }
        </Container>
    );
}
 
export default MovieInfo;