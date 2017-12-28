import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class Search extends React.Component {
	state = {
		query: '',
		searchResults: [],
        booksOnShelf:[], // For displaying correct book state(which shelf they're in) in search results
		bookIdsOnShelf: [] // For keeping track of which books are on a shelf
	};

	componentDidMount() {
    	this.loadBooksOnShelf();
  	}

    onChangeShelf = (id, shelf) => {
        // console.log('App onChangeShelf() id = ' + id + " | shelf = " + shelf);
        // BooksAPI.update(id, shelf).then( (response) => {
        //   console.log('BooksAPI.update() response = ', response);
        // });
        BooksAPI.update(id, shelf);
    }

	loadBooksOnShelf = () => {
    	BooksAPI.getAll().then( (booksOnShelf) => {
            // Create an array of book ids that are on a shelf
            const bookIdsOnShelf = booksOnShelf.map(book => book.id);
            this.setState({booksOnShelf: booksOnShelf, bookIdsOnShelf: bookIdsOnShelf});
            //console.log('bookIdsOnShelf = ', bookIdsOnShelf);
		});
  	}

	updateQuery = (query) => {
		let searchQuery = query;
		this.setState({ query: searchQuery })
		BooksAPI.search(searchQuery).then((searchResults) => {
	      // Using map(), create an array of final search results that has correct 'shelf' property
          const finalResults = searchResults.map( bookInSearchResult => {
                if(this.state.bookIdsOnShelf.includes(bookInSearchResult.id)){ // Is this book on the shelf?
                    const sameBookWithShelfProperty = this.state.booksOnShelf.find(bookOnShelf => bookOnShelf.id === bookInSearchResult.id)
                    return sameBookWithShelfProperty // Return book object that contain 'shelf' property
                }else{
                    return bookInSearchResult // Return book object with no 'shelf' property
                }
            });
          //console.log('resultsWithoutBooksOnShelf', finalResults);
	      this.setState({searchResults: finalResults});
	    });
	}

	render() {
		return (
			<div className="search-books">
	          <div className="search-books-bar">
	            <Link className="close-search" to="/">Close</Link>
	              <div className="search-books-input-wrapper">
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
                      <Book bookdata={bookdata} onChangeShelf={this.onChangeShelf} shelf={bookdata.shelf}/> }
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
