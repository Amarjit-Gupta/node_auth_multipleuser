import { useEffect, useState } from "react";
import AddData from "./components/addData";
import AllData from "./components/allData";
import EditData from "./components/editData";
import Error from "./components/Error";
import Login from "./components/login";
import PrivateComponent from "./components/privateComponent";
import Signup from "./components/signup"
import { BrowserRouter, Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';

const App = () => {
  
  const [load,setLoad] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoad(false);
    },500);
  },[]);

  return (
    <>
    {load?<div className="h-[100vh] w-[100%] bg-black flex justify-center items-center fixed z-10"><img src="./images/loader1.gif" alt="" className="h-30 w-40" /></div>:""}
    <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path={"/"} element={<AllData />} />
            <Route path={"/add"} element={<AddData />} />
            <Route path={"/edit/:id"} element={<EditData />} />
          </Route>

          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"*"} element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;