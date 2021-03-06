import React from 'react'

class Book extends React.Component {

    state = {shelf: 'none'};

    componentDidMount() {
      this.setState({shelf: this.props.bookdata.shelf});
    }

    onChangeShelf = (event) => {
      //console.log('Book onChangeShelf(), event.target.value = ', event.target.value);
      // Notify parent component that this book is now moved to another shelf
      this.props.onChangeShelf({id: this.props.bookdata.id}, event.target.value);
      this.setState({shelf: event.target.value});
    }

    render() {
        //console.log('Book render() state = ', this.state);
        return (
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.bookdata.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select value={this.state.shelf} onChange={this.onChangeShelf}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{this.props.bookdata.title}</div>
              <div className="book-authors">
                // show list of authors separated by commas. Don't add a comma at the end of last author.
                {(typeof this.props.bookdata.authors !== "undefined" && this.props.bookdata.authors.length > 0) ? this.props.bookdata.authors.map((author, index, arr) => {
                      if(index === arr.length - 1) {
                        return author
                      } else {
                        return `${author}, `;
                      }
                    }
                  ) : null
                }
              </div>
            </div>
        );
    }
}

export default Book;
