const initialMovies={movies:[]}

const applyMoviesChanges=(state=initialMovies ,action)=>{
    if (action.reducerKey !== "movies") return state;

    switch(action.type)
    {
        case 'ADD':
            return {...state, movies:[...state.movies,action.payload]}

        case 'UPDATE':
            // First remove the old movie with the same _id
            const filteredMovies = state.movies.filter(movie => movie._id !== action.payload._id);
            // Then add the updated movie
            return {...state, movies: [...filteredMovies, action.payload]}

        case 'DELETE':
            return{...state, movies: state.movies.filter(movie=>movie._id!==action.payload)}

        default: return state;
    }
}

export default applyMoviesChanges;