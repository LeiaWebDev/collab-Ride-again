import React from 'react'

function EditAd() {
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

  return (
    <div>EditAd</div>
  )
}

export default EditAd