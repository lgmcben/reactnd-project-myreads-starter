import React from 'react'
import { Link } from 'react-router-dom'
import Constants from '../Constants'
import Book from './Book'

class Search extends React.Component {
	state = {
		query: ''
	};

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
	}

	render() {
		return (
			<div className="search-books">
	            <div className="search-books-bar">
	              <Link to="/" className="close-search">Close</Link>
	              <div className="search-books-input-wrapper">
	                {/*
	                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
	                  You can find these search terms here:
	                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

	                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
	                  you don't find a specific author or title. Every search is limited by search terms.
	                */}
	                <input type="text" 
	                	   placeholder="Search by title or author"
	                	   value={this.state.query}
	                	   onChange={(event) => this.updateQuery(event.target.value)}/>
	              </div>
	            </div>
	            <div className="search-books-results">
	              <ol className="books-grid">
	              	{this.state.books ? this.state.books.map(bookdata =>
                          <li key={bookdata.id}>
                            { bookdata.shelf === Constants.SHELF_CURRENTLY_READING && <Book bookdata={bookdata} onChangeShelf={this.onChangeShelf} /> }
                          </li>
                        ) : null
                    }
	              </ol>
	            </div>
            </div>
		);
	}
}

export default Search;
