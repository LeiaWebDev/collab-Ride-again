import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./../styles/search-bikes.css";

const API_URL = "https://ride-again.adaptable.app/ads";

function SearchResult({ searchResults }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filteredAds, setFilteredAds] = useState([]);
    const search = searchParams.get("search");

    useEffect(() => {
        console.log(search);
        axios
            .get(`${API_URL}?q=${search}`)
            .then((response) => {
                console.log(response);
                setFilteredAds(response.data);
            })
            .catch((e) => console.error(e));
    }, [searchParams]);
    // function handleSearch(searchTerm){
    //     const filteredResults = ads.filter((ad)=>
    //         ad.type.toLowerCase().includes(searchTerm.toLowerCase())||
    //         ad.brand.toLowerCase().includes(searchTerm.toLowerCase())||
    //         ad.model.toLowerCase().includes(searchTerm.toLowerCase())||
    //         ad.status.toLowerCase().includes(searchTerm.toLowerCase())||
    //         ad.price <= parseFloat(searchTerm)
    //     )
    //     setFilteredAds(filteredResults)
    // }

    console.log(filteredAds);
    return (
        <div className="main-search-bikes-page">
            <div className="section-blocks-title-ul-search"></div>
            <h2>Your search results</h2>
            {/* <Search onSearch={handleSearch}/> */}
            <ul className="search-results-list">
                {filteredAds.map((ad) => {
                    return (
                        <li className="search-result" key={ad.id}>
                            <div>
                                {/* <Link to={`/ad/${ad.id}`}> */}
                                <Link to={`/bike/${ad.id}`}>
                                    <h3>{ad.title}</h3>
                                </Link>
                                {/* <Link to={`/ad/${ad.id}`}> */}
                                <Link className="block-area-image" to={`/bike/${ad.id}`}>
                                    {/* /////check with Conrad to modify the link name leading to OneAd description page */}

                                    <img className="image-search-bar-area" src={ad.image} alt={ad.title} />
                                </Link>

                                <h3>{ad.type} bike</h3>
                                <h4>{ad.status} condition</h4>
                                <h4 className="price-search-result">{ad.price} euros</h4>
                                <p>Brand: {ad.brand}</p>
                                {/* <p>Model: {ad.model}</p>
                <p>Description: {ad.description}</p>
                <p>Delivery: {ad.delivery}</p>
                <p>Pickup: {ad.pickup}</p> */}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default SearchResult;
