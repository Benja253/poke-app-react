import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TypeLabel from "../components/HomePage/TypeLabel"

const PokeInfo = () => {

  const { name } = useParams()

  const [pokemon, setPokemon] = useState()
  const [typesRelation, setTypesRelation] = useState()

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    axios.get(url)
      .then(res => setPokemon(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if(pokemon) {
      const typesPromises = pokemon.types.map(typeInfo => axios.get(typeInfo.type.url))
      Promise.all(typesPromises)
        .then(res => {
          // Esto deja todas las relaciones en un arr
          const allRelations = res.reduce((acc, cv) => {
            const double = cv.data.damage_relations.double_damage_from.map(e => ({name: e.name, relation: 2}))
            const half = cv.data.damage_relations.half_damage_from.map(e => ({name: e.name, relation: 0.5}))
            const immune = cv.data.damage_relations.no_damage_from.map(e => ({name: e.name, relation: 0}))
            return [...acc, ...double, ...half, ...immune]
          }, [])

          // Esto revisa si hay typos que se puede hacer neutros
          const arrResult = allRelations.reduce((acc, cv) => {
            const index = acc.findIndex(e => e.name === cv.name)
            if(index === -1) {
              return [...acc, cv]
            } else {
              acc[index].relation *= cv.relation
              return acc
            }
          }, [])
          setTypesRelation(arrResult)
        })
    }
  }, [pokemon])

  console.log(pokemon)

  return (
    <article>
      <header>
        <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
      </header>
      <section>
        <h2>{pokemon?.name}</h2>
        <ul>
          {
            pokemon?.types.map(typeInfo => (
              <TypeLabel
                key={typeInfo.type.url}
                type={typeInfo.type.name}
              />
            ))
          }
        </ul>
      </section>
      <section>
        <h3>Abilities</h3>
        <ul>
          {
            pokemon?.abilities.map(abilityInfo => (
              <li key={abilityInfo.ability.url}>{abilityInfo.ability.name}</li>
            ))
          }
        </ul>
      </section>
      <section>
        <header>
          <h3>Weakness (Debil a)</h3>
        </header>
        <h4>x4</h4>
        <ul>
          {
            typesRelation?.map(e => (
              e.relation === 4 && <TypeLabel
                key={e.name}
                type={e.name}
              />
            ))
          }
        </ul>
        <h4>x2</h4>
        <ul>
          {
            typesRelation?.map(e => (
              e.relation === 2 && <TypeLabel
                key={e.name}
                type={e.name}
              />
            ))
          }
        </ul>
      </section>
      <section>
        <header>
          <h3>Resistance (Resiste a)</h3>
        </header>
        <h4>x0.5</h4>
        <ul>
          {
            typesRelation?.map(e => (
              e.relation === 0.5 && <TypeLabel
                key={e.name}
                type={e.name}
              />
            ))
          }
        </ul>
        <h4>x0.25</h4>
        <ul>
          {
            typesRelation?.map(e => (
              e.relation === 0.25 && <TypeLabel
                key={e.name}
                type={e.name}
              />
            ))
          }
        </ul>
      </section>
      <section>
        <header>
          <h3>Immune (Inmune a)</h3>
          <ul>
          {
            typesRelation?.map(e => (
              e.relation === 0 && <TypeLabel
                key={e.name}
                type={e.name}
              />
            ))
          }
        </ul>
        </header>
      </section>
    </article>
  )
}

export default PokeInfo