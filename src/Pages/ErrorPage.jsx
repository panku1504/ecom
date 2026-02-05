
import { Link, useNavigate } from "react-router-dom";
import Hero from "../Components/Hero";
import { useEffect } from "react";

export default function ErrorPage() {
    let navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("Login")) {
            if (localStorage.getItem("role") !== "buyer" && window.location.pathname === "/admin")
                navigate(0)
            else if (window.location.pathname === "/profile")
                navigate(0)
        }
    }, [])
    return (
        <main className="main">
            <Hero title="404! page not found" />
            <div className="container">
                <div className="my-5 py-5 text-center">
                    <h1>404! page not found</h1>
                    <Link to="/" className="btn btn-dark px-5">back to home page</Link>
                </div>
            </div>
        </main>
    )
}
