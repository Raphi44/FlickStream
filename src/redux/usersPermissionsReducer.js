const initialUsersPermissions={permissions:[]};

const applyPermissionsChanges=(state=initialUsersPermissions,action)=>{
    if (action.reducerKey !== "permissions") return state;

    switch(action.type){
        case 'ADD':
        return {...state,permissions:[...state.permissions,action.payload]}

        case 'UPDATE':
      return {...state, permissions:state.permissions.map((userP)=>{
            if(userP.id===action.payload.id)
                return {id:userP.id, permissions:action.payload.updatedPermissions}
            else
                return userP;
           })}
        case 'DELETE':
            return {...state,permissions: state.permissions.filter(perm=>perm.id!==action.payload.id)}
        default: return state;
    }
}

export default applyPermissionsChanges