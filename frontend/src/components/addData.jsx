import { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { SiCoursera } from "react-icons/si";
import { MdFormatListNumbered } from "react-icons/md";
import { useNavigate } from "react-router";
import { LuLoaderCircle } from "react-icons/lu";
import Navbar from "./navbar";
import { URL } from "../URL";
import { toast } from 'react-toastify';

const AddData = () => {

    const [inputValue, setInputValue] = useState({
        rollNo: "",
        name: "",
        email: "",
        contact: "",
        course: ""
    });

    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    const handleChange = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.rollNo || !inputValue.name || !inputValue.email || !inputValue.contact || !inputValue.course) {
            setError(true);
            return false;
        }
        else if (inputValue.name.length < 3) {
            toast.warn("name length must be greater than 3...");
            return;
        }
        else if (isNaN(inputValue.contact)) {
            toast.warn("please enter only digit in contact no...");
            return;
        }
        else if (inputValue.contact.length !== 10) {
            toast.warn("please enter 10 digit in contact no...");
            return;
        }
        else if (inputValue.rollNo.trim() && inputValue.name.trim() && inputValue.email.trim() && inputValue.contact.trim() && inputValue.course.trim()) {
            setLoading(true);
            try {
                let result = await fetch(`${URL}/data/addData`, {
                    method: "post",
                    body: JSON.stringify(inputValue),
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `bearer ${JSON.parse(localStorage.getItem("userToken"))}`
                    }
                });
                let data = await result.json();
                // console.log(data);

                if (data.success) {
                    toast.success("data inserted successfully...");
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
                <p className="text-center text-3xl">AddData</p>
                <form onSubmit={handleSubmit}>
                    <div className="border mt-5 h-10 rounded-2xl flex justify-center items-center gap-2">
                        <MdFormatListNumbered className="text-2xl text-gray-500" /><input type="number" placeholder="Enter RollNo..." className="focus:outline-none h-7 w-[80%] text-xl p-2 bg-transparent" value={inputValue.rollNo} name="rollNo" onChange={handleChange} />
                    </div>
                    {error && !inputValue.rollNo && <p className="text-red-500 ml-2">Enter RollNo...</p>}
                    <div className="border mt-5 h-10 rounded-2xl flex justify-center items-center gap-2">
                        <MdDriveFileRenameOutline className="text-2xl text-gray-500" /><input type="text" placeholder="Enter student name..." className="focus:outline-none h-7 w-[80%] text-xl p-2 bg-transparent" value={inputValue.name} name="name" onChange={handleChange} />
                    </div>
                    {error && !inputValue.name && <p className="text-red-500 ml-2">Enter student name...</p>}
                    <div className="border mt-5 h-10 rounded-2xl flex justify-center items-center gap-2">
                        <MdOutlineMailOutline className="text-2xl text-gray-500" /><input type="email" placeholder="Enter student email..." className="focus:outline-none h-7 w-[80%] text-xl p-2 bg-transparent" value={inputValue.email} name="email" onChange={handleChange} />
                    </div>
                    {error && !inputValue.email && <p className="text-red-500 ml-2">Enter student email...</p>}

                    <div className="border mt-5 h-10 rounded-2xl flex justify-center items-center gap-2">
                        <IoIosContact className="text-2xl text-gray-500" /><input type="text" placeholder="Enter student phone no..." className="focus:outline-none h-7 w-[80%] text-xl p-2 bg-transparent" value={inputValue.contact} name="contact" onChange={handleChange} />
                    </div>
                    {error && !inputValue.contact && <p className="text-red-500 ml-2">Enter student phone bo...</p>}

                    <div className="border mt-5 h-10 rounded-2xl flex justify-center items-center gap-2">
                        <SiCoursera className="text-2xl text-gray-500" /><input type="text" placeholder="Enter course name..." className="focus:outline-none h-7 w-[80%] text-xl p-2 bg-transparent" value={inputValue.course} name="course" onChange={handleChange} />
                    </div>
                    {error && !inputValue.course && <p className="text-red-500 ml-2">Enter course name...</p>}

                    <div className="border mt-5 h-10 rounded-2xl flex justify-center items-center gap-2 text-xl hover:bg-gray-200">
                        <button type="submit" disabled={loading} className="cursor-pointer h-[100%] w-[100%] border-0 rounded-xl disabled:text-gray-400">{loading ? <span className="flex justify-center items-center gap-3">Adding... <LuLoaderCircle className="animate-spin" /></span> : "Add"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddData;