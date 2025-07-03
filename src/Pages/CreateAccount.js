import axios from "axios";
import { useState } from "react";
import "../styles/components.css";
import { useNavigate } from "react-router";
const cinema_API = process.env.REACT_APP_CINEMA_API_URL;

function CreateAcc() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(`${cinema_API}/create-user`, { user, password });
      console.log("User created successfully", resp);
      navigate("/login");
    } catch (error) {
      setError("User creation failed. Please try again.");
      console.log("User creation failed", error);
    }
  };

  return (
    <div className="create-account-page">
      <div className="create-account-container">
        <h1 className="create-account-title">Create an Account</h1>
        <form className="create-account-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              className="form-input"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn btn-primary create-account-button">Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateAcc;
