// import React from "react";
// import { useParams  } from "react-router-dom";
// import { useState } from "react";
// import { }

// function OrderDetails() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     // dt
//     const [bike, setBike] = useState(null);

//     const orderDetails = {
//         id: id,
//         productName: "Bike Name",
//         productPrice: 500,
//         // ... autres détails  to adddd
//     };

//     return (
//         <div>
//             <h1>Order Details</h1>
//             <p>Order ID: {orderDetails.image}</p>

//             <p>Order ID: {orderDetails.id}</p>
//             <p>Product Name: {orderDetails.productName}</p>
//             <p>Product Price: {orderDetails.productPrice} €</p>
//             {/* Affichez d'autres détails to check */}
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function OrderDetails() {
    const { id } = useParams();

    const [bike, setBike] = useState(null);

    const [deliveryOption, setDeliveryOption] = useState("pickup"); // Default to pickup

    // const [selectedBikes, setSelectedBikes] = useState([]);

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

    // Calculate the total price of selected bikes
    // const calculateTotalPrice = () => {
    //     const totalPrice = selectedBikes.reduce((sum, bike) => sum + bike.price, 0);

    // return totalPrice;
    // };
    // console.log(calculateTotalPrice());
    // le prix unitaire * le nombre d'pobjet acheeté.
    // le prix unitaire * prix prix unitaire = pris total.
    if (!bike) {
        return <div>Loading...</div>;
    }

    // const orderDetails = {
    //     id: bike.id,
    //     productName: bike.model,
    //     productPrice: bike.price,
    //     // ... autres détails que vous pourriez ajouter
    // };

    // // Calculate the total price based on delivery option
    // const totalPrice = deliveryOption === "delivery" ? bike.price + 30 : bike.price;

    // const handleDeliveryOptionChange = (option) => {
    //     setDeliveryOption(option);
    // };

    // return (
    //     <div>
    //         <h1>Order Details</h1>
    //         <div>
    //             {" "}
    //             <img src={bike.image} alt={bike.type} />
    //             <p>Product Name: {bike.title}</p>
    //         </div>
    //         <div>
    //             <p>Product Price: {bike.model}</p>
    //             <p>Product Price: {bike.price} €</p>
    //         </div>
    //         {/* afficher le total price */}
    //         {/* <p>Total Price: {calculateTotalPrice()} €</p> */}

    //         {/* Affichez d'autres détails demandé a leia */}
    //     </div>
    // );

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
                {/* <p>Delivery Option:</p>
                <label>
                    <input
                        type="radio"
                        value="pickup"
                        checked={deliveryOption === "pickup"}
                        onChange={() => handleDeliveryOptionChange("pickup")}
                    />
                    Pickup (Free)
                </label>
                <label>
                    <input
                        type="radio"
                        value="delivery"
                        checked={deliveryOption === "delivery"}
                        onChange={() => handleDeliveryOptionChange("delivery")}
                    />
                    Delivery (+30 €)
                </label> */}

                <p>{bike.delivery === "in person" ? "Deliveray Cost : 0 €" : "Deliveray Cost : 30 €"}</p>
            </div>
            <div>
                <p>Total Price: {bike.delivery === "in person" ? bike.price : bike.price + 30} €</p>
            </div>

            {/* Button to validate order and go to payment */}
            <Link to="/payment">
                <button>Validate Order</button>
            </Link>
        </div>
    );
}

export default OrderDetails;
