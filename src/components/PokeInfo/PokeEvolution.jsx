import axios from "axios"
import { useEffect, useState } from "react"
import './styles/PokeEvolution.css'
import { useNavigate } from "react-router-dom"

const PokeEvolution = ({url}) => {

  const [evolutions, setEvolutions] = useState()
  const [styleContainer, setStyleContainer] = useState({})

  useEffect(() => {
    const fetchEvolution = async() => {
      const species = await axios.get(url)
      const evolutionChain = await axios.get(species.data.evolution_chain.url)
      let evo = evolutionChain.data.chain
      const urlPoke = `https://pokeapi.co/api/v2/pokemon/${evo.species.name}`
      const pokeInfo = await axios.get(urlPoke)
      const arrResult = [{
        sprite: pokeInfo.data.sprites.other['official-artwork'].front_default,
        ...evo.evolution_details[0],
        ...evo.species
      }]
      evo = evo.evolves_to
      while(evo.length !== 0) {
        const urlPoke = `https://pokeapi.co/api/v2/pokemon/${evo[0].species.name}`
        const pokeInfo = await axios.get(urlPoke)
        arrResult.push({
            ...evo[0].evolution_details[0],
            name: evo[0].species.name
          },
          {
            sprite: pokeInfo.data.sprites.other['official-artwork'].front_default,
            ...evo[0].species
        })
        evo = evo[0].evolves_to
      }
      setEvolutions(arrResult)
    }
    fetchEvolution()
  }, [url])

  useEffect(() => {
    if(evolutions) {
      setStyleContainer({
        maxWidth: `${evolutions.reduce((acc, cv) => cv.sprite ? acc + 10 : acc + 6, 0)}em`,
        gridTemplateColumns: `${evolutions.reduce((acc, cv) => cv.sprite ? acc + '5fr ' : acc + '3fr ', '')}`.trim()
      })
    }
  }, [evolutions])

  const navigate = useNavigate()

  const handleClick = (name) => {
    navigate(`/poke/${name}`)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className="pokeinfo__evo" style={styleContainer}>
        {
          evolutions?.map(evo => {
            if(evo.sprite) {
              return (
                <section onClick={() => handleClick(evo.name)} key={evo.sprite} className="pokeinfo__evo__item">
                  <header className="pokeinfo__evo__header">
                    <img className="pokeinfo__evo__img" src={evo.sprite} alt="" />
                  </header>
                  <h4 className="pokeinfo__evo__name">{evo.name}</h4>
                </section>
              )
            } else {
              return (
                <div 
                  key={evo.name}
                  className="pokeinfo__flecha__container"
                  style={{color:'var(--color-type)'}}
                >
                  <img className="pokeinfo__flecha" src='/img/arrow.png' alt="" />
                  <div className="pokeinfo__evo__lvl">
                    {
                      evo.min_happiness
                        ? <span className="evo__happiness">happiness + lvl</span>
                        : (evo.trigger.name === 'use-item')
                          ? (
                            <>
                              <span className="evo__happiness">{evo.item.name.replace('-',' ')}</span>
                              <img
                                className="evo__item"
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${evo.item.name}.png`}
                                alt="" 
                              />
                            </>
                          )
                          : (evo.trigger?.name === 'trade')
                            ? <span className="evo__happiness">
                                Trade
                                { evo.held_item?.name
                                  ? <>
                                    {' +'}
                                    <div>{evo.held_item?.name.replace('-', ' ')}</div> 
                                    <img className="evo__item" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${evo.held_item?.name}.png`} alt="" />
                                  </>
                                  : ''
                                }
                              </span>
                            : (evo.location?.name)
                              ? <span className="evo__happiness"><div>Location</div> {evo.location?.name.replace('-', ' ')}</span>
                              : <span className="evo__lvl">{`lvl ${evo.min_level}`}</span>
                    }
                  </div>
                </div>
              )
            }
          })
        }
    </div>
  )
}

export default PokeEvolution