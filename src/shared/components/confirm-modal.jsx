export const ConfirmModal = (props) => {
  return (
    <div className='modal is-active'>
      <div className='modal-background'></div>
      <div className='modal-card p-3'>
        <header className='modal-card-head'></header>
        <section className='modal-card-body'>
          Do you want to delete {props.title}?
        </section>
        <footer className='modal-card-foot'>
          <button className='button' onClick={props.cancel}>
            Cancel
          </button>
          <button
            className='button is-outlined is-danger'
            onClick={props.confirm}
          >
            Delete
          </button>
        </footer>
      </div>
    </div>
  );
};
