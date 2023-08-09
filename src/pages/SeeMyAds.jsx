import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ValidatedAd from './ValidatedAd'
import axios from 'axios'
import CreateAd from './CreateAd'
import EditAd from './EditAd'

function SeeMyAds({user}) {
    const [myAds, setMyAds] = useState(null)
    const navigate = useNavigate()

    const API_URL = "https://ride-again.adaptable.app/ads"
    
    async function fetchMyAds(){
        try {
            const response = await axios.get(`${API_URL}?userId=${user.id}`)
            setMyAds(response.data)
            console.log(response.data)
            // navigate(`/validated-ad/${createdAd.id}`)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchMyAds()
    },[])

    if(!myAds){
        return (
            <div className="loading">Loading...</div>
        )
    }

    async function handleDeleteAd(adId) {
		try {
			await axios.delete(`${API_URL}/${adId}`)
			fetchMyAds()
		} catch (error) {
			console.log(error)
		}
	}

  return (
    <>
    {myAds.map((myAd)=>{
        return (
            <div className='MyAds' key = {myAd.id}>
                <h1>My Ads</h1>
                <h2>{myAd.title}</h2>
                <img src={myAd.image} alt="bike image" />
                <h2>{myAd.type} bike</h2>
                <h2>{myAd.price} Euros</h2>
                <h3>{myAd.status} condition</h3>
                <h3>Brand: {myAd.brand}</h3>
                <h3>Model: {myAd.model}</h3>
                <h3>Usage: {myAd.usage}</h3>
                <h3>Description: {myAd.description}</h3>
                <h3>Delivery method : {myAd.delivery}</h3>
                <h3>Pick up location: {myAd.pickup}</h3>
                <p>{myAd.userId}</p>
                
                <Link to={`/edit-ad/${myAd.id}`}>
                <button >Edit</button>
                </Link>
       
                <button onClick={() => handleDeleteAd(myAd.id)}>Delete</button>
            </div>
        )
    })}
    
    </>
  )
}

export default SeeMyAds