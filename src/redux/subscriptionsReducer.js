

const initialSubscriptions={subscriptions:[]};

const applySubscriptionsChanges=(state=initialSubscriptions,action)=>{

    if(action.reducerKey!=="subscriptions")
        return state;

    switch(action.type){

        case "ADD":
        return {...state,subscriptions:[...state.subscriptions,action.payload]};
        
        case "UPDATE":
        
       
           const sub=  state.subscriptions.find(sub=>sub?.MemberId===action.payload?.MemberId)

                if(sub)
                  {  

                return {...state,subscriptions:[...state.subscriptions,  {...sub,Movies:[...sub.Movies,action.payload.movie]}]}
                  }
                  else
                  {

                    return {...state,subscriptions:[...state.subscriptions, {_id:action.payload._id,MemberId:action.payload.MemberId,Movies:[action.payload.movie]}]}
                  }
            
        case "DELETE":
             return {...state,subscriptions: state.subscriptions.filter(sub=>sub.MemberId!==action.payload)}
            
             default: return state;
    }
}

export default applySubscriptionsChanges;