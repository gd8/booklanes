import { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BookDetail } from './pages/book-detail/book-detail';
import { Navbar } from './shared/components/navbar/navbar';
import { NewBook } from './pages/new-book/new-book';
import { BookLanes } from './pages/book-lanes/book-lanes';
import {
  addBook,
  deleteBook,
  editBook,
  initBooks,
  moveBook,
  reorderBook,
} from './redux/books-slice';
import { NotFound } from './shared/components/not-found';

export class App extends Component<any, any> {
  constructor(props) {
    super(props);
    let storedBooks = {};
    try {
      storedBooks = JSON.parse(localStorage.getItem('books'));
    } catch {}
    this.props.initBooks(storedBooks ? storedBooks : {});
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
              <BookLanes
                books={this.props.booksByLane}
                updateBook={this.updateBook.bind(this)}
                moveBook={this.moveBook.bind(this)}
                reorderBook={this.reorderBook.bind(this)}
              />
            </Route>
            <Route
              path='/books/:id'
              render={(props) => {
                const bookId = props.match.params.id;
                const book = (Object.values(this.props.booksByLane) as any)
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
  booksByLane: state.books.booksByLane,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
