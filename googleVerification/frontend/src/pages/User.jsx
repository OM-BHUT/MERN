import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export function User() {
    const [data,setData] = useState({});
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('api/auth/user')
            .then(res=>setData(res.data));
    },[]);
    return (
        <>
            <div
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-auto">
                <a href="#">
                    {data.profilePicture ? (
                        <img className="rounded-t-lg mx-auto w-full" src={data.profilePicture}
                             alt={data.displayName || "User Profile"}/>
                    ) : (
                        <p>No profile picture available</p>
                    )}

                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.displayName}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.email}</p>
                    <button type="button"
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={()=>{
                                axios.get('/api/auth//logout')
                                    .then(res => navigate('/'));
                            }}
                    >Log out
                    </button>
                </div>
            </div>
        </>
    )
}