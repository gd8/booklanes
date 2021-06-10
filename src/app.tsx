import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import BookDetail from './pages/book-detail/book-detail';
import BookLanes from './pages/book-lanes/book-lanes';
import NewBook from './pages/new-book/new-book';
import { initBooks } from './redux/books-slice';
import { Navbar } from './shared/components/navbar';

export class App extends Component<any, any> {
  constructor(props) {
    super(props);
    this.props.initBooks();
  }

  render() {
    return (
      <Router>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route path='/new'>
              <NewBook />
            </Route>
            <Route exact path='/books'>
              <BookLanes />
            </Route>
            <Route
              path='/books/:id'
              render={(props) => {
                const bookId = props.match.params.id;
                return <BookDetail id={bookId} history={props.history} />;
              }}
            ></Route>
            <Redirect exact from='/' to='books' />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = {
  initBooks,
};

export default connect(null, mapDispatchToProps)(App);
