import React from 'react'
//import _ from 'lodash' // underscore
import PropTypes from 'prop-types'

const ListGroup = (props) => {
  const { items, textProperty, valueProperty, onItemSelect } = props

  return (
    <ul className="list-group">
      {items.map((
        item, // for each item, in item array, render list of filters
      ) => (
        <li key={item[valueProperty]} className="list-group-item">
          {item[textProperty]}
        </li>
      ))}
    </ul>
  )
}

/*
{
            item.name === onItemSelect
              ? 'list-group-item active'
              : 'list-group-item'
          } */
//  <a onClick={() => onItemSelect(item)}>{item}</a>

ListGroup.propTypes = {
  // items: PropTypes.number.isRequired,
  onItemSelect: PropTypes.func.isRequired,
}

export default ListGroup
