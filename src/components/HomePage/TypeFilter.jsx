import axios from 'axios'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './styles/TypeFilter.css'

const TypeFilter = ({ setTypeSelected }) => {

  const [types, setTypes] = useState()

  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/type?offset=0&limit=100'
    axios.get(url)
      .then(res => setTypes(res.data))
      .catch(err => console.log(err))
  }, [])

  const selectElement = useRef()

  const handleChange = () => {
    setTypeSelected(selectElement.current.value)
  }

  return (
    <select ref={selectElement} onChange={handleChange} className='select__type'>
      <option className='select__type__option' value="allPokemon">All Pokemon</option>
      {
        types?.results.map(typeInfo => (
          (typeInfo.name === 'stellar' || typeInfo.name === 'unknown' || typeInfo.name === 'shadow')
            ? ''
            : <option className='select__type__option' key={typeInfo.url} value={typeInfo.url}>{typeInfo.name}</option>
        ))
      }
    </select>
  )
}

export default TypeFilter