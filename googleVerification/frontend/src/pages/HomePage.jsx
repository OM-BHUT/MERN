import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export function HomePage() {
    const [date,setData] = useState();

    return (
        <>
            <Link to={'/signUp'}>SignUp</Link>
            <br/>
            <Link to={'/login'}>login</Link>
        </>
    )
}