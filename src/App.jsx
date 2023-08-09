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
import IsLoggedIn from "./components/IsLoggedIn"
import SeeMyAds from './pages/SeeMyAds'
import OneBike from "./pages/OneBike"
import Search from "./components/Search";



function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [searchString, setSearchString] = useState("")
  const [ads, setAds] = useState([])





	function storeUser(userArg) {
		setUser(userArg)
		localStorage.setItem("user", JSON.stringify(userArg))
	}

	function removeUser() {
		setUser(null)
		localStorage.removeItem("user")
	}

// for search bar
  console.log(searchString)
  let adsToDisplay;
  if(!searchString){
    adsToDisplay = ads
  } else {
    adsToDisplay = ads.filter((ad) =>
    ad.title.toLowerCase().includes(searchString.toLowerCase()
    ))
  }


  return (
    <>
      {/* <HomePage/> */}
      <NavBar removeUser={removeUser} />
      <Search searchString = {searchString} handleSearch = {setSearchString}/>
    
			{user && <h1>Welcome {user.firstName} {user.lastName}!</h1>}
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage storeUser={storeUser} />} />
				<Route path="/signup" element={<SignupPage />} />
        <Route path="/createad" element={<CreateAd user={user} />} />
        <Route path="/validated-ad/:id" element={<ValidatedAd />} />
        {/* <Route path="/seemyads" element={<SeeMyAds />} /> */}
        <Route path="/ads/:adId" element={<SeeMyAds />} />
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
