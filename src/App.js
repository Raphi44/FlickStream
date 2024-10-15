import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./Login";
import CreateAcc from "./CreateAccount";
import MainPage from "./Pages/MainPage";
import Movies from "./Pages/Movies";
import UsersManagement from "./Pages/UsersManagement";
import Subscriptions from "./Pages/Subscriptions";
import EditUser from "./Pages/EditUser";
import Users from "./Pages/Users";
import AddUser from "./Pages/AddUser";
import AllMovies from "./Pages/AllMovies";
import UnauthorizedPage from "./Pages/Unauthorized";
import ProtectedRoute from "./utils/PermissionHandle";
import AddMovie from "./Pages/AddMovie";
import MovieEdit from "./Pages/ MovieEdit";
import AllMembers from "./Pages/AllMembers";
import EditMember from "./Pages/EditMember";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route element={<LoginPage />} path="/Login" />
        <Route element={<CreateAcc />} path="/Create-Account" />
        <Route path="/unauthorized" element={<UnauthorizedPage /> } />
        <Route element={<MainPage />} path="/Main">
          <Route element={<Movies />} path="Movies">
          <Route element={<ProtectedRoute requiredPermission="UpdateMovies"> <MovieEdit /> </ProtectedRoute>} path="edit-movie" />
          <Route element={<ProtectedRoute requiredPermission="CreateMovies"> <AddMovie/>   </ProtectedRoute> } path="add-movie" />
          <Route index element={<ProtectedRoute requiredPermission="ViewMovies"><AllMovies/> </ProtectedRoute>} />
          <Route element={<ProtectedRoute requiredPermission="ViewMovies">   <AllMovies /> </ProtectedRoute> } path="all-movies"/>
          </Route>
          <Route element={<ProtectedRoute requiredPermission="UpdateSubscriptions"><EditMember/></ProtectedRoute>} path="edit-member" />

          <Route element={<Subscriptions />} path="Subscriptions">
          <Route index element={<ProtectedRoute requiredPermission="ViewSubscriptions"><AllMembers/> </ProtectedRoute>} />
          <Route element={<ProtectedRoute requiredPermission="ViewSubscriptions"><AllMembers/> </ProtectedRoute>} path="all-members"/>

          </Route>


          <Route element={<UsersManagement />} path="Users-Management">
            <Route index element={<Users />} />
            <Route element={<Users />} path="all-users"> 
              <Route element={<AddUser />} path="add-user" />
            </Route>
            <Route element={<EditUser />} path="edit-user/:id" />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
