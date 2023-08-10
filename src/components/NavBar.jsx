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
                    <img src="/Logo-Ride-Again-square.png" alt="Logo" />
                </div>
                <NavLink className="btn-orange" to="/createad">
                    Create an ad
                </NavLink>
            </div>
            <Search />
            <div className="navbar-links">
                <NavLink to={"/"}>
                    <img className="login-icon" src="/home.png" alt="home" />
                </NavLink>
                {/* <Search onSearch={handleSearch}/> */}
                {!user ? (
                    // {!isLogged ? (
                    <>
                        <NavLink to={"/signup"}>
                            <img className="login-icon" src="/signin-icon.png" alt="Sign Up" />
                        </NavLink>
                        <NavLink to={"/login"}>
                            <img className="login-icon" src="/account.png" alt="Sign in" />
                        </NavLink>
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
