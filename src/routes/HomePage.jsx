import axios from "axios"
import { useEffect, useState } from "react"
import PokeCard from "../components/HomePage/PokeCard"
import './styles/HomePage.css'
import Pagination from "../components/HomePage/Pagination"

const HomePage = () => {

  const [pokemons, setPokemons] = useState()
  const [searchValue, setSearchValue] = useState('')
  const [countPoke, setCountPoke] = useState()
  const [page, setPage] = useState(1)
  const [pokePerPage, setPokePerPage] = useState(10)
  const [block, setBlock] = useState(1)

  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=99999999&offset=0'
    axios.get(url)
      .then(res => {
        setPokemons(res.data)
        setCountPoke(res.data.count)
      })
      .catch(err => console.log(err))
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setSearchValue(e.target.inputSearch.value.trim().toLowerCase())
    setPage(1)
    setBlock(1)
  }

  const searchCallback = (poke) => {
    return poke.name.includes(searchValue)
  }

  const arrSlice = [pokePerPage * page - pokePerPage, pokePerPage * page]

  return (
    <div className="body__margin">
      <div className="home">
        <form onSubmit={handleSubmit} className="home__search">
          <input id="inputSearch" className="home__search__input" type="text" />
          <button className="home__search__btn">Search</button>
        </form>
        <Pagination 
          countPoke={pokemons?.results.filter(searchCallback).length}
          page={page}
          setPage={setPage}
          pokePerPage={pokePerPage}
          block={block}
          setBlock={setBlock}
        />
        <div className="card__container">
          {
            pokemons?.results.filter(searchCallback).slice(...arrSlice).map(poke => (
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