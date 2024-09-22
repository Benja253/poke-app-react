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
      console.log(evo)
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
  }, [])

  useEffect(() => {
    if(evolutions) {
      setStyleContainer({
        maxWidth: `${evolutions.reduce((acc, cv) => cv.sprite ? acc + 10 : acc + 6, 0)}em`,
        gridTemplateColumns: `${evolutions.reduce((acc, cv) => cv.sprite ? acc + '5fr ' : acc + '3fr ', '')}`.trim()
      })
    }
  }, [evolutions])


  console.log(evolutions)

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
                <div key={evo.name}     className="pokeinfo__flecha__container"
                style={{color:'var(--color-type)'}}>
                  <svg
                    className="pokeinfo__flecha"
                    version="1.0" 
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1280.000000 824.000000" 
                    preserveAspectRatio="xMidYMid meet"
                    still={{fill: 'var(--color-type)'}}
                    >
                      <g transform="translate(0.000000,824.000000) scale(0.100000,-0.100000)" stroke="none" fill="currentColor">
                        <path d="M4540 8236 c0 -2 263 -460 585 -1017 322 -557 584 -1018 582 -1024
                        -3 -7 -777 -11 -2419 -13 l-2416 -2 -7 -688 c-7 -633 0 -3300 9 -3309 2 -2
                        705 -8 1562 -13 3350 -21 3344 -20 3344 -39 0 -10 -218 -491 -485 -1071 -267
                        -579 -485 -1054 -485 -1056 0 -2 54 -4 119 -4 l120 0 63 39 c71 44 4770 2822
                        5713 3378 1003 591 1365 807 1362 816 -3 9 -311 177 -1297 710 -316 170 -1315
                        710 -2220 1200 -905 489 -2140 1157 -2745 1484 -605 328 -1104 599 -1109 604
                        -9 8 -276 13 -276 5z"/>
                      </g>
                    </svg>
                  {/* <img className="pokeinfo__flecha" src="/img/flecha_evo.svg" alt="" /> */}
                  <div className="pokeinfo__evo__lvl">lvl {evo.min_level}</div>
                </div>
              )
            }
          })
        }
    </div>
  )
}

export default PokeEvolution