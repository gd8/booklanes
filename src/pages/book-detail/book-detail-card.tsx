import { Lanes } from '../../shared/lanes';

export const BookDetailCard = (props) => {
  const book = props.book;
  const laneColorMap = {
    '0': 'is-info',
    '1': 'is-primary',
    '2': 'is-success',
  };
  const laneTitleMap = Lanes.reduce((laneTitleMap, lane) => {
    laneTitleMap[lane.id] = lane.description;
    return laneTitleMap;
  }, {});
  return (
    <section className='section'>
      <div className='card book-card'>
        <header className='card-header has-background-primary'>
          <p className='card-header-title'>{book.title}</p>
          <span
            className={`tag m-2 is-light ${
              laneColorMap[book.status] || 'is-info'
            }`}
          >
            {laneTitleMap[book.status]}
          </span>
        </header>
        <div className='card-content'>
          <span className='subtitle'>By {book.author}</span>
          <p className='notes'>{book.notes}</p>
        </div>
        <footer className='book-card-footer card-footer'>
          <div className='field is-grouped'>
            <p className='control'>
              <button
                className='button is-success is-outlined'
                onClick={() => props.editBook()}
              >
                Edit
              </button>
            </p>
            <p className='control'>
              <button
                className='button is-danger is-outlined'
                onClick={() => props.openDelete()}
              >
                Delete
              </button>
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};
