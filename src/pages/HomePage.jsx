import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../styles/homePage.css";
import "./../styles/footer.css";

function HomePage() {
    // 2 on line 86, we are using useState hook to create a state variable called randomCategories
    const [randomAds, setRandomAds] = useState({
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

                setRandomAds({
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

    if (!randomAds.mechanical.length || !randomAds.electric.length || !randomAds.electricAssist.length) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="homePage">
            <h1>Suggested ads</h1>
            <div className="block-area-title-homePage">
                {" "}
                <h2>Mechanical bikes you may like</h2>
            </div>
            <div className="random-categories">
                <div className="categories-block">
                    {randomAds.mechanical.map((ad) => (
                        <section key={ad.id}>
                            <h2 className="title-homePage-block">{ad.model}</h2>
                            <Link to={`/bike/${ad.id}`}>
                                <img className="image-homePage-categories" src={ad.image} alt={ad.type} />
                            </Link>
                            {/* <h2>{category.description}</h2> */}
                            <p>{ad.brand}</p>
                            <p>{ad.price} €</p>
                            <p>Condition : {ad.status}</p>

                            {/* <img src={category.image} alt={category.type} /> */}
                        </section>
                    ))}
                </div>
            </div>

            <div className="random-categories">
                <div className="block-area-title-homePage">
                    <h2>Electric bikes you may like</h2>
                </div>
                <div className="categories-block">
                    {randomAds.electric.map((ad) => (
                        <section key={ad.id}>
                            <div className="categories-title">
                                <h2 className="title-homePage-block">{ad.model}</h2>
                                <div className="info-categories-bike">
                                    <div className="image-categories-random"></div>
                                    <Link to={`/bike/${ad.id}`}>
                                        <img className="image-homePage-categories" src={ad.image} alt={ad.type} />
                                    </Link>
                                    {/* <h2>{category.description}</h2> */}
                                    <p>{ad.brand}</p>
                                    <p>{ad.price} €</p>
                                    <p>Condition : {ad.status}</p>

                                    {/* <img src={category.image} alt={category.type} /> */}
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            <div className="random-categories">
                <div className="block-area-title-homePage">
                    <h2>Electric Assist bikes you may like</h2>
                </div>
                <div className="categories-block">
                    {randomAds.electricAssist.map((ad) => (
                        <section key={ad.id}>
                            <h2 className="title-homePage-block">{ad.model}</h2>
                            <Link to={`/bike/${ad.id}`}>
                                <img className="image-homePage-categories" src={ad.image} alt={ad.type} />
                            </Link>
                            {/* <h2>{category.description}</h2> */}
                            <p>{ad.brand}</p>
                            <p>{ad.price} €</p>
                            <p>Condition : {ad.status}</p>

                            {/* <img src={category.image} alt={category.type} /> */}
                        </section>
                    ))}
                </div>
            </div>
            <button className="btn-orange border-none">Create an ad</button>
        </div>
    );
}

export default HomePage;
