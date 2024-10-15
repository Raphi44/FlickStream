import { useSelector } from "react-redux";
import { Navigate } from "react-router";
const ProtectedRoute=({requiredPermission,children})=>{
    const {userPermissions}=useSelector(state=>state.userProfile)


    if(!hasPermission(requiredPermission,userPermissions)){
        return <Navigate to="/unauthorized" />;
    }
    return children;
}

export const hasPermission=(requiredPermission,permissionsList)=>{
    return permissionsList.includes(requiredPermission);
}

export default ProtectedRoute;