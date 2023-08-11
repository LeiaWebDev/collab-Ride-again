import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import { Map } from "leaflet";
import "../styles/oneBike.css"
import "leaflet/dist/leaflet.css";

function OneBike({ user }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bike, setBike] = useState(null);
    const myIcon = L.icon({
        iconUrl: '/marker-icon-2x.png',
        iconSize: [25,41],
        iconAnchor: [32, 64],
        popupAnchor: null,
        shadowUrl: '/marker-shadow.png',
        shadowSize: null,
        shadowAnchor: null
    });

    //const [pendingPurchase, setPendingPurchase] = useState(false);

    useEffect(() => {
        axios
            .get(`https://ride-again.adaptable.app/ads/${id}?_expand=user`)
            //.get(`https://ride-again.adaptable.app/users/${user.id}`)
            .then((response) => {
                console.log(response.data);
                setBike(response.data);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
            });
    }, [id]);
    // }, [user.id]);

    const handleBuyClick = () => {
        // Check if the user is logged in ok
        if (user || id) {
            // User is logged in, navigate to the OrderDetails page ok
            navigate(`/orderDetails/${id}`);
        } else {
            // User is not logged in, ask to sign in
            alert("you must be logged in to buy a bike");
        }
    };

    // Si l'achat était en attente et que l'utilisateur est maintenant connecté,
    // redirigez-le vers la page d'achat
    // useEffect(() => {
    //     if (pendingPurchase && user) {
    //         navigate(`/orderDetails/${id}`);
    //     }
    // }, [pendingPurchase, user, navigate, id]);
    // useEffect(() => {
    //     if (pendingPurchase && user) {
    //         navigate(`/orderDetails/${id}`);
    //     }
    // }, [pendingPurchase, user, navigate, id]);

    if (!bike) {
        return <div>Loading...</div>;
    }

    let position = [bike.user.latitude, bike.user.longitude];
    return (
        <div>
            <div className="main-one-bike-page">
                <div className="map-one-bike">
                    <MapContainer
                        center={position}
                        style={{ width: "750px", height: "650px" }}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker icon={myIcon} id="marker" position={position}>
                            {/* <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup> */}
                        </Marker>
                    </MapContainer>
                </div>
                <div className="infos-one-bike">
                    <p>{bike.title}</p>
                    <img className="image-OneBike" src={bike.image} alt={bike.type} />
                    <p>{bike.type}</p>
                    <p>{bike.brand}</p>
                    <p>{bike.model}</p>
                    <p>{bike.description}</p>
                    <p>{bike.price} €</p>
                    <p>{bike.location}</p>
                    <p>Delivery location : {bike.pickup}</p>
                    <p>Product collection method : {bike.delivery}</p>

                    {/* <img src="/téléchargement.jpg" alt="logo" /> */}
                </div>
            </div>
            <div>
                <p>
                    Sold by {bike.user.firstName} {bike.user.lastName} : Member since {bike.user.creationDate}
                </p>
                {/* <p>Member since {bike.user.creationDate}</p> */}
            </div>
            <div className="btn-one-bike">
                <button className="btn-orange" onClick={handleBuyClick}>
                    Buy
                </button>
            </div>

            {/* <p>{bike.firstname}</p> */}
            {/* <Link to="/">Back to list</Link> */}
        </div>
    );
}

export default OneBike;
