import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
// import FileUploader from '../components/FileUploader'
// import ValidatedAd from './ValidatedAd'
import { useNavigate, useLocation, Navigate } from "react-router-dom";
// import SeeMyAds from './SeeMyAds'
import "./../styles/createAnAd.css";

const API_URL = "https://ride-again.adaptable.app/ads";

function CreateAd({ user }) {
    // const [user, setUser] = useState({ email: "", password: "" })
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [usage, setUsage] = useState("");
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState("");
    const [delivery, setDelivery] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [pickup, setPickup] = useState(user && `${user.streetName}, ${user.postCode} ${user.city}`);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const editAdId = searchParams.get("editAdId");
    const isEdit = searchParams.get("edit") === true;

    // const userAddress = `${userObj.streetName}, ${userObj.postCode} ${userObj.city}`;
    // const [pickup, setPickup] = useState(userAddress)
    // Fetch the user's address when they are logged in

    useEffect(() => {
        // const userJson = localStorage.getItem("user");
        // if (userJson){
        //     const userObj = JSON.parse(userJson);
        //     setUser(user)
        //     setPickup(userAddress)
        // }
        if (isEdit && editAdId) {
            fetchAdForEditing(editAdId);
        }
    }, [editAdId]);

    async function fetchAdForEditing() {
        try {
            const response = await axios.get(`${API_URL}/${editAdId}`);
            const adData = response.data;
            setTitle(adData.title);
            setSelectedImage(adData.image);
            setType(adData.type);
            setBrand(adData.brand);
            setModel(adData.model);
            setUsage(adData.usage);
            setDescription(adData.description);
            setPrice(adData.price);
            setStatus(adData.status);
            setDelivery(adData.delivery);
            setPickup(adData.pickup);
        } catch (error) {
            console.log(error);
        }
    }

    // const handleFileSelect=(file) =>{
    //     console.log("Selected file:", file)
    // }
    // const handleFileSelectSuccess = (file) =>{
    //     console.log("File selection success:", file)
    // }
    // const handleFileSelectError=(file) =>{
    //     console.log("File selection error:", error)
    // }

    async function handleSubmit(event) {
        event.preventDefault();

        // input validation

        // if (!title || !brand || !model || !price || !delivery || !selectedImage) {
        //     alert('Please fill in all required fields.');
        //     return;
        // }

        if (!title) {
            return alert("Please enter a title.");
        }
        if (!brand) {
            return alert("Please enter a brand.");
        }
        if (!model) {
            return alert("Please enter a model.");
        }
        if (!price) {
            return alert("Please enter a price.");
        }
        if (!delivery) {
            return alert("Please enter a delivery method.");
        }
        if (!selectedImage) {
            return alert("Please upload an image.");
        }

        const adToCreate = {
            title,
            status,
            type,
            brand,
            model,
            description,
            price,
            usage,
            delivery,
            pickup,
            image: selectedImage,

            userId: user.id,
        };

        // setIsLoading(true)

        try {
            const response = await axios.post(`${API_URL}`, adToCreate);
            const createdAd = response.data;
            console.log(response.data);
            navigate(`/validated-ad`);
            // Redirect or perform actions upon success
        } catch (error) {
            console.log(error);
        }
    }
    if (!user) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            <NavBar />
            <div className="createAd">
                <div className="form-createAd">
                    <h3>Create your ad</h3>
                    <form className="form-create-ad" onSubmit={handleSubmit}>
                        <div className="block-area-label-input-form">
                            <label className="label-form-created-ad" htmlFor="title">
                                Title of your ad
                            </label>
                            <input
                                className="input-createAd"
                                type="text"
                                id="title"
                                value={title}
                                placeholder="e.g., cheap Giant race mechanical bike"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="block-area-label-input-form">
                            <label className="label-form-created-ad" htmlFor="type">
                                Type of bicycle
                            </label>
                            <select value={type} id="type" onChange={(e) => setType(e.target.value)}>
                                <option value="Select your bicycle type">Select your bicycle type</option>
                                <option value="Mechanical">Mechanical bicycle</option>
                                <option value="Electric Assist">Electric assist bicycle</option>
                                <option value="Electric">Electric bicycle</option>
                            </select>
                        </div>
                        <div className="block-area-label-input-form">
                            <label className="label-form-created-ad" htmlFor="brand">
                                Brand of bicycle
                            </label>
                            <input
                                className="input-createAd"
                                type="text"
                                id="brand"
                                value={brand}
                                placeholder="e.g., Giant"
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </div>
                        <div className="block-area-label-input-form">
                            <label className="label-form-created-ad" htmlFor="model">
                                Model of bicycle
                            </label>
                            <input
                                className="input-createAd"
                                type="text"
                                id="model"
                                value={model}
                                placeholder="e.g., CrossTrail 600"
                                onChange={(e) => setModel(e.target.value)}
                            />
                        </div>
                        <div className="block-area-label-input-form">
                            <label className="label-form-created-ad" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                type="text"
                                id="description"
                                value={description}
                                placeholder="e.g., lightweight bike for the city"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="block-area-label-input-form">
                            <label className="label-form-created-ad" htmlFor="price">
                                Price (in Euros)
                            </label>
                            <input
                                className="input-createAd"
                                type="number"
                                id="price"
                                value={price}
                                placeholder="e.g., 750"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="block-area-label-input-form">
                            <label className="label-form-created-ad" htmlFor="usage">
                                Usage of bicycle
                            </label>
                            <input
                                className="input-createAd"
                                type="text"
                                id="usage"
                                value={usage}
                                placeholder="e.g., Mountain bike"
                                onChange={(e) => setUsage(e.target.value)}
                            />
                        </div>
                        <div className="block-area-label-input-form">
                            <label htmlFor="status">Status of the bicycle</label>
                            <select value={status} id="status" onChange={(e) => setStatus(e.target.value)}>
                                <option value="Choose the status of your bicycle">
                                    Choose the status of your bicycle
                                </option>
                                <option value="like New">like new</option>
                                <option value="very Good">very good</option>
                                <option value="good">good</option>
                                <option value="needs Repair">needs repair</option>
                                <option value="parts">for parts</option>
                            </select>
                        </div>
                        <div className="block-area-label-input-form">
                            <label className="label-form-created-ad" htmlFor="delivery">
                                Delivery options
                            </label>
                            <select value={delivery} id="delivery" onChange={(e) => setDelivery(e.target.value)}>
                                <option value="Select the delivery option">Select the delivery option</option>
                                <option value="in person">In person delivery</option>
                                <option value="postal">Postal delivery</option>
                            </select>
                        </div>
                        <div className="block-area-label-input-form">
                            <label className="label-form-created-ad" htmlFor="pickup">
                                Pick up location
                            </label>
                            <input
                                className="input-createAd"
                                type="text"
                                id="pickup"
                                value={pickup}
                                placeholder="e.g., 2, place d'Italie, 75013 Paris"
                                onChange={(e) => setPickup(e.target.value)}
                            />
                        </div>

                        {/* <FileUploader
            // onFileSelectSuccess={(file)=>setSelectedImage(file)}
            // onFileSelectError={({error})=>alert(error)}

            onFileSelect={handleFileSelect}
            onFileSelectSuccess={handleFileSelectSuccess}
            onFileSelectError={handleFileSelectError}
            /> */}
                        <div className="block-area-label-input-form">
                            <label className="label-form-created-ad" htmlFor="image">
                                Image of bicycle
                            </label>
                            <input
                                className="input-createAd"
                                type="text"
                                id="image"
                                value={selectedImage}
                                placeholder="e.g., https://pngimg.com/uploads/bicycle/bicycle_PNG5353.png"
                                onChange={(e) => setSelectedImage(e.target.value)}
                                // onChange={(e)=>setSelectedImage(e.target.files[0])}
                            />
                        </div>
                        <button className="btn-form-create" type="submit">
                            Create an ad
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateAd;
