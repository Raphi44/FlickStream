const initialSubscriptions={subscriptions:[]};

const applySubscriptionsChanges=(state=initialSubscriptions,action)=>{

    if(action.reducerKey!=="subscriptions")
        return state;

    switch(action.type){

        case "ADD":
        return {...state,subscriptions:[...state.subscriptions,action.payload]};
        

        default: return state;
    }
}

export default applySubscriptionsChanges;