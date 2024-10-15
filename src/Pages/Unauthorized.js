import { useNavigate } from "react-router";

const UnauthorizedPage = () => {
    const navigate=useNavigate();
  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You do not have permission to view this page.</p>

      <button onClick={()=>navigate("/Main")}>Main Page</button>
    </div>
  );
};

export default UnauthorizedPage;