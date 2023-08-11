// import React from "react";
// import SeeMyAds from "./SeeMyAds";
// import CreateAd from "./CreateAd";
import { Link, useParams } from "react-router-dom";
import "./../styles/validatedAds.css";

function ValidatedAd() {
    const { id } = useParams();

    return (
        <div>
            <div className="validatedAd-area-block">
                <h3>Congratulations, you created your ad</h3>

                <Link className="validatedAd-link-area" to={`/ads/my-ads`}>
                    <button className="btn-orange">See my ads</button>
                </Link>
                <Link className="validatedAd-link-area" to="/createad">
                    <button className="btn-orange">Create a new ad</button>
                </Link>
            </div>
        </div>
    );
}

export default ValidatedAd;
