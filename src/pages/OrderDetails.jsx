import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

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

    const totalAmount = bike.delivery === "in person" ? bike.price : bike.price + 30
    return (
        <div>
            <h1>Order Details</h1>
            <div>
                <img src={bike.image} alt={bike.type} />
                <p>Product Name: {bike.title}</p>
            </div>
            <div>
                <p>Product Price: {bike.model}</p>
                <p>Product Price: {bike.price} €</p>
            </div>
            <div>
                <p>{bike.delivery === "in person" ? "Deliveray Cost : 0 €" : "Deliveray Cost : 30 €"}</p>
            </div>
            <div>
                <p>Total Price: {totalAmount} €</p>
                {/* <p>Total Price: {bike.delivery === "in person" ? bike.price : bike.price + 30} €</p> */}
            </div>

            <Link to={`/payment?amount=${totalAmount}`}>
                <button>Validate Order</button>
            </Link>
        </div>
    );
}

export default OrderDetails;
