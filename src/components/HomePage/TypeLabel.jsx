import './styles/TypeLabel.css'

const TypeLabel = ({type}) => {
  return (
    <li className={`pokelabel pokecard__${type}`}>{type}</li>
  )
}

export default TypeLabel