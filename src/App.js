import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Constants from './Constants'
import Book from './components/Book'
import Search from './components/Search'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }

  componentDidMount() {
    this.refreshAllShelves();
  }

  refreshAllShelves = () => {
    BooksAPI.getAll().then( (books) => {
      this.setState({books});
      console.log(this.state);
    });
  }

  onChangeShelf = (id, shelf) => {
    console.log('App onChangeShelf() id = ' + id + " | shelf = " + shelf);
    BooksAPI.update(id, shelf).then( (response) => {
      console.log('BooksAPI.update() response =' + response);
      this.refreshAllShelves();
    });
  }

  render() {
    console.log('BooksApp state = ' + this.state);
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books ? this.state.books.map(bookdata =>
                          <li key={bookdata.id}>
                            { bookdata.shelf === Constants.SHELF_CURRENTLY_READING && <Book bookdata={bookdata} onChangeShelf={this.onChangeShelf} /> }
                          </li>
                        ) : (<span>Loading...</span>)
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books ? this.state.books.map(bookdata =>
                          <li key={bookdata.id}>
                            { bookdata.shelf === Constants.SHELF_WANT_TO_READ && <Book bookdata={bookdata} onChangeShelf={this.onChangeShelf} /> }
                          </li>
                        ) : (<span>Loading...</span>)
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books ? this.state.books.map(bookdata =>
                          <li key={bookdata.id}>
                            { bookdata.shelf === Constants.SHELF_READ && <Book bookdata={bookdata} onChangeShelf={this.onChangeShelf} /> }
                          </li>
                        ) : (<span>Loading...</span>)
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>

        <Route path="/search" component={ Search }/>
      </div>
    )
  }
}

export default BooksApp
