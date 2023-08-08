// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function HomePage() {
//     // on line 7, we are using the useState hook to create a state variable called randomCategories
//     const [randomCategories, setRandomCategories] = useState({
//         mechanical: [],
//         electric: [],
//         electricAssist: [],
//     });

//     let responseCopy = [...response.data];

//     for (let i = 0; i < 3; i++) {
//         const randomId = Math.random() * responseCopy.length;
//         const chosenItem = responseCopy.splice(randomId, 1);
//         randomCategories.push(chosenItem);
//     }

//     useEffect(() => {
//         axios

//             .get("https://ride-again.adaptable.app/ads?type=Electric Assist")
//             .then((response) => {
//                 const shuffled = response.data.sort(() => 0.5 - Math.random());
//                 console.log(response.data);

//                 const selected = shuffled.slice(0, 3);
//                 setRandomCategories({ ...randomCategories, electricAssist: selected });
//             })
//             .catch((error) => {
//                 console.log("Error fetching data:", error);
//             });
//     }, []);

//     useEffect(() => {
//         axios

//             .get("https://ride-again.adaptable.app/ads?type=Mechanical")
//             .then((response) => {
//                 const shuffled = response.data.sort(() => 0.5 - Math.random());
//                 console.log(response.data);
//                 const selected = shuffled.slice(0, 3);
//                 setRandomCategories({ ...randomCategories, electricAssist: selected });
//             })
//             .catch((error) => {
//                 console.log("Error fetching data:", error);
//             });
//     }, []);

//     useEffect(() => {
//         console.log("Updated randomCategories:", randomCategories);
//     }, [randomCategories]);

//     if (!randomCategories) {
//         return <div className="loading">flute flute flute</div>;
//     }

//     return (
//         <div className="homePage">
//             <h1>Hundreds of classified ads ELECTRICS</h1>

//             <div className="random-categories">
//                 {randomCategories.electricAssist.map((category) => (
//                     <section key={category.id}>
//                         <h2>{category.id}</h2>

//                         <img src={category.image} alt={category.type} />
//                     </section>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default HomePage;

// 1 we import moduls

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
            <div className="random-categories">
                <h1>Hundreds of classified ads MECHANICAL</h1>
                {randomCategories.mechanical.map((category) => (
                    <section key={category.id}>
                        <h2>{category.model}</h2>
                        <h2>{category.description}</h2>
                        <p>Type: {category.type}</p>
                        <p>Price: {category.price}</p>
                        <Link to={`/bike/${category.id}`}>
                            <img src={category.image} alt={category.type} />
                        </Link>
                        {/* <img src={category.image} alt={category.type} /> */}
                    </section>
                ))}
            </div>

            <div className="random-categories">
                <h1>Hundreds of classified ads ELECTRIC</h1>
                {randomCategories.electric.map((category) => (
                    <section key={category.id}>
                        <h2>{category.model}</h2>
                        <h2>{category.description}</h2>
                        <p>Type: {category.type}</p>
                        <p>Price: {category.price}</p>
                        <img src={category.image} alt={category.type} />
                    </section>
                ))}
            </div>

            <div className="random-categories">
                <h1>Hundreds of classified ads ELECTRIC ASSIST</h1>
                {randomCategories.electricAssist.map((category) => (
                    <section key={category.id}>
                        <h2>{category.model}</h2>
                        <h2>{category.description}</h2>
                        <p>Type: {category.type}</p>
                        <p>Price: {category.price}</p>
                        <img src={category.image} alt={category.type} />
                    </section>
                ))}
            </div>
            <button>Add an ad</button>
        </div>
    );
}

export default HomePage;
