import { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Books extends Component {
  constructor(props) {
    super(props);
    this.state = { draggingBook: null, redirect: null };
  }
  onDropBook(status) {
    this.setState({ draggingBook: null });
    this.props.updateBook({ ...this.state.draggingBook, status });
  }
  onDragStart(book) {
    this.setState({ draggingBook: book });
  }
  onDragEnd(book) {
    this.setState({ draggingBook: null });
  }
  onDoubleClick(book) {
    this.setState({ redirect: `books/${book.id}` });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const booksToRead = this.props.books.filter((book) => book.status === 0);
    const booksReading = this.props.books.filter((book) => book.status === 1);
    const booksRead = this.props.books.filter((book) => book.status === 2);
    const formatBooks = (books) =>
      books.map((book, index) => {
        const isDragging = book.id === this.state.draggingBook?.id;
        return (
          <li
            className='box is-draggable has-background-primary'
            draggable='true'
            style={isDragging ? { opacity: '.4' } : null}
            key={index}
            onDragStart={this.onDragStart.bind(this, book)}
            onDragEnd={this.onDragEnd.bind(this, book)}
            onDoubleClick={this.onDoubleClick.bind(this, book)}
          >
            <span className='title has-text-weight-bold'>{book.title} </span>
            <span className='subtitle'>{book.author} </span>
            <span className='icon'>
              <i className='fas fa-star'></i>
            </span>
            <span className='icon'>
              <i className='fas fa-star'></i>
            </span>
            <span className='icon'>
              <i className='fas fa-star'></i>
            </span>
          </li>
        );
      });

    return (
      <section className='section'>
        <div className='columns'>
          <div
            className='column book-column'
            onDrop={this.onDropBook.bind(this, 0)}
            onDragOver={(event) => event.preventDefault()}
          >
            <h3 className='title book-header is-3'>To Read</h3>
            <ul>{formatBooks(booksToRead)}</ul>
          </div>
          <div
            className='column book-column'
            onDrop={this.onDropBook.bind(this, 1)}
            onDragOver={(event) => event.preventDefault()}
          >
            <h3 className='title book-header is-3'>Reading</h3>
            <ul>{formatBooks(booksReading)}</ul>
          </div>
          <div
            className='column book-column'
            onDrop={this.onDropBook.bind(this, 2)}
            onDragOver={(event) => event.preventDefault()}
          >
            <h3 className='title book-header is-3'>Read</h3>
            <ul>{formatBooks(booksRead)}</ul>
          </div>
        </div>
      </section>
    );
  }
}
