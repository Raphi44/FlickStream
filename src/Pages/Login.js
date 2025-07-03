import { useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const cinema_API=process.env.REACT_APP_CINEMA_API_URL

function LoginPage() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(cinema_API)
      const {data: token} = await axios.post(`${cinema_API}/login`, {user: userName, password: password});
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user name', userName);
      
      const {data: userLoginData} = await axios.post(`${cinema_API}/user`, {user: userName});
      const {data: userProfileData} = await axios.get(`${cinema_API}/user/${userLoginData._id}`);
      const fullName = userProfileData.userProfile.FirstName + " " + userProfileData.userProfile.LastName;

      sessionStorage.setItem('userPermissions', userProfileData.userPermissions.permissions);
      sessionStorage.setItem('userName', fullName);
      dispatch({type: 'ADD_UNAME', payload: fullName});
      dispatch({type: 'ADD_PERMISSIONS', payload: userProfileData.userPermissions.permissions});

      navigate("/Main");
    } catch(err) {
      if(err.response && err.response.status === 400) {
        setError(err.response.data.error);
        setPassword("");
      }
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please sign in to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <div className="input-group">
              <img src="./avatar.png" alt="user icon" className="input-icon" />
              <input
                className="form-input"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-group">
              <img src="./padlock.png" alt="password icon" className="input-icon" />
              <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn btn-primary login-button">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>New to Movies & Subscriptions?</p>
          <Link to="/Create-Account" className="create-account-link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
