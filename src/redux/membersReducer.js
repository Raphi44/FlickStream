const initialMembers={members:[]}

const applyMembersChanges=(state=initialMembers ,action)=>{
    if (action.reducerKey !== "members") return state;

    switch(action.type)
    {
        case 'ADD':
            return {...state, members:[...state.members,action.payload]}

        default: return state;
    }

}





export default applyMembersChanges;