import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class Search extends React.Component {
	state = {
		query: '',
		searchResults: [],
        booksOnShelf:[],
		bookIdsOnShelf: []
	};

	componentDidMount() {
    	this.loadBooksOnShelf();
  	}

	loadBooksOnShelf = () => {
    	BooksAPI.getAll().then( (booksOnShelf) => {
            const bookIdsOnShelf = booksOnShelf.map(book => book.id);
            console.log('bookIdsOnShelf = ' + bookIdsOnShelf);
            this.setState({booksOnShelf: booksOnShelf, bookIdsOnShelf: bookIdsOnShelf});
		});
  	}

	updateQuery = (query) => {
		let searchQuery = query.trim();
		this.setState({ query: searchQuery })
		BooksAPI.search(searchQuery).then((searchResults) => {
	      console.log(searchResults);
	      this.setState({searchResults});
	    });
	}

	render() {
		console.log("Search, state = ", this.state);
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
	              	{this.state.searchResults.length > 0 ? this.state.searchResults.map(bookdata =>
                          <li key={bookdata.id}>
                            <Book bookdata={bookdata} /> }
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
