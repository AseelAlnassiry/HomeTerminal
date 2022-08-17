// styles
import './Sidebar.css';

// router
import { NavLink } from 'react-router-dom';

// images
import DashboardIcon from '../../assets/dashboard_icon.svg';
import AddIcon from '../../assets/add_icon.svg';

// hooks
import { useAuthContext } from '../../hooks/useAuthContext';

// components
import Avatar from '../avatar/Avatar';

const Sidebar = () => {
  const { user } = useAuthContext();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey {user.displayName}</p>
          
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
