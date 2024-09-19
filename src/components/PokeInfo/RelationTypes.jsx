import React from 'react'
import TypeLabel from '../HomePage/TypeLabel'

const RelationTypes = ({title, relation, class_relation, typesRelation}) => {
  return (
    <section className="pokeinfo__relation__section">
      <h4 className={`pokeinfo__relation__title ${class_relation}`}>{title}</h4>
      <ul className="pokeinfo__relation__list">
        {
          typesRelation?.map(e => (
            e.relation === relation && <TypeLabel
              key={e.name}
              type={e.name}
            />
          ))
        }
      </ul>
    </section>
  )
}

export default RelationTypes