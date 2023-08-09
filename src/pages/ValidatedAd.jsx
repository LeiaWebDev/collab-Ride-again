import React from 'react'
import SeeMyAds from './SeeMyAds'
import CreateAd from './CreateAd'
import { Link, useParams } from 'react-router-dom'


function ValidatedAd() {
    const {id} = useParams()

  return (
    <div>
        <h3>Congratulations, you created your ad</h3>

       
        <Link to={`/ads/${id}`}>
            <button>See my ads</button>
        </Link>
        <Link to="/createad">
            <button>Create a new ad</button>
        </Link>

    </div>
  )
}

export default ValidatedAd