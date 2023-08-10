import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../styles/homePage.css";
import "./../styles/footer.css";

function HomePage() {
    // 2 on line 86, we are using useState hook to create a state variable called randomCategories
    const [randomCategories, setRandomCategories] = useState({
        mechanical: [],
        electric: [],
        electricAssist: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mechanicalResponse = await axios.get("https://ride-again.adaptable.app/ads?type=Mechanical");
                const electricResponse = await axios.get("https://ride-again.adaptable.app/ads?type=Electric");
                const electricAssistResponse = await axios.get(
                    "https://ride-again.adaptable.app/ads?type=Electric%20Assist"
                );

                const mechanicalAds = shuffleArray(mechanicalResponse.data).slice(0, 3);
                const electricAds = shuffleArray(electricResponse.data).slice(0, 3);
                const electricAssistAds = shuffleArray(electricAssistResponse.data).slice(0, 3);

                setRandomCategories({
                    mechanical: mechanicalAds,
                    electric: electricAds,
                    electricAssist: electricAssistAds,
                });
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    if (
        !randomCategories.mechanical.length ||
        !randomCategories.electric.length ||
        !randomCategories.electricAssist.length
    ) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="homePage">
            <h1>Mechanical bikes</h1>
            <div className="random-categories">
                <div className="categories-block">
                    {randomCategories.mechanical.map((category) => (
                        <section key={category.id}>
                            <h2>{category.model}</h2>
                            <Link to={`/bike/${category.id}`}>
                                <img className="image-homePage-categories" src={category.image} alt={category.type} />
                            </Link>
                            {/* <h2>{category.description}</h2> */}
                            <p>{category.brand}</p>
                            <p>{category.price} €</p>
                            <p>Condition : {category.status}</p>

                            {/* <img src={category.image} alt={category.type} /> */}
                        </section>
                    ))}
                </div>
            </div>

            <h1>Electric bikes</h1>
            <div className="random-categories">
                <div className="categories-block">
                    {randomCategories.electric.map((category) => (
                        <section key={category.id}>
                            <div className="categories-title">
                                <h2>{category.model}</h2>
                                <div className="info-categories-bike">
                                    <div className="image-categories-random"></div>
                                    <Link to={`/bike/${category.id}`}>
                                        <img
                                            className="image-homePage-categories"
                                            src={category.image}
                                            alt={category.type}
                                        />
                                    </Link>
                                    {/* <h2>{category.description}</h2> */}
                                    <p>{category.brand}</p>
                                    <p>{category.price} €</p>
                                    <p>Condition : {category.status}</p>

                                    {/* <img src={category.image} alt={category.type} /> */}
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            <h1>Electric Assist bikes</h1>
            <div className="random-categories">
                <div className="categories-block">
                    {randomCategories.electricAssist.map((category) => (
                        <section key={category.id}>
                            <h2>{category.model}</h2>
                            <Link to={`/bike/${category.id}`}>
                                <img className="image-homePage-categories" src={category.image} alt={category.type} />
                            </Link>
                            {/* <h2>{category.description}</h2> */}
                            <p>{category.brand}</p>
                            <p>{category.price} €</p>
                            <p>Condition : {category.status}</p>

                            {/* <img src={category.image} alt={category.type} /> */}
                        </section>
                    ))}
                </div>
            </div>
            <button>Add an ad</button>
        </div>
    );
}

export default HomePage;
