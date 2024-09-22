import './styles/TypeLabel.css'

const TypeLabel = ({type}) => {
  return (
    <div className={`pokelabel pokecard__${type}`}>{type}</div>
  )
}

export default TypeLabel