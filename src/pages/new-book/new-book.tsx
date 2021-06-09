import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BookForm } from '../../shared/components/book-form';
import { addBook } from './../../redux/books-slice';

const NewBook = (props) => {
  const { addBook } = props;
  const history = useHistory();

  const redirect = () => {
    history.push('/books');
  };

  const onNewBookSubmit = (form) => {
    addBook(form);
    redirect();
  };

  return (
    <section className='section'>
      <BookForm onSubmit={onNewBookSubmit} cancel={redirect} />
    </section>
  );
};

const mapDispatchToProps = {
  addBook,
};

export default connect(null, mapDispatchToProps)(NewBook);
