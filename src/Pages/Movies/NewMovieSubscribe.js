import { useState } from 'react';
import '../../style.css'
import { Select } from "antd";
import axios from 'axios';
import { useDispatch } from 'react-redux';
const subscriptions_API=process.env.REACT_APP_SUBSCRIPTION_API_URL
const cinema_API=process.env.REACT_APP_CINEMA_API_URL

const NewMovieSubscribe = ({unwatchedMovies, memberId}) => {
    const [date, setDate] = useState('');
    const [movie, setMovie] = useState('');
    const dispatch = useDispatch();

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const handleSubmit = async () => {
        try {
            const movieId = unwatchedMovies?.find(unwatchedMovie => unwatchedMovie.Name === movie)?._id;
            const {data} = await axios.post(`${subscriptions_API}/subscribe-movie/${memberId}`, {movieId, date});
            dispatch({
                type: 'UPDATE',
                payload: {
                    _id: data._id,
                    MemberId: data.MemberId,
                    movie: {
                        movieId,
                        date,
                        _id: data.Movies?.find(movie => movie.movieId === movieId)?._id
                    }
                },
                reducerKey: 'subscriptions'
            });
            console.log(data);
            alert(`Successfully subscribed to the movie ${movie}!`);
        } catch(error) {
            alert(`Movie "${movie}" subscription failed`);
            console.log({error: error.message});
        }
    };

    return (
        <div className="subscribe-page">
            <div className="subscribe-form-title">Add a new movie</div>
            <form className="subscribe-form" onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
                <Select
                    showSearch
                    placeholder="Select a movie"
                    optionFilterProp="label"
                    onChange={(value) => setMovie(value)}
                    onSearch={onSearch}
                    style={{ width: '100%' }}
                    options={unwatchedMovies.map(movie => ({
                        value: movie.Name,
                        label: movie.Name
                    }))}
                />
                <input 
                    type="date"
                    className="subscribe-date-input"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    placeholder="Select date"
                />
                <button type="submit" className="subscribe-submit-button">
                    Subscribe
                </button>
            </form>
        </div>
    );
}

export default NewMovieSubscribe;