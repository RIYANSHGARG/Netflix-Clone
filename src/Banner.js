import React,{useEffect, useState} from 'react';
import requests from './request';
import "./Banner.css";

function Banner() {

    const [movie , setMovie] = useState([]);

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await fetch("https://api.themoviedb.org/3"+(requests.fetchNetflixOriginals));
                const data = await response.json();
                setMovie(data.results[Math.floor(Math.random()* data.results.length-1)])
            }
            catch(e){
                console.log(e);
            }
        } 
        fetchData();
    }, []);

    console.log(movie);

    function truncate(str, n){
        return str?.length > n ? str.substr(0,n-1) + "..." :str;
    }

  return (
     <header className='banner' 
     style={{
        backgroundSize :"cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition : "center center",
     }} > 
        <div className="banner__contents">
        
        {/* Title*/}
        <h1 className='banner__title'>
            {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* div with two buttons */}
        <div className='banner__button'>
            <button className="banner__buttons">Play</button>
            <button className="banner__buttons">My List</button>
        </div>
        {/* disc */}
        <h1 className="banner__description">{truncate(movie?.overview,150)}</h1>
        </div>

        <div className="banner--fadeBottom" />
    </header>
  )
}

export default Banner;