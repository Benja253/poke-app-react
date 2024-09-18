import axios from "axios"
import { useEffect, useState } from "react"
import PokeCard from "../components/HomePage/PokeCard"
import './styles/HomePage.css'

const HomePage = () => {

  const [pokemons, setPokemons] = useState()

  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    axios.get(url)
      .then(res => setPokemons(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="home">
      <div className="card__container">
        {
          pokemons?.results.map(poke => (
            <PokeCard 
              key={poke.url}
              url={poke.url}
            />
          ))
        }
      </div>
    </div>
  )
}

export default HomePage