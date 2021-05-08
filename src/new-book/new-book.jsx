import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BookForm } from '../shared/book-form';

export class NewBook extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null };
  }

  onNewBookSubmit(form) {
    this.props.onNewBookSubmit(form);
    this.setState({ redirect: 'books' });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <BookForm
        onSubmit={this.onNewBookSubmit.bind(this)}
        cancel={() => this.setState({ redirect: 'books' })}
      />
    );
  }
}
