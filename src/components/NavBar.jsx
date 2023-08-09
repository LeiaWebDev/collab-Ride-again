import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./../styles/navbar.css";

function NavBar({ removeUser }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [isLogged, setIsLogged] = useState(!!user);

    const handleLogout = () => {
        removeUser();
        setIsLogged(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <div>
                    <img src="/public/rideAgainLOGO.png" alt="Logo" />
                </div>
                <div className="btn-block">
                    <button className="btn-orange">Add an ad</button>
                </div>
            </div>
            <div className="navbar-links">
                <NavLink to={"/"}>Home</NavLink>
                {/* <NavLink to={"/stuff"}>Things with arrays and fav's</NavLink> */}

                {!isLogged ? (
                    <>
                        <NavLink to={"/signup"}>Sign Up</NavLink>
                        <NavLink to={"/login"}>Login</NavLink>
                    </>
                ) : (
                    <button onClick={handleLogout}>Log out</button>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
