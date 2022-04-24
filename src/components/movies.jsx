import React, { Component } from 'react'
import Like from './common/like'
import Pagination from './common/pagination'
import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import { paginate } from '../utils/paginate'
import ListGroup from './common/listGroup'

class Movies extends Component {
  state = {
    movies: [], // <- because, get data take times, make sure is not undefined while waiting
    genres: [],
    currentPage: 1,
    // selectedGenre,
    pageSize: 4,
  }

  // proper way to get data from server side
  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()]
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

  // render method called when any element at state are changed
  render() {
    const { length: count } = this.state.movies

    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
    } = this.state
    if (count === 0) return <p>There are no movies in the database.</p>

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies

    // get all the the movies with paginate
    const movies = paginate(filtered, currentPage, pageSize, selectedGenre)

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
          <p>Showing {filtered.length} movies in the database.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={filtered.length}
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
