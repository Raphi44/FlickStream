import { useSelector } from "react-redux";
import Member from "./Member";


const AllMembers = () => {

const {members}=useSelector(state=>state.members);
console.log(members)
  return (
    <div>
    <ul>
        {members.map(member=>{return(
            <li key={member._id}><Member member={member}/></li>
       ) })}
    </ul>
    
    </div>
)};

export default AllMembers;
