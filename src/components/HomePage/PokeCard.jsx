import axios from "axios"
import { useEffect, useState } from "react"
import TypeLabel from "./TypeLabel"
import './styles/PokeCard.css'
import { useNavigate } from "react-router-dom"

const PokeCard = ({url}) => {

  const [pokemon, setPokemon] = useState()

  useEffect(() => {
    axios.get(url)
      .then(res => setPokemon(res.data))
      .catch(err => console.log(err))
  }, [])

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/poke/${pokemon?.name}`)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <article className={`pokecard pokecard__${pokemon?.types[0].type.name}`}>
      <header className="pokecard__header">
        <img className="pokecard__sprite" src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
      </header>
      <section className="pokecard__body">
        <h3 className="pokecard__name">{pokemon?.name}</h3>
        <ul className="pokecard__types">
          {
            pokemon?.types.map(typeInfo => (
              <TypeLabel
                key={typeInfo.type.url}
                type={typeInfo.type.name}
              />
            ))
          }
        </ul>
        <ul className="pokecard__stats__container">
          {
            pokemon?.stats.map(statInfo => (
              <li className="pokecard__stat" key={statInfo.stat.url}>
                <div className="pokecard__stat__label">{statInfo.stat.name}</div>
                <div className="pokecard__stat__value">{statInfo.base_stat}</div>
              </li>
            ))
          }
        </ul>
      </section>
      <footer className="pokecard__footer">
        <button onClick={handleClick} className="pokecard__btn">See more...</button>
      </footer>
    </article>
  )
}

export default PokeCard