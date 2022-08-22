// styles
import './Filter.css';

// hooks
import { useState } from 'react';

// filter list
const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales'];

const Filter = () => {
  const [currentFilter, setCurrentFilter] = useState('all');

  const handleClick = (newFilter) => {
    console.log(newFilter);
    setCurrentFilter(newFilter);
  };

  return (
    <div className='project-fileter'>
      <nav>
        {filterList.map((filter) => (
          <button key={filter} onClick={() => handleClick(filter)} className={currentFilter === filter ? 'active' : ''}>
            {filter}
          </button>
        ))}
      </nav>
    </div>
  );
};
export default Filter;
