import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TypeLabel from "../components/HomePage/TypeLabel"
import './styles/PokeInfo.css'
import RelationTypes from "../components/PokeInfo/RelationTypes"
import MovesPoke from "../components/PokeInfo/MovesPoke"
import PokeEvolution from "../components/PokeInfo/PokeEvolution"

const PokeInfo = () => {

  const { name } = useParams()

  const [pokemon, setPokemon] = useState()
  const [typesRelation, setTypesRelation] = useState()

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    axios.get(url)
      .then(res => setPokemon(res.data))
      .catch(err => console.log(err))
  }, [name])

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
    <div className="body__margin">
      <article className={`pokeinfo pokecard__${pokemon?.types[0].type.name}`}>
        <header className="pokeinfo__header">
          <img className="pokeinfo__img" src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
        </header>
        <section className="pokeinfo__section__principal body__margin">
          <h2 className="pokeinfo__name"><span className="pokeinfo__id">#{pokemon?.id}</span> {pokemon?.name}</h2>
          <ul className="pokeinfo__types">
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
        <section className="pokeinfo__abilities body__margin">
          <h3 className="pokeinfo__abilities__title">Abilities</h3>
          <ul className="pokeinfo__abilities__list">
            {
              pokemon?.abilities.map(abilityInfo => (
                <li className="pokeinfo__abilities__item" key={abilityInfo.ability.url}>{abilityInfo.ability.name}</li>
              ))
            }
          </ul>
        </section>
        <section className="body__margin pokeinfo__stats">
          {
            <ul className="pokeinfo__stats__list">
              {
                pokemon?.stats.map(statInfo => (
                  <div key={statInfo.stat.url} className="pokeinfo__stat">
                    <div className="pokeinfo__stat__header">
                      <div className="pokeinfo__stat__label">{statInfo.stat.name}</div>
                      <div className="pokeinfo__stat__value">{statInfo.base_stat}/255</div>
                    </div>
                    <div className="pokeinfo__stat__bar">
                      <div 
                        style={{width: `${statInfo.base_stat / 255 * 100}%`}} 
                        className="pokeinfo__stat__bar__int"
                      ></div>
                    </div>
                  </div>
                ))
              }
            </ul>
          }
        </section>
        <section className="pokeinfo__weakness body__margin">
          <header className="pokeinfo__relations__header">
            <h3 className="pokeinfo__weakness__title">Weakness (Debil a)</h3>
          </header>
          {
            typesRelation?.filter(e => e.relation === 4).length !== 0 
            && <RelationTypes title='x4' relation={4} class_relation='x4' typesRelation={typesRelation} />
          }
          {
            typesRelation?.filter(e => e.relation === 2).length !== 0 
            && <RelationTypes title='x2' relation={2} class_relation='x2' typesRelation={typesRelation} />
          }
          
        </section>
        <section className="pokeinfo__resistance body__margin">
          <header className="pokeinfo__resistance__header">
            <h3 className="pokeinfo__resistance__title">Resistance (Resiste a)</h3>
          </header>
          {
            typesRelation?.filter(e => e.relation === 0.5).length !== 0 
            && <RelationTypes title='x0.5' relation={0.5} class_relation='x05' typesRelation={typesRelation} />
          }
          {
            typesRelation?.filter(e => e.relation === 0.25).length !== 0 
            &&  <RelationTypes title='x0.25' relation={0.25} class_relation='x025' typesRelation={typesRelation} />
          }
        </section>
        <section className="pokeinfo__x0 body__margin">
          <header className="pokeinfo__x0__header">
            <h3 className="pokeinfo__x0__title">Immune (Inmune a)</h3>
          </header>
          {
            typesRelation?.filter(e => e.relation === 0).length !== 0 
              ? <RelationTypes title='x0' relation={0} class_relation='x0' typesRelation={typesRelation} />
              : 'none'
          }
        </section>
      </article>
      <article className={`pokeinfo__moves pokecard__${pokemon?.types[0].type.name}`}>
        <h2 className="pokeinfo__move__title">Evolition Chain</h2>
        {
          pokemon &&
          <PokeEvolution url={pokemon?.species.url} />
        }
      </article>
      <article className={`pokeinfo__moves pokecard__${pokemon?.types[0].type.name}`}>
        <h2 className="pokeinfo__move__title">Moves</h2>
        <section className="pokeinfo__move__grid">
          <ul className="pokeinfo__move__list">
            <li className="pokeinfo__move__item">
              <div className="pokeinfo__move__column pokeinfo__move__head">name</div>
              <div className="pokeinfo__move__column pokeinfo__move__head">class</div>
              <div className="pokeinfo__move__column pokeinfo__move__head">type</div>
              <div className="pokeinfo__move__column pokeinfo__move__head">power</div>
              <div className="pokeinfo__move__column pokeinfo__move__head">accuracy</div>
              <div className="pokeinfo__move__column pokeinfo__move__head">pp</div>
            </li>
            {
              pokemon?.moves.map(moveInfo => (
                <MovesPoke 
                  key={moveInfo.move.url}
                  url={moveInfo.move.url}
                />
              ))
            }
          </ul>
        </section>
      </article>
    </div>
  )
}

export default PokeInfo