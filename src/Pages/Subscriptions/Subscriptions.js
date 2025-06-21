import { Outlet, useNavigate } from "react-router";
import "../../style.css"
import { useState } from "react";

function Subscriptions() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("all");

  return (
    <div className="page-border1">
      <h2 className="section-title">Subscriptions</h2>
      
      <div className="subscription-nav-buttons">
        <button 
          className={`subscription-nav-button ${activeButton === "all" ? "active" : ""}`}
          onClick={() => {
            setActiveButton("all");
            navigate("all-members");
          }}
        >
          All Members
        </button>
        <button 
          className={`subscription-nav-button ${activeButton === "add" ? "active" : ""}`}
          onClick={() => {
            setActiveButton("add");
            navigate('add-member');
          }}
        >
          Add Member
        </button>
      </div>

      <Outlet />
    </div>
  );
}

export default Subscriptions;