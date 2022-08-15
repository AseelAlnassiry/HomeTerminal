// styles
import './Nacbar.css';

// router
import { Link } from 'react-router-dom';

// images
import Temple from '../../assets/temple.svg';

const Navbar = () => {
  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt='main logo' />
          <span>Home Terminal</span>
        </li>

        <li>
          <Link to='login'>Login</Link>
        </li>
        <li>
          <Link to='signup'>Signup</Link>
        </li>
        <li>
          <button className="btn">Logout</button>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
