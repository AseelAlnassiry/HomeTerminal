// styles
import './Create.css';

// hooks
import { useEffect, useState } from 'react';
import useCollections from '../../hooks/useCollections';
import { useAuthContext } from '../../hooks/useAuthContext';
import useFirestore from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';

// firebase config
import { Timestamp } from 'firebase/firestore';

// select
import Select from 'react-select';

// categories for select
const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

const Create = () => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [users, setUsers] = useState(null);
  const [categoryError, setCategoryError] = useState(null);
  const [ulError, setUlError] = useState(null);
  const { documents, error } = useCollections('users');
  const { user } = useAuthContext();
  const { addDocument, state } = useFirestore('projects');
  const navigate = useNavigate();

  useEffect(() => {
    // effect for mapping document
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });

      setUsers(options);

      // effect for category and user list error
      if (categoryError && category) {
        setCategoryError(null);
      }

      if (ulError && assignedUsers.length > 0) {
        setUlError(null);
      }
    }

    if (state.success) {
      console.log('submission successful');
      navigate('/');
    }
  }, [documents, assignedUsers.length, category, categoryError, ulError, navigate, state.success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCategoryError(null);
    setUlError(null);
    if (!category && assignedUsers.length === 0) {
      setCategoryError('no category was selected');
      setUlError('no users were selected');
    } else if (!category) {
      setCategoryError('no category was selected');
    } else if (assignedUsers.length === 0) {
      setUlError('no users were selected');
    } else {
      const createdBy = { displayName: user.displayName, photoURL: user.photoURL, id: user.uid };
      const assignedUsersList = assignedUsers.map((user) => {
        return {
          displayName: user.value.displayName,
          photoURL: user.value.photoURL,
          id: user.value.id,
        };
      });
      const date = new Date(dueDate);
      const project = { name, details, category: category.value, dueDate: Timestamp.fromDate(date), createdBy, comments: [], assignedUsersList };
      await addDocument(project);
    }
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Project name</label>
        <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} value={name} required />
        <label htmlFor="details">Project details</label>
        <textarea name="details" id="details" cols="30" rows="10" onChange={(e) => setDetails(e.target.value)} value={details} required></textarea>
        <label htmlFor="due-date">Set due date:</label>
        <input type="date" name="due-date" id="due-date" onChange={(e) => setDueDate(e.target.value)} value={dueDate} required />
        <label htmlFor="category">Project Category:</label>
        <Select options={categories} name="category" id="category" onChange={(option) => setCategory(option)} />
        {categoryError && <span>{categoryError}</span>}
        <label htmlFor="assign-to">Assign To:</label>
        <Select options={users} onChange={(option) => setAssignedUsers(option)} isMulti />
        {ulError && <span>{ulError}</span>}
        {error && <div className="error">{error}</div>}
        {state.error && <p>{state.error}</p>}
        <button className="btn" id="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Create;
