import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { NewBook } from './new-book/new-book';
import { Books } from './books/books';
import { BookDetail } from './book-detail/book-detail';
import { NotFound } from './shared/not-found';

export default class App extends Component {
  constructor(props) {
    super(props);
    const storedBooks = localStorage.getItem('books');
    this.state = {
      books: storedBooks ? JSON.parse(storedBooks) : [],
    };
  }

  saveBooks(books) {
    this.setState({
      books,
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  onNewBookSubmit(form) {
    const newBooks = {
      ...this.state.books,
      0: [
        ...(this.state.books[0] || []),
        {
          ...form,
          status: 0,
          id: String(this.state.books?.[0]?.length || 0),
        },
      ],
    };
    this.saveBooks(newBooks);
  }

  updateBook(updatedBook) {
    const updatedBooks = {
      ...this.state.books,
      [updatedBook.status]: this.state.books[updatedBook.status].map((book) => {
        if (updatedBook.id === book.id) {
          return {
            ...book,
            ...updatedBook,
          };
        }
        return book;
      }),
    };
    this.saveBooks(updatedBooks);
  }

  moveBook(movedBook, from, to, index) {
    movedBook = { ...movedBook, status: to };
    const updatedBooks = {
      ...this.state.books,
      [from]: this.state.books[from].filter((book) => book.id !== movedBook.id),
      [to]: (this.state.books[to] || []).concat(movedBook),
    };
    this.saveBooks(updatedBooks);
  }

  reorderBook(reorderedBook, index) {
    const books = this.state.books[reorderedBook.status].filter(
      (book) => book.id !== reorderedBook.id
    );
    const updatedBooks = {
      ...this.state.books,
      [reorderedBook.status]: [
        ...books.slice(0, index),
        reorderedBook,
        ...books.slice(index),
      ],
    };
    this.saveBooks(updatedBooks);
  }

  deleteBook(bookToDelete) {
    const updatedBooks = this.state.books.filter((book) => {
      return book.id !== bookToDelete.id;
    });
    this.saveBooks(updatedBooks);
  }

  render() {
    return (
      <Router>
        <nav className='navbar has-background-primary-light'>
          <div className='container'>
            <div className='navbar-menu'>
              <ul className='navbar-start'>
                <li className='navbar-item'>
                  <Link to='/'>Home</Link>
                </li>
                <li className='navbar-item'>
                  <Link to='/books'>Books</Link>
                </li>
                <li className='navbar-item'>
                  <Link to='/new'>New Book</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className='container'>
          <Switch>
            <Route path='/new'>
              <NewBook onNewBookSubmit={this.onNewBookSubmit.bind(this)} />
            </Route>
            <Route exact path='/books'>
              <Books
                books={this.state.books}
                updateBook={this.updateBook.bind(this)}
                moveBook={this.moveBook.bind(this)}
                reorderBook={this.reorderBook.bind(this)}
              />
            </Route>
            <Route
              path='/books/:id'
              render={(props) => {
                const bookId = props.match.params.id;
                const book = this.state.books.find(
                  (book) => String(book.id) === String(bookId)
                );
                return book ? (
                  <BookDetail
                    book={book}
                    updateBook={this.updateBook.bind(this)}
                    deleteBook={this.deleteBook.bind(this)}
                    history={props.history}
                  />
                ) : (
                  <NotFound />
                );
              }}
            ></Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function Home() {
  return (
    <section className='section'>
      <h2>Home</h2>
    </section>
  );
}
