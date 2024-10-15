const initialUsers = { users: [] };

const applyUsersChanges = (state = initialUsers, action) => {
  if (action.reducerKey !== "users") return state;

  switch (action.type) {
    case "ADD":
      return { ...state, users: [...state.users, action.payload] };

    case 'UPDATE':
   return({ ...state,users:  state.users.map((user=>{
        if(user._id===action.payload.id)
          return {...user,user:action.payload.user};
        else
        return user;
      }))
   } )

   case 'DELETE':
            return {...state,users: state.users.filter(user=>user._id!==action.payload.id)}

    default:
      return state;
  }
};

export default applyUsersChanges;
