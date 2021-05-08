import { Component } from 'react';

export class BookForm extends Component {
  constructor(props) {
    super(props);
    const title = this.props.book?.title || '';
    const author = this.props.book?.author || '';
    this.state = { title, author };
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const author = this.state.author;
    const title = this.state.title;
    this.props.onSubmit({ author, title });
    this.setState({ title: '', author: '' });
  }

  cancel(event) {
    event.preventDefault();
    this.props.cancel();
  }

  render() {
    const title = this.props.title || 'Enter Book';
    return (
      <div className='card book-card '>
        <header className='card-header'>
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
                  className='input'
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
                className='input'
                value={this.state.author}
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
