// styles
import './FriendsBar.css';

// hooks
import useCollection from '../../hooks/useCollections';
import { useAuthContext } from '../../hooks/useAuthContext';

// components
import Avatar from '../avatar/Avatar';

const FriendsBar = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection('users', ['__name__', '!=', user.uid], ['__name__']);

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {documents &&
        documents.map((friend) => (
          <div key={friend.id} className="user-list-item">
            {friend.online && <span className="online-user"></span>}
            <span>{friend.displayName}</span>
            <Avatar src={friend.photoURL} />
          </div>
        ))}
    </div>
  );
};
export default FriendsBar;
