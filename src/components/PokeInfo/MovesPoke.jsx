import axios from "axios"
import { useEffect, useState } from "react"
import TypeLabel from "../HomePage/TypeLabel"
import './styles/MovesPoke.css'

const MovesPoke = ({url}) => {

  const [move, setMove] = useState()

  useEffect(() => {
    axios.get(url)
      .then(res => setMove(res.data))
  }, [])

  return (
    <li className="pokeinfo__move__item">
      <div className="pokeinfo__move__column">{move?.name}</div>
      <div className="pokeinfo__move__column">{move?.damage_class.name} <img className="pokeinfo__class__img" src={`/img/${move?.damage_class.name}.gif`} alt="" /></div>
      <div className="pokeinfo__move__column"><TypeLabel type={move?.type.name} /></div>
      <div className="pokeinfo__move__column">{move?.power || '-'}</div>
      <div className="pokeinfo__move__column">{move?.accuracy || '-'}</div>
      <div className="pokeinfo__move__column">{move?.pp}</div>
    </li>
  )
}

export default MovesPoke