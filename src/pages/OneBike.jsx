import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function OneBike({ randomCategories }) {
    const { id } = useParams();

    const [bike, setBike] = useState(null);

    // const [sellerDetails, setSellerDetails] = useState(null);

    // const [checkedOne, setCheckedOne] = useState(false);
    // const [checkedTwo, setCheckedTwo] = useState(false);

    useEffect(() => {
        axios
            .get(`https://ride-again.adaptable.app/ads/${id}?_expand=user`)
            .then((response) => {
                console.log(response.data);
                setBike(response.data);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
            });
    }, [id]);

    // useEffect(() => {
    //     axios
    //         .get(`https://ride-again.adaptable.app/users/${bike?.userId}`)
    //         .then((response) => {
    //             console.log(response.data);
    //             setSellerDetails(response.data);
    //         })
    //         .catch((error) => {
    //             console.log("Error fetching seller data:", error);
    //         });
    // }, [bike]);

    // recuperer la valeur du checkbox

    const handleBuyClick = () => {
        // Logique pour acheter le vélo
    };

    // const handleChanceOne = () => {
    //     setCheckedOne(!checkedOne);
    // };

    // const handleChanceTwo = () => {
    //     setCheckedTwo(!checkedTwo);
    // };

    if (!bike) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>{bike.title}</p>
            <img src={bike.image} alt={bike.type} />
            <p>{bike.type}</p>
            <p>{bike.brand}</p>
            <p>{bike.model}</p>
            <p>{bike.description}</p>
            <p>Price : {bike.price} €</p>
            <p> {bike.location}</p>
            <p>Delivery location : {bike.pickup}</p>
            <p>Product collection method : {bike.delivery}</p>

            {/* <div>
                <div>
                    <label>
                        <input type="checkbox" checked={checkedOne} onChange={handleChanceOne} />
                        In person delivery
                    </label>
                    <label>
                        <input type="checkbox" checked={checkedTwo} onChange={handleChanceTwo} />
                        Postal delivery
                    </label>
                </div>
            </div> */}
            <button onClick={handleBuyClick}>Buy</button>
            <img src="/téléchargement.jpg" alt="logo" />

            <div>
                <p>
                    Sold by {bike.user.firstName} {bike.user.lastName} : Member since {bike.user.creationDate}
                </p>
                {/* <p>Member since {bike.user.creationDate}</p> */}
            </div>

            {/* <p>{bike.firstname}</p> */}
            {/* <Link to="/">Back to list</Link> */}
        </div>
    );
}

export default OneBike;
