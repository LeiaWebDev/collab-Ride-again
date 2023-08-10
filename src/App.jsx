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
// import IsLoggedIn from "./components/IsLoggedIn";
import OneBike from "./pages/OneBike";
import OrderDetails from "./pages/OrderDetails";
import SeeMyAds from "./pages/SeeMyAds";
import SearchResult from "./pages/SearchResult";
import Search from "./components/Search";

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    // const [ads, setAds] = useState([]);
    // const [searchString, setSearchString] = useState("");

    function storeUser(userArg) {
        setUser(userArg);
        localStorage.setItem("user", JSON.stringify(userArg));
    }

    function removeUser() {
        setUser(null);
        localStorage.removeItem("user");
    }

    // for search bar
    // console.log(searchString);
    // let adsToDisplay;
    // if (!searchString) {
    //     adsToDisplay = ads;
    // } else {
    //     adsToDisplay = ads.filter((ad) => ad.title.toLowerCase().includes(searchString.toLowerCase()));
    // }

    return (
        <>
            <NavBar removeUser={removeUser} user={user} />
            {/* <Search searchString={searchString} handleSearch={setSearchString} /> */}
            {/* <SearchResult ads={ads} /> */}
            {user && (
                <h2 className="welcome">
                    Welcome {user.firstName} {user.lastName}!
                </h2>
            )}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage storeUser={storeUser} />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/createad" element={<CreateAd user={user} />} />
                <Route path="/validated-ad/" element={<ValidatedAd />} />
                {/* <Route path="/seemyads" element={<SeeMyAds />} /> */}
                <Route path="/ads/my-ads" element={<SeeMyAds user={user} />} />
                <Route path="/bike/:id" element={<OneBike />} />
                {/* <Route path="/ad/:id" element={<OneBike />} /> */}
                <Route path="/orderdetails/:id" element={<OrderDetails />} />
                {/* <Route path="/edit-ad/:id" element={<EditAd />} /> */}
                <Route path="/search-result" element={<SearchResult />} />
                {/* <Route path="/favorites" element={<IsLoggedIn user={user}><Favoriting user={user} />
						    </IsLoggedIn>}/> */}
            </Routes>
        </>
    );
}

export default App;
