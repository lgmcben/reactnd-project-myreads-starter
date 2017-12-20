import React from 'react'
import '../App.css'

class Book extends React.Component {
    state = { shelf: '' };

    render() {
        return (
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.bookdata.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select>
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
                {this.props.bookdata.authors.map((author, index, arr) => {
                        if(index === arr.length - 1) {
                            return author
                        }
                        else {
                            return `${author}, `;
                        }
                    })
                }
              </div>





            </div>

        );
    }
}

export default Book;