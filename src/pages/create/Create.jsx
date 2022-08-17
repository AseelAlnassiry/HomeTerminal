// styles
import './Create.css';

// hooks
import { useState } from 'react';

const Create = () => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [categories, setCategories] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, details, dueDate, categories, assignedUsers)
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Project name</label>
        <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} value={name} />
        <label htmlFor="details">Project details</label>
        <textarea name="details" id="details" cols="30" rows="10" onChange={(e) => setDetails(e.target.value)} value={details}></textarea>
        <label htmlFor="due-date">Set due date:</label>
        <input type="date" name="due-date" id="due-date" onChange={(e) => setDueDate(e.target.value)} value={dueDate} />

        <button className="btn" id='submit-button'>Submit</button>
      </form>
    </div>
  );
};
export default Create;
