import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='navbar is-primary'>
      <div className='container'>
        <div className='navbar-brand'>
          <ul className='navbar-start'>
            <li className='navbar-item'>
              <Link to='/' className='is-capitalized has-text-weight-bold'>
                Home
              </Link>
            </li>
            <li className='navbar-item'>
              <Link to='/books' className='is-capitalized has-text-weight-bold'>
                Books
              </Link>
            </li>
            <li className='navbar-item'>
              <Link to='/new' className='is-capitalized has-text-weight-bold'>
                New Book
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
