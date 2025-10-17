import { useEffect, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router";
import Navbar from "./navbar";
import { LuLoaderCircle } from "react-icons/lu";
import { URL } from "../URL";
import { toast } from 'react-toastify';

const Signup = () => {

    const [inputValue, setInputValue] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        let auth = localStorage.getItem("userToken");
        if (auth) {
            navigate("/");
        }
    }, []);

    const handleChange = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.name || !inputValue.email || !inputValue.password) {
            setError(true);
            return false;
        }
        else if (inputValue.name.length < 3) {
            toast.warn("name length must be greater than 3...");
            return;
        }
        else if (inputValue.password.length <= 4) {
            toast.warn("password length should be greater than 4...");
            return;
        }
        else if (inputValue.name.trim() && inputValue.email.trim() && inputValue.password.trim()) {
            setLoading(true);
            try {
                let result = await fetch(`${URL}/auth/signup`, {
                    method: "post",
                    body: JSON.stringify(inputValue),
                    headers: { "Content-Type": "application/json" }
                });
                let data = await result.json();
                if (data.success && data.token) {
                    let user = data.result;
                    let token = data.token;
                    localStorage.setItem("userData", JSON.stringify(user));
                    localStorage.setItem("userToken", JSON.stringify(token));
                    toast.success("user signup successfully...");
                    setLoading(false);
                    navigate("/");
                }
                else {
                    toast.error(data.message);
                    setLoading(false);
                }
            }
            catch (err) {
                toast.error("something went wrong...", err.message);
                setLoading(false);
            }
        }
        else {
            toast.warn("white space is not allowed...");
        }
    }

    return (
        <div>
            <Navbar />
            <div className="border bg-gray-100 w-80 pt-6 pl-8 pr-8 pb-8 m-auto mt-20 rounded-xl md:w-100">
                <p className="text-center text-3xl">Signup</p>
                <p className="text-center text-xl">create your account</p>
                <form onSubmit={handleSubmit}>
                    <div className="border mt-5 h-10 rounded-2xl flex justify-center items-center gap-2">
                        <MdDriveFileRenameOutline className="text-2xl text-gray-500" /><input type="text" placeholder="Enter name..." className="focus:outline-none h-7 w-[80%] text-xl p-2 bg-transparent" value={inputValue.name} name="name" onChange={handleChange} />
                    </div>
                    {error && !inputValue.name && <p className="text-red-500 ml-2">Enter name...</p>}
                    <div className="border mt-5 h-10 rounded-2xl flex justify-center items-center gap-2">
                        <MdOutlineMailOutline className="text-2xl text-gray-500" /><input type="email" placeholder="Enter email..." className="focus:outline-none h-7 w-[80%] text-xl p-2 bg-transparent" value={inputValue.email} name="email" onChange={handleChange} />
                    </div>
                    {error && !inputValue.email && <p className="text-red-500 ml-2">Enter email...</p>}
                    <div className="border mt-5 h-10 rounded-2xl flex justify-center items-center gap-2">
                        <RiLockPasswordLine className="text-2xl text-gray-500" /><input type="password" placeholder="Enter password..." className="focus:outline-none h-7 w-[80%] text-xl p-2 bg-transparent" value={inputValue.password} name="password" onChange={handleChange} />
                    </div>
                    {error && !inputValue.password && <p className="text-red-500 ml-2">Enter password...</p>}
                    <div className="border mt-5 h-10 rounded-2xl flex justify-center items-center gap-2 text-xl hover:bg-gray-200">

                        {/* <button type="submit" className="cursor-pointer h-[100%] w-[100%] border-0 rounded-xl">SignUp</button> */}

                        <button type="submit" disabled={loading} className="cursor-pointer h-[100%] w-[100%] border-0 rounded-xl disabled:text-gray-400">{loading ? <span className="flex justify-center items-center gap-3">SignUp in... <LuLoaderCircle className="animate-spin" /></span> : "SignUp"}</button>

                    </div>
                    <p className="text-center mt-3">Already have an account? <Link to={"/login"} className="text-red-500 underline">Login</Link></p>
                </form>
            </div>
        </div>
    );
};
export default Signup;