import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./../styles/navbar.css";
import Search from "./Search";

function NavBar({ removeUser, user }) {
    // const user = JSON.parse(localStorage.getItem("user"));
    // const [isLogged, setIsLogged] = useState(!loggedUser);

    const handleLogout = () => {
        removeUser();
        // setIsLogged(false);
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
                {/* <Search onSearch={handleSearch}/> */}
                {!user ? (
                // {!isLogged ? (
                    <>
                        <NavLink to={"/signup"}>Sign Up</NavLink>
                        <NavLink to={"/login"}>Login</NavLink>
                    </>
                ) : (
                    <button onClick={handleLogout}>Log out</button>
                )}
            </div>
            <Search/>
        </nav>
    );
}

export default NavBar;
