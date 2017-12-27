import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Constants from './Constants'
import Book from './components/Book'
import Search from './components/Search'

class BooksApp extends React.Component {
  state = {};

  componentDidMount() {
    this.refreshAllShelves();
  }

  componentWillReceiveProps(nextProps) {
    //console.log('componentWillReceiveProps, current props = ', this.props);
    //console.log('componentWillReceiveProps, nextProps = ', nextProps);
    // componentWillReceiveProps is called on a component that were mounted before, and are still mounted. Source https://github.com/ReactTraining/react-router/blob/86f5e2bd45a1d2419e36372cea649dddedee5f29/docs/ComponentLifecycleWhenRouting.md
    this.refreshAllShelves();
  }

  refreshAllShelves = () => {
    BooksAPI.getAll().then( (books) => {
      this.setState({books});
    });
  }

  onChangeShelf = (id, shelf) => {
    BooksAPI.update(id, shelf).then( (response) => {
      this.refreshAllShelves();
    });
  }

  render() {
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
