import { useSelector } from 'react-redux';
import '../../style.css'
import NewMovieSubscribe from '../Movies/NewMovieSubscribe'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const WatchedMovies = ({memberId}) => {
    const navigate = useNavigate();
    const [subscribeVisibilty, setSubscribeVisibility] = useState(false);
    const {subscriptions: subsData} = useSelector((state) => state.subscriptions);
    const currentMemberSubData = subsData.find(sub => sub.MemberId === memberId)?.Movies;
    const { movies: moviesData } = useSelector((state) => state.movies);
    const unwatchedMovies = moviesData.filter(movie => 
        movie._id !== currentMemberSubData?.find(subMovie => subMovie.movieId === movie._id)?.movieId
    );

    return (
        <div className="page-border3 watched-movies-container">
            <b>Movies Watched</b><br/>
            <button 
                className="subscribe-button"
                onClick={() => setSubscribeVisibility(!subscribeVisibilty)}
            >
                Subscribe to new movie
            </button>
            {subscribeVisibilty && <NewMovieSubscribe unwatchedMovies={unwatchedMovies} memberId={memberId} />}

            <ul className="watched-movies-list">
                {moviesData
                    .filter(movie => 
                        movie._id === currentMemberSubData?.find(
                            currentMovie => currentMovie.movieId === movie._id
                        )?.movieId
                    )
                    .map(movie => {
                        const date = currentMemberSubData.find(
                            currentMovie => currentMovie.movieId === movie._id
                        )?.date.slice(0,10);
                        return (
                            <li key={movie._id}>
                                <Link to="/Main/Movies/all-movies" state={{movieName: movie.Name}}>
                                    {movie.Name} , {date}
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default WatchedMovies;