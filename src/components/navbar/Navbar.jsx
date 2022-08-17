// styles
import './Nacbar.css';

// router
import { Link } from 'react-router-dom';

// images
import Temple from '../../assets/temple.svg';

// hooks
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

const Navbar = () => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="main logo" />
          <span>Home Terminal</span>
        </li>

        {!user && (
          <li>
            <Link to="login">Login</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="signup">Signup</Link>
          </li>
        )}
        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPending && (
              <button className="btn" onClick={logout} disabled>
                Logging out...
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};
export default Navbar;
