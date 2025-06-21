import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Subscribers = ({movieId}) => {
    const {subscriptions: subsData} = useSelector((state) => state.subscriptions);
    const { members: membersData } = useSelector((state) => state.members);

    // Create a map to store unique members with their most recent viewing date
    const uniqueSubscribers = new Map();

    // Process all subscriptions and store only the most recent viewing for each member
    subsData
        .filter(sub => sub.Movies?.find(movie => +movie.movieId === +movieId))
        .forEach(sub => {
            const memberName = membersData.find(member => member._id === sub.MemberId)?.Name;
            if (!memberName) return;

            const movieData = sub.Movies.find(movie => +movie.movieId === +movieId);
            const date = new Date(movieData.date);
            
            // If member already exists, only update if this date is more recent
            if (!uniqueSubscribers.has(memberName) || date > uniqueSubscribers.get(memberName)) {
                uniqueSubscribers.set(memberName, date);
            }
        });

    // Convert the map to an array and sort by date
    const sortedSubscribers = Array.from(uniqueSubscribers.entries())
        .sort((a, b) => b[1] - a[1]) // Sort by date, most recent first
        .map(([memberName, date]) => {
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
            return { memberName, formattedDate };
        });

    return (
        <div className='page-border3' style={{width: "300px", height: "220px"}}>
            <h6>Subscriptions watched</h6>
            <ul>
                {sortedSubscribers.map(({memberName, formattedDate}) => (
                    <li key={memberName}>
                        <Link to="/Main/Subscriptions/all-members" state={{memberName}}>
                            {memberName}, {formattedDate}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Subscribers;