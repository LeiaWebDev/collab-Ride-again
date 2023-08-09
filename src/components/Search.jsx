import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const API_URL = "https://ride-again.adaptable.app/ads"

function Search() {
    const [searchStrings, setSearchStrings] = useState("")
    const [value, setValue] = useState("")
    const [hideSuggestions, setHideSuggestions]  = useState(true)
    const [searchResult, setSearchResult] = useState(null)
    
    const findResult = (title)=>{
        setSearchResult(searchStrings.find((string)=> string.title === title))
    }
    // useEffect(()=>{
    //     const fetchData = async()=>{
    //         try {
    //             const {data} = await axios.get(`${API_URL}/search?q=${value}`)
    //             setSearchString(data.products)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // })
    useEffect(() => {
		axios
			.get(`${API_URL}/search?q=${value}`)
			.then((response) => {
				console.log(response)
				setSearchStrings(response.data)
			})
			.catch((e) => console.error(e))
	}, [])
    if (!searchStrings) {
		return <div className="loading">Loading...</div>
	}

  return (
    <>

    <div>
        <label htmlFor="">Search</label>
        <input 
            name="search"
            type='text'
            placeholder='Search for bikes...'
            value={value}
            onChange={(event)=>{
                setValue(event.target.value)
            }}
            >
        </input>
        <button onClick={findResult(string.title)}>Search</button>
    </div>
    <div>
        {searchStrings.map((string)=>(
            <div>{string["title"]}</div>
        ))}
    </div>

    </>
    
  )
}

export default Search