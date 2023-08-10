import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import SearchResult from '../pages/searchResult'
import { useNavigate } from 'react-router-dom'

// const API_URL = "https://ride-again.adaptable.app/ads"

function Search() {
    // const [searchStrings, setSearchStrings] = useState("")
    // const [suggestions, setSuggestions]  = useState([])
    // const [result, setResult] = useState(null)
    const [searchText, setSearchText] = useState("")
    const navigate = useNavigate()
    
    // function handleSearch(searchTerm){
    //     const filteredResults = searchResults.filter((result)=>
    //     result.type.toLowerCase().includes(searchTerm.toLowerCase())||
    //     result.brand.toLowerCase().includes(searchTerm.toLowerCase())||
    //     result.model.toLowerCase().includes(searchTerm.toLowerCase())||
    //     result.status.toLowerCase().includes(searchTerm.toLowerCase())||
    //     result.price <= parseFloat(searchTerm)
    //     )
    //     setSearchResults(filteredResults)
    //     console.log(filteredResults)
    // }
    function handleSearch(event){
        event.preventDefault()        
        navigate(`/search-result?search=${searchText}`)
    }
    // function handleInputChange(e){
    //     setSearchTerm(e.target.value)
    // }
    
    // function findResult(result){
    //     setResult(suggestions.find((suggestion)=> suggestion.title === title))
    // }

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
 <form onSubmit={handleSearch}> 
            <label htmlFor="">Search</label>
            <input 
                name="search"
                type='text'
                placeholder='Search for bikes...'
                value={searchText}
                onChange={(e)=>{
                    setSearchText(e.target.value)
                }}
                
                >
            </input>
           
            <button >Search</button>

            {/* <button onClick={findResult(string.title)}>Search</button> */}
        </form>
           
        {/* <SearchResult searchResults={searchResults}/> */}
    </div>
        {/* {result && <SearchResult {...result}/>} */}
    
    </>
    
  )
}
