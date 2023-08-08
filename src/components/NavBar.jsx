import React from "react";
import { NavLink } from "react-router-dom";
// import "./navbar.css";
function NavBar({ removeUser }) {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/src/assets/minions-sleepy-help-me-kg8b2gdcdn4pmlpd.gif" alt="Logo" />
                <button>Add an ad</button>
            </div>
            <div className="navbar-links">
                <NavLink to={"/"}>Home</NavLink>
                {/* { <NavLink to={"/stuff"}>Things with arrays and fav's</NavLink> */}
                {!user && (
                    <>
                        <NavLink to={"/signup"}>Signup</NavLink>
                        <NavLink to={"/login"}>Login</NavLink>
                    </>
                )}
                {user && (
                    <>
                        <button onClick={removeUser}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
