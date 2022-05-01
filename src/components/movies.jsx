import React, { Component } from 'react'
import Pagination from './common/pagination'
import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import { paginate } from '../utils/paginate'
import ListGroup from './common/listGroup'
import MoviesTable from './moviesTable'
import _ from 'lodash'

class Movies extends Component {
  state = {
    movies: [], // <- because, get data take times, make sure is not undefined while waiting
    genres: [],
    currentPage: 1,
    // selectedGenre,
    pageSize: 4,
    sortColumn: { path: 'title', order: 'asc' },
  }

  // proper way to get data from server side
  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]
    // call when instance of component render in the dom
    this.setState({ movies: getMovies(), genres })
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id)
    this.setState({ movies })
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    movies[index] = { ...movies[index] }
    movies[index].liked = !movies[index].liked
    this.setState({ movies })
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page })
  }
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 })
  }

  handleSort = (sortColumn) => {
    //  raiseSort(path)
    this.setState({ sortColumn })
  }

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies,
    } = this.state

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    // get all the the movies with paginate
    const movies = paginate(sorted, currentPage, pageSize, selectedGenre)

    return { totalCount: filtered.length, data: movies }
  }

  // render method called when any element at state are changed
  render() {
    const { length: count } = this.state.movies

    const { pageSize, currentPage, sortColumn } = this.state
    if (count === 0) return <p>There are no movies in the database.</p>

    const { totalCount, data: movies } = this.getPageData()

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres} // + defaultProps
            selectedItem={this.state.selectedGenre} // <= same language group, between variable and function
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {pageSize} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    )
  }
}

export default Movies
