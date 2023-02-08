import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Authentication/login";
import Home from "./home";
import SignupForm from "./Authentication/signup";
import Profile from "../pages/Profile/Profile";
import CompleteYourProfile from "./completeprofile";
import Confess from "../pages/Confession/confess";

const RoutesDefiner = () => {
    return (
        <BrowserRouter>
        <Routes>
            {/* <Route path='/' element={<Home/>}></Route>
            <Route path='login' element={<LoginForm/>}></Route>
            <Route path='register' element={<SignupForm/>}></Route>
            <Route path='completeprofile' element={<CompleteYourProfile/>}></Route>
            <Route path='profile' element={<Profile/>}></Route>  */}
            <Route path='confess' element={<Confess/>}></Route> 
            <Route path='*' element={<Confess/>}></Route> 
            <Route path='/' element={<Confess/>}></Route> 
        </Routes>
        </BrowserRouter>
    );
}

export default RoutesDefiner;