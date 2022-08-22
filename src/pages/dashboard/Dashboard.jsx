// styles
import './Dashboard.css'

// hooks
import useCollection from '../../hooks/useCollections';

// components
import ProjectList from '../../components/projectList/ProjectList';
import Filter from '../../components/filter/Filter';

const Dashboard = () => {
  const {documents, error } = useCollection('projects');

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <Filter />}
      {documents && <ProjectList projects={documents} />}
    </div>
  )
}
export default Dashboard