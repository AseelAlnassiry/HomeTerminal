// styles
import './ProjectSummary.css';

// components
import Avatar from '../avatar/Avatar';

// hooks
import useFirestore from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const ProjectSummary = ({ project }) => {
  const { removeDocument } = useFirestore('projects');
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = (e) => {
    removeDocument(project.id);
    navigate('/');
  };

  return (
    <div className=''>
      <div className='project-summary'>
        <h2 className='page-title'>{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className='due-date'>Project due by {project.dueDate.toDate().toDateString()}</p>
        <p className='details'>{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className='assigned-users'>
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className='btn deletebtn' onClick={handleClick}>
          Mark as Complete
        </button>
      )}
    </div>
  );
};
export default ProjectSummary;
