import {Outlet} from "react-router-dom";

export function Layout() {
    console.log('layout is rendered')
    return (
        <>
            <h2 className="text-4xl font-extrabold dark:text-black">Learning</h2>

            <Outlet/>
        </>
    )
}