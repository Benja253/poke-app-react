import axios from "axios"
import { useEffect, useState } from "react"
import TypeLabel from "../HomePage/TypeLabel"
import './styles/MovesPoke.css'

const MovesPoke = ({url, method}) => {

  const [move, setMove] = useState()

  useEffect(() => {
    axios.get(url)
      .then(res => setMove(res.data))
  }, [])

  return (
    <>
      <div className="pokeinfo__move__column">
        {
          method[method.length - 1].move_learn_method.name === 'machine' 
            ? (
              <img className="pokeinfo__mt" src={`/img/mts/mt${move?.type.name}.png`} alt="" />
            )
            : method[method.length - 1].move_learn_method.name === 'tutor'
              ? ('tutor')
              : `${method[method.length - 1].level_learned_at}`
        }
      </div>
      <div className="pokeinfo__move__column">{move?.name.replace('-', ' ')}</div>
      <div className="pokeinfo__move__column">
        <span className="pokeinfo__move__class">{move?.damage_class.name}</span>
        <img 
          className="pokeinfo__class__img"
          src={`/img/${move?.damage_class.name}.gif`}
          alt="" 
        />
      </div>
      <div className="pokeinfo__move__column pokeinfo__move__type"><TypeLabel type={move?.type.name} /></div>
      <div className="pokeinfo__move__column">{move?.power || '-'}</div>
      <div className="pokeinfo__move__column">{move?.accuracy || '-'}</div>
      <div className="pokeinfo__move__column">{move?.pp}</div>
    </>
  )
}

export default MovesPoke