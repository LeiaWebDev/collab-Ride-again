import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./../styles/navbar.css";
import Search from "./Search";

function NavBar({ removeUser, user }) {
    // const user = JSON.parse(localStorage.getItem("user"));
    // const [isLogged, setIsLogged] = useState(!!user);

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
                <NavLink className="btn-orange" to="/createad">
                    Add an ad
                </NavLink>
            </div>
            <Search />
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
                    <>
                        <button className="button-logOut-Navbar" onClick={handleLogout}>
                            Log out
                        </button>
                        {/* <span> BONJOUR {user.firstName}</span> */}
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
