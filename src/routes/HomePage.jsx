import axios from "axios"
import { useEffect, useState } from "react"
import PokeCard from "../components/HomePage/PokeCard"
import './styles/HomePage.css'

const HomePage = () => {

  const [pokemons, setPokemons] = useState()
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    axios.get(url)
      .then(res => setPokemons(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setSearchValue(e.target.inputSearch.value.trim().toLowerCase())
  }

  const searchCallback = (poke) => {
    return poke.name.includes(searchValue)
  }

  return (
    <div className="body__margin">
      <div className="home">
        <form onSubmit={handleSubmit} className="home__search">
          <input id="inputSearch" className="home__search__input" type="text" />
          <button className="home__search__btn">Search</button>
        </form>
        <div className="card__container">
          {
            pokemons?.results.filter(searchCallback).map(poke => (
              <PokeCard 
                key={poke.url}
                url={poke.url}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default HomePage