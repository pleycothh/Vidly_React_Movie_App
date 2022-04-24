import React from 'react'
//import _ from 'lodash' // underscore
import PropTypes from 'prop-types'

const ListGroup = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem,
    selectAll = 'null',
  } = props

  return (
    // for each item, in item array, render list of filters
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? 'list-group-item active' : 'list-group-item'
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  )
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
  // currentGenre: this.state.selectedGenre,
}

export default ListGroup
