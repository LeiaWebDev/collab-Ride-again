import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../styles/orderDetails.css";

function OrderDetails() {
    const { id } = useParams();

    const [bike, setBike] = useState(null);

    useEffect(() => {
        axios
            .get(`https://ride-again.adaptable.app/ads/${id}`)
            .then((response) => {
                setBike(response.data);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
            });
    }, [id]);

    if (!bike) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main-order-detail-page">
            <div className="order-details-page">
                <div className="image-order-detail-page">
                    <h1>Order Details</h1>
                    <img src={bike.image} alt={bike.type} />

                    <p>Product Name: {bike.title}</p>
                    <p>Product Price: {bike.model}</p>
                    <p>Product Price: {bike.price} €</p>

                    <p>{bike.delivery === "in person" ? "Deliveray Cost : 0 €" : "Deliveray Cost : 30 €"}</p>
                    <p>Total Price: {bike.delivery === "in person" ? bike.price : bike.price + 30} €</p>
                    <Link to="/payment">
                        <button className="btn-orange">Validate Order</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
