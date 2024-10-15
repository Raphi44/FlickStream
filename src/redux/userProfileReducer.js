const initialProfile={userName:"",userPermissions:sessionStorage.getItem("userPermissions")||[]};

const userProfileReducer=(state=initialProfile,action)=>{

    switch(action.type){

        case 'ADD_UNAME':
            return {...state,userName:action.payload};
        
        case 'ADD_PERMISSIONS':
            return {...state,userPermissions:action.payload};
            
        case 'UPDATE_PERMISSIONS':
            sessionStorage.setItem("userPermissions",action.payload);
            return {...state, userPermissions:action.payload}

        default: return state;
    }
}

export default userProfileReducer;