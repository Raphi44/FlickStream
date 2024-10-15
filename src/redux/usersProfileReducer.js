const initialUsersProfile = { profiles: [] };

const applyProfilesChanges = (state = initialUsersProfile, action) => {
  if (action.reducerKey !== "profiles") return state;

  switch (action.type) {
    case "ADD":
      return { ...state, profiles: [...state.profiles, action.payload] };

    case "UPDATE":
    return{...state,profiles:
              state.profiles.map(profile=>{
                if(profile.id===action.payload.id)
                  return({...profile,FirstName:action.payload.updatedUserProfile.firstName, LastName:action.payload.updatedUserProfile.lastName,SessionTimeOut:action.payload.updatedUserProfile.sessionTimeOut})
                else
                return {...profile}
              })
            
            }

    case 'DELETE':
            return {...state,profiles: state.profiles.filter(profile=>profile.id!==action.payload.id)}
    default:
      return state;
  }
};

export default applyProfilesChanges;
