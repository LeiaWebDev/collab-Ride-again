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

    const totalAmount = bike.delivery === "in person" ? bike.price : bike.price + 30;
    return (
        <div className="main-order-detail-page">
            <div className="order-details-page">
                <div className="image-order-detail-page">
                    <h1>Order Details</h1>
                    <img className="image-order-details" src={bike.image} alt={bike.type} />

                    <p>{bike.title}</p>
                    <p>{bike.model}</p>
                    <p>{bike.price} €</p>

                    <p>{bike.delivery === "in person" ? "Delivery Cost : 0 €" : "Deliveray Cost : 30 €"}</p>
                    <p>Total Price: {totalAmount} €</p>
                    <Link to={`/payment?amount=${totalAmount}`}>
                        <button className="btn-orange btn-validate-order">Validate Order</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
