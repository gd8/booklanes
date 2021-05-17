import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BookDetail } from './book-detail/book-detail';
import { Books } from './books/books';
import { NewBook } from './new-book/new-book';
import {
  addBook,
  deleteBook,
  editBook,
  initBooks,
  moveBook,
  reorderBook,
} from './redux/books-slice';
import { NotFound } from './shared/not-found';
import { Navbar } from './navbar/navbar';

class App extends Component {
  constructor(props) {
    super(props);
    const storedBooks = localStorage.getItem('books');
    this.state = {
      books: storedBooks ? JSON.parse(storedBooks) : {},
    };
    this.props.initBooks(storedBooks ? JSON.parse(storedBooks) : {});
  }

  onNewBookSubmit(form) {
    this.props.addBook(form);
  }

  updateBook(updatedBook) {
    this.props.editBook(updatedBook);
  }

  moveBook(book, from, to, index) {
    this.props.moveBook({ book, from, to, index });
  }

  reorderBook(book, index) {
    this.props.reorderBook({ book, index });
  }

  deleteBook(bookToDelete) {
    this.props.deleteBook(bookToDelete);
  }

  render() {
    return (
      <Router>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route path='/new'>
              <NewBook onNewBookSubmit={this.onNewBookSubmit.bind(this)} />
            </Route>
            <Route exact path='/books'>
              <Books
                books={this.props.books}
                updateBook={this.updateBook.bind(this)}
                moveBook={this.moveBook.bind(this)}
                reorderBook={this.reorderBook.bind(this)}
              />
            </Route>
            <Route
              path='/books/:id'
              render={(props) => {
                const bookId = props.match.params.id;
                const book = Object.values(this.props.books)
                  .reduce((booksA, booksB) => [...booksA, ...booksB])
                  .find((book) => String(book.id) === String(bookId));
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

const mapDispatchToProps = {
  addBook,
  editBook,
  deleteBook,
  moveBook,
  reorderBook,
  initBooks,
};

const mapStateToProps = (state) => ({
  books: state.books.statuses,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
