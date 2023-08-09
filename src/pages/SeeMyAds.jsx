import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ValidatedAd from './ValidatedAd'
import axios from 'axios'
import CreateAd from './CreateAd'

function SeeMyAds() {
    const [myAd, setMyAd] = useState({})
    const {adId} = useParams()
    const navigate = useNavigate()

    const API_URL = "https://ride-again.adaptable.app/ads"
    
    async function fetchMyAds(){
        try {
            const response = await axios.get(`${API_URL}/${adId}`)
            setMyAd(response.data)
            console.log(response.data)
            // navigate(`/validated-ad/${createdAd.id}`)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchMyAds()
    },[])

    if(!myAd){
        return (
            <div className="loading">Loading...</div>
        )
    }

    async function handleEditAd(){
        try {
            const updatedAd ={
                title,
                image,
                type,
                brand,
                model,
                usage,
                status,
                price,
                description,
                delivery,
                pickup,
            }
            await axios.put(`${API_URL}/${adId}`, updatedAd)
            navigate(`ads/${adId}`)

        } catch (error) {
            console.log(error)
        }
    }

    async function handleDeleteAd() {
		try {
			await axios.delete(`${API_URL}/${adId}`)
			navigate("/createad")
		} catch (error) {
			console.log(error)
		}
	}

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
        
        <Link to={`/createad?editAdId=${myAd.id}&edit=true`}>
        <button onClick={handleEditAd}>Edit</button>
        </Link>
       
       <button onClick={handleDeleteAd}>Delete</button>
    </div>
  )
}

export default SeeMyAds