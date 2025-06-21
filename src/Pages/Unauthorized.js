import { useNavigate } from "react-router";
import "../styles/variables.css";
import "../styles/base.css";
import "../styles/components.css";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1 className="unauthorized-title">Access Denied</h1>
        <div className="unauthorized-icon">⚠️</div>
        <p className="unauthorized-message">
          You do not have permission to view this page.
        </p>
        <button 
          className="movies-nav-button"
          onClick={() => navigate("/Main")}
        >
          Return to Main Page
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;