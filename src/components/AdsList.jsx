import React from 'react'

function AdsList(ads) {
  return (
    <div>
        <ul>
            {ads.map((ad)=>(
                <li key={ad.id}>
                    <h3>{ad.title}</h3>
                    <img src={ad.image} alt={ad.title} />
                    <h3>{ad.type} bike</h3>
                    <h4>{ad.status}</h4>
                    <h4>{ad.price} euros</h4>
                    <p>Brand: {ad.brand}</p>
                    <p>Model: {ad.model}</p>
                    <p>Description: {ad.description}</p>
                    <p>Delivery: {ad.delivery}</p>
                    <p>Pickup: {ad.pickup}</p>
                    
                </li>
            ))}
        </ul>
    </div>
  )
}

export default AdsList