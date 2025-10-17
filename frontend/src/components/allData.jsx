import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./navbar";
import { URL } from "../URL";
import { toast } from 'react-toastify';

const AllData = () => {

    const [value, setValue] = useState([]);

    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    const getData = async () => {
        try {
            setLoading(true);
            let result = await fetch(`${URL}/data/getData`, {
                headers: {
                    "authorization": `bearer ${JSON.parse(localStorage.getItem("userToken"))}`
                }
            });
            let data = await result.json();
            // console.log(data);
            if (Array.isArray(data.result)) {
                setValue(data?.result);
                setLoading(false);
            }
        }
        catch (err) {
            setLoading(false);
            toast.error("something went wrong...");
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (index) => {
        try {
            let a = confirm("are you sure...");
            if (a) {
                let result = await fetch(`${URL}/data/delete/${index}`, {
                    method: "delete",
                    headers: {
                        "authorization": `bearer ${JSON.parse(localStorage.getItem("userToken"))}`
                    }
                });

                let data = await result.json();
                if (data.success) {
                    getData();
                    toast.success("data deleted...");
                }
                else {
                    toast.error("data not delete...");
                }
            }
            else {
                toast.error("data not delete...");
            }
        }
        catch (err) {
            toast.error("something went wrong...");
        }
    }

    const handleChange = async (e) => {
        let key = e.target.value;
        try {
            if (key) {
                setLoading(true);
                let result = await fetch(`${URL}/data/search/${key}`, {
                    headers: {
                        "authorization": `bearer ${JSON.parse(localStorage.getItem("userToken"))}`
                    }
                });
                let data = await result.json();
                if (data.success) {
                    setValue(data.result);
                    setLoading(false);
                }
            }
            else {
                getData();
            }
        }
        catch (err) {
            setLoading(false);
            toast.error("something went wrong...");
        }
    }

    return (
        <div>
            <Navbar />
            <p className="text-2xl md:text-3xl text-center m-7 underline">Student Information</p>
            <div className="w-80 m-auto overflow-auto lg:w-245.5 rounded">
                <input type="search" className="border h-9 w-60 rounded mb-2 text-xl p-1 focus:outline-0" placeholder="Search here..." onChange={handleChange} />
                <div className="border w-80 m-auto overflow-auto lg:w-245.5 rounded">
                    <div className="flex font-medium w-245">
                        <div className="border w-20 h-10 text-center text-xl py-1">RollNo</div>
                        <div className="border w-45 h-10 text-center text-xl py-1">Name</div>
                        <div className="border w-65 h-10 text-center text-xl py-1">Email Id</div>
                        <div className="border w-35 h-10 text-center text-xl py-1">Contact No</div>
                        <div className="border w-40 h-10 text-center text-xl py-1">Course</div>
                        <div className="border w-40 h-10 text-center text-xl py-1">Operation</div>
                    </div>

                    <div>{loading ? <div className="h-15 w-15 border m-auto mt-3 mb-3"><img src="./images/loader.gif" alt="" /></div> :
                        <>
                            {
                                value.length ?
                                    value.map((v, i) => {
                                        return (
                                            <div className="flex w-245" key={v._id}>
                                                <div className="border w-20 h-10 text-center text-xl py-1">{String(v.rollNo).length > 6 ? String(v.rollNo).slice(0, 4) + ".." : v.rollNo}</div>
                                                <div className="border w-45 h-10 text-center text-xl py-1">{v.name.length > 14 ? v.name.slice(0, 12) + ".." : v.name}</div>
                                                <div className="border w-65 h-10 text-center text-xl py-1">{v.email.length > 23 ? v.email.slice(0, 21) + ".." : v.email}</div>
                                                <div className="border w-35 h-10 text-center text-xl py-1">{v.contact}</div>
                                                <div className="border w-40 h-10 text-center text-xl py-1">{v.course.length > 10 ? v.course.slice(0, 8) + ".." : v.course}</div>
                                                <div className="border w-40 h-10 flex justify-center items-center gap-4">
                                                    <button className="border px-3 py-1 rounded cursor-pointer hover:bg-gray-200 font-medium" onClick={() => navigate(`/edit/${v._id}`)}>Edit</button>
                                                    <button className="border px-3 py-1 rounded cursor-pointer hover:bg-gray-200 font-medium" onClick={() => handleDelete(v._id)}>Delete</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <p className="text-2xl lg:text-3xl text-center m-3">Data not found</p>
                            }
                        </>
                    }</div>
                </div>
            </div>
        </div>
    );
};
export default AllData;