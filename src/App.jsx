import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import CreateAd from "./pages/CreateAd";
import ValidatedAd from "./pages/ValidatedAd";
// import Favoriting from "./pages/Favoriting"
import IsLoggedIn from "./components/IsLoggedIn";
import OneBike from "./pages/OneBike";

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    function storeUser(userArg) {
        setUser(userArg);
        localStorage.setItem("user", JSON.stringify(userArg));
    }

    function removeUser() {
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <>
            {/* <HomePage/> */}
            <NavBar removeUser={removeUser} />

            {user && (
                <h1>
                    Welcome {user.firstName} {user.lastName}!
                </h1>
            )}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage storeUser={storeUser} />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/createad" element={<CreateAd />} />
                <Route path="/validatedad" element={<ValidatedAd />} />
                <Route path="/bike/:id" element={<OneBike />} /> {/* Ajoutez cette ligne pour la page de description */}
                {/* Added a Route protection, see IsLoggedIn component for more info */}
                {/* <Route
					path="/favorites"
					element={
						<IsLoggedIn user={user}>
							<Favoriting user={user} />
						</IsLoggedIn>
					}
				/> */}
            </Routes>
        </>
    );
}

export default App;
