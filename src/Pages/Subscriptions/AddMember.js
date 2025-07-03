import { useState } from "react"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import axios from 'axios';
const subscriptions_API=process.env.REACT_APP_SUBSCRIPTION_API_URL

const AddMember = () => {
    const [memberName,setMemberName]=useState()
    const [memberEmail,setMemberEmail]=useState()
    const [memberCity,setMemberCity]=useState()
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleSubmit=async()=>{
        const {data}=await axios.post(`${subscriptions_API}/add-member`,{Name:memberName,Email:memberEmail,City:memberCity});
        dispatch({type:"ADD",payload:{_id:data._id,Name:memberName,Email:memberEmail,City:memberCity},reducerKey:'members'});
        navigate('/Main/Subscriptions');
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Add New Member</h2>
            <form onSubmit={e=>{e.preventDefault();handleSubmit();}}>
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input 
                        type="text"
                        className="form-input"
                        onChange={(e)=>setMemberName(e.target.value)}
                        placeholder="Enter member name"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input 
                        type="email"
                        className="form-input"
                        onChange={(e)=>setMemberEmail(e.target.value)}
                        placeholder="Enter email address"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">City</label>
                    <input 
                        type="text"
                        className="form-input"
                        onChange={(e)=>setMemberCity(e.target.value)}
                        placeholder="Enter city"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="form-submit-button">Save</button>
                    <button 
                        type="button" 
                        className="form-cancel-button"
                        onClick={()=>navigate("/Main/Subscriptions/all-members")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddMember;