import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./../styles/navbar.css";
import Search from "./Search";

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
                <img src="/src/assets/minions-sleepy-help-me-kg8b2gdcdn4pmlpd.gif" alt="Logo" />
                <button>Add an ad</button>
            </div>
            <div className="navbar-links">
                <NavLink to={"/"}>Home</NavLink>               
                {/* <Search onSearch={handleSearch}/> */}
                {!isLogged ? (
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
