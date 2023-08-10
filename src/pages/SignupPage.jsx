import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./../styles/signup.css";

function SignupPage() {
    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    /**
     * In this handlesubmit, we create a new user in the backend by doing a post request.
     * Then we navigate the user to the /login page
     */
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // const createdUser = {
            // 	username: user.username,
            // 	password: user.password,
            // 	email: user.email,
            // }
            await axios.post("https://ride-again.adaptable.app/users", user);
            navigate("/login");
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError("");
            }, 4000);
        }
    }
    return (
        <div>
            <h2>Signup</h2>
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
                            E-mail:{" "}
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
                <button className="btn-orange">Signup</button>
            </form>
        </div>
    );
}
export default SignupPage;
