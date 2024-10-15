const initialMovies={movies:[]}

const applyMoviesChanges=(state=initialMovies ,action)=>{
    if (action.reducerKey !== "movies") return state;

    switch(action.type)
    {
        case 'ADD':
            return {...state, movies:[...state.movies,action.payload]}

        case 'UPDATE':
            return {...state,movies:state.movies.map(movie=>movie._id===action.payload._id?action.payload:movie)}

        case 'DELETE':
            return{...state, movies: state.movies.filter(movie=>movie._id!==action.payload)}

        default: return state;
    }

}





export default applyMoviesChanges;