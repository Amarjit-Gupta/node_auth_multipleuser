import { Navigate, Outlet } from "react-router";

const PrivateComponent = () => {
    let auth = localStorage.getItem("userToken");
    return(auth?<Outlet/>:<Navigate to={"/login"}/>)
}

export default PrivateComponent;