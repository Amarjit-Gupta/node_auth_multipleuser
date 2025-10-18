import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import logo from "../assets/contact.png"; // image import

const Navbar = () => {

    const [menu, setMenu] = useState(false);

    let auth = localStorage.getItem("userData");

    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userData");
        localStorage.removeItem("userToken");
        navigate("/login");
    }

    return (
        <div className="bg-green-200 h-25 w-[100%] pl-5 pt-3 sticky top-0 left-0">
            <img src={logo} alt="" className="h-20 w-20 float-left" />
            {auth ?
                <>
                    <button className="border h-7 w-7 float-right m-6 rounded md:hidden p-[3px]" onClick={() => setMenu(!menu)}>{menu ? <span className="text-xl"><RxCross2 /></span> : <span className="text-xl"><RxHamburgerMenu /></span>}</button>
                    <ul className={`text-center md:text-right bg-green-300 fixed -right-[100%] top-25 text-2xl rounded ${menu ? "right-0" : ""} h-[100dvh] w-[100%] md:static md:h-0`}>
                        <li className="block p-6 md:inline-block"><NavLink to={"/"}>AllData</NavLink></li>
                        <li className="block p-6 md:inline-block"><NavLink to={"/add"}>AddData</NavLink></li>
                        <li className="block p-6 md:inline-block"><button className="border text-xl p-1 rounded hover:bg-green-300 cursor-pointer" onClick={handleLogout}>Logout</button>&nbsp;&nbsp;({auth ? (JSON.parse(auth)?.name).length > 13 ? (JSON.parse(auth)?.name).slice(0, 11) + ".." : JSON.parse(auth)?.name : ""})</li>
                    </ul>
                </>
                :
                ""
            }
        </div>
    );
};
export default Navbar;