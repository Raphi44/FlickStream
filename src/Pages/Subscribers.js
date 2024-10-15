import { useSelector } from "react-redux";

export const Subscribers = ({movieId}) => {
    const {subscriptions:subsData} =useSelector((state)=>state.subscriptions);
    const { members: membersData } = useSelector((state) => state.members);



  return (
    <div className='page-border3'>
        <h6>Subscriptions watched</h6>
    <ul>
        {
            subsData.filter(sub=>sub.Movies.find(movie=>+movie.movieId===movieId)).map(sub=>{
                const memberName = membersData.find(member=>+member._id===+sub.MemberId).Name;
                const date =sub.Movies.find(movie=>+movie.movieId===+movieId).date.slice(0,10);
                const formattedDate=`${date.slice(8,10)}/${date.slice(5,7)}/${date.slice(0,4)}`
                return <li key={sub._id} >{memberName}, {formattedDate}</li>


            }) }
    </ul>
    </div>

  )
}

export default Subscribers;