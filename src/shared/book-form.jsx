import { Component } from 'react';

export class BookForm extends Component {
  constructor(props) {
    super(props);
    const title = this.props.book?.title || '';
    const author = this.props.book?.author || '';
    const notes = this.props.book?.notes || '';
    this.state = { title, author, notes };
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const author = this.state.author;
    const title = this.state.title;
    const notes = this.state.notes;
    this.props.onSubmit({ author, title, notes });
    this.setState({ title: '', author: '', notes: '' });
  }

  cancel(event) {
    event.preventDefault();
    this.props.cancel();
  }

  render() {
    const title = this.props.title || 'Enter Book';
    return (
      <div className='card book-card'>
        <header className='card-header has-background-primary'>
          <p className='card-header-title'>{title}</p>
        </header>
        <div className='card-content'>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className='field'>
              <label className='label'>Title</label>
              <div className='control'>
                <input
                  type='text'
                  name='title'
                  className='input is-primary'
                  value={this.state.title}
                  onChange={this.onChange.bind(this)}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Author</label>
              <input
                type='text'
                name='author'
                className='input is-primary'
                value={this.state.author}
                onChange={this.onChange.bind(this)}
              />
            </div>
            <div className='field'>
              <label className='label'>Notes</label>
              <textarea
                type='text'
                name='notes'
                className='textarea is-primary'
                rows='3'
                value={this.state.notes}
                onChange={this.onChange.bind(this)}
              />
            </div>
            <div className='field is-grouped'>
              <p className='control'>
                <button
                  type='button'
                  className='button'
                  onClick={this.cancel.bind(this)}
                >
                  Cancel
                </button>
              </p>
              <p className='control'>
                <input
                  type='submit'
                  className='button is-link is-outlined'
                  value='Submit'
                />
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
