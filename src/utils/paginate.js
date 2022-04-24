import _ from 'lodash'

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize

  //paginate from client side
  return _(items).slice(startIndex).take(pageSize).value()
  //_.slice(items, startIndex) // slice array from start Index
  //_.take()
}
