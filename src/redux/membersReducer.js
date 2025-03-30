const initialMembers={members:[]}

const applyMembersChanges=(state=initialMembers ,action)=>{
    if (action.reducerKey !== "members") return state;

    switch(action.type)
    {
        case 'ADD':
            return {...state, members:[...state.members,action.payload]}
        case 'UPDATE':
            return {...state,members:state.members.map(member=>member._id!==action.payload._id?member: action.payload )}
        case 'DELETE':
            return {...state,members:state.members.filter(member=>member._id!==action.payload)}
        default: return state;
    }

}





export default applyMembersChanges;