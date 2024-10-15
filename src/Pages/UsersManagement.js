import "../style.css";
import { Outlet } from "react-router";

function UsersManagement() {
 


  return (
    <div className="page-border1">
    <h2>Users</h2> <br />
  
      

      <Outlet />
    </div>
  );
}

export default UsersManagement;
