import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Map } from "leaflet";
import "./../styles/OneBike.css";
import "leaflet/dist/leaflet.css";

function OneBike({ user }) {
    const { id } = useParams();

    const navigate = useNavigate(); // Utilisation du hook useNavigate

    const [bike, setBike] = useState(null);

    const [pendingPurchase, setPendingPurchase] = useState(false);

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

    const handleBuyClick = () => {
        // Check if the user is logged in ok
        if (user) {
            // User is logged in, navigate to the OrderDetails page ok
            navigate(`/orderDetails/${id}`);
        } else {
            // User is not logged in, navigate to the Signup page ok
            setPendingPurchase(true);
            navigate("/signup");
        }
    };

    // Si l'achat était en attente et que l'utilisateur est maintenant connecté,
    // redirigez-le vers la page d'achat
    useEffect(() => {
        if (pendingPurchase && user) {
            navigate(`/orderDetails/${id}`);
        }
    }, [pendingPurchase, user, navigate, id]);

    if (!bike) {
        return <div>Loading...</div>;
    }

    const position = [5.0817, 38.8097];
    return (
        <div>
            <div className="toto">
                <p>{bike.title}</p>
                <img className="image-OneBike" src={bike.image} alt={bike.type} />
                <p>{bike.type}</p>
                <p>{bike.brand}</p>
                <p>{bike.model}</p>
                <p>{bike.description}</p>
                <p>Price : {bike.price} €</p>
                <p> {bike.location}</p>
                <p>Delivery location : {bike.pickup}</p>
                <p>Product collection method : {bike.delivery}</p>

                <button onClick={handleBuyClick}>Buy</button>
                {/* <img src="/téléchargement.jpg" alt="logo" /> */}

                <div className="map-ride-again">
                    <MapContainer
                        center={position}
                        style={{ width: "650px", height: "650px" }}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker id="marker" position={position}>
                            {/* <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup> */}
                        </Marker>
                    </MapContainer>
                </div>
            </div>

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
