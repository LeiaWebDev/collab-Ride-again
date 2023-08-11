import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ValidatedAd from "./ValidatedAd";
import axios from "axios";
import CreateAd from "./CreateAd";
import EditAd from "./EditAd";
import "./../styles/seemyads.css";

function SeeMyAds({ user }) {
    const [myAds, setMyAds] = useState(null);
    const navigate = useNavigate();

    const API_URL = "https://ride-again.adaptable.app/ads";

    async function fetchMyAds() {
        try {
            const response = await axios.get(`${API_URL}?userId=${user.id}`);
            setMyAds(response.data);
            console.log(response.data);
            // navigate(`/validated-ad/${createdAd.id}`)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMyAds();
    }, []);

    if (!myAds) {
        return <div className="loading">Loading...</div>;
    }

    async function handleDeleteAd(adId) {
        try {
            await axios.delete(`${API_URL}/${adId}`);
            fetchMyAds();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1 className="title-see-my-ads">My Ads</h1>
            {myAds.map((myAd) => {
                return (
                    <>
                        <div className="main-see-ads-block">
                            <div className="MyAds" key={myAd.id}>
                                <div className="seeMyAds-page">
                                    <div className="picture-one-bike">
                                        <img src={myAd.image} alt="bike image" />
                                    </div>
                                    <div className="infos-one-bike">
                                        <h2 className="subtitle-one-bike-long">{myAd.title}</h2>
                                        <h2 className="subtitle-one-bike">{myAd.type} bike</h2>
                                        <h3 className="subtitle-one-bike">{myAd.status} condition</h3>
                                        <h3 className="subtitle-one-bike">Brand: {myAd.brand}</h3>
                                        <h3 className="subtitle-one-bike">Model: {myAd.model}</h3>
                                        <h3 className="subtitle-one-bike">Usage: {myAd.usage}</h3>
                                        <h3 className="subtitle-one-bike-long">Description: {myAd.description}</h3>
                                        <h3 className="subtitle-one-bike">Delivery method : {myAd.delivery}</h3>
                                        <h3 className="subtitle-one-bike-long">Pick up location: {myAd.pickup}</h3>
                                        <h2 className="subtitle-one-bike">{myAd.price} Euros</h2>
                                    </div>
                                    {/* <p>{myAd.userId}</p> */}

                                    {/* <Link to={`/edit-ad/${myAd.id}`}>
                <button >Edit</button>
                </Link> */}
                                </div>
                            </div>
                            <div className="button-delete-my-ads">
                                <button className="btn-orange" onClick={() => handleDeleteAd(myAd.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </>
                );
            })}
        </>
    );
}

export default SeeMyAds;
