import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./../styles/Login.css";

function LoginPage({ storeUser }) {
    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.get(
                `https://ride-again.adaptable.app/users?email=${user.email}&password=${user.password}`
            );
            if (!response.data.length) {
                throw new Error("Could not find the user");
            }
            const foundUser = response.data[0];
            console.log(foundUser);
            delete foundUser.password;
            storeUser(foundUser);
            navigate("/");
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError("");
            }, 4000);
        }
    }

    return (
        <div>
            <h2 className="card-title">Login</h2>
            <form className="form-Login" onSubmit={handleSubmit}>
                {/* <div>
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						value={user.username}
						id="username"
						onChange={(e) =>
							setUser({ ...user, [e.target.id]: e.target.value })
						}
					/>
				</div> */}
                <div className="area-block">
                    <div className="email-area">
                        <label className="label-login-form" htmlFor="email">
                            E-Mail Address:{" "}
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, [e.target.id]: e.target.value })}
                        />
                    </div>
                    <div className="password-area">
                        <label className="label-login-form" htmlFor="password">
                            Password:{" "}
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, [e.target.id]: e.target.value })}
                        />
                    </div>
                </div>
                <p className="error">{error}</p>
                <button className="btn-orange">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
