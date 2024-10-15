import { combineReducers } from "redux";
import usersReducer from './usersReducer';
import profilesReducer from './usersProfileReducer';
import permissionsReducer from "./usersPermissionsReducer";
import moviesReducer from "./moviesReducer";
import membersReducer from "./membersReducer";
import subsReducder from "./subscriptionsReducer";
import userProfileReducer from "./userProfileReducer";
import { createSelector } from "reselect";

const allReducers=combineReducers({
    users: usersReducer,
    profiles:profilesReducer,
    permissions:permissionsReducer,
    movies:moviesReducer,
    members:membersReducer,
    subscriptions:subsReducder,
    userProfile:userProfileReducer
})


const selectUsers=state=>state.users;
const selectMembers=state=>state.members;
const selectSubscriptions=state=>state.subscriptions;
const selectMovies=state=>state.movies;

export const getUsers=createSelector(selectUsers, users=>users.users);
export const getMembers=createSelector(selectMembers, members=>members.members);
export const getSubs=createSelector(selectSubscriptions,subscriptions=>subscriptions.subscriptions);
export const getMovies=createSelector(selectMovies, movies=>movies.movies);

export default allReducers;