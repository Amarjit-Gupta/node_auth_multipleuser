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
  return (
    <>
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