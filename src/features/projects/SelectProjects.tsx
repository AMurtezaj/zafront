// import React, { useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import { useStore } from '../../app/stores/store';
// import { Project } from '../../app/models/Project';
// import '../../App1.css';

// const SelectProjects = () => {
//   const { projectStore } = useStore();
//   const {
//     projects,
//     selectedProjects,
//     loadProjects,
//     loadSelectedProjects,
//     selectProject,
//     deselectProject,
//   } = projectStore;

//   useEffect(() => {
//     loadProjects();          // Load all projects when the component mounts
//     loadSelectedProjects();  // Load selected projects when the component mounts
//   }, [loadProjects, loadSelectedProjects]);

//   const handleSelect = (project: Project) => {
//     console.log('Selected Projects:', selectedProjects);  // Debugging: Check the state of selected projects

//     if (Array.isArray(selectedProjects) && selectedProjects.some(sp => sp.id === project.id)) {
//       // Deselect the project if it is already selected
//       deselectProject(project);
//     } else {
//       // Select the project if it is not selected
//       selectProject(project);
//     }
//   };

//   return (
//     <div className="project-selector-container">
//       <h2>Select Projects</h2>
//       <ul className="project-list">
//         {projects.map((project) => (
//           <li key={project.id} className="project-list-item">
//             <input
//               type="checkbox"
//               checked={Array.isArray(selectedProjects) && selectedProjects.some(sp => sp.id === project.id)}
//               onChange={() => handleSelect(project)}
//             />
//             {project.title}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default observer(SelectProjects);

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Project } from '../../app/models/Project';
import '../../App1.css';

const SelectProjects = () => {
  const { projectStore } = useStore();
  const {
    projects,
    selectedProjects,
    loadProjects,
    loadSelectedProjects,
    selectProject,
    deselectProject,
  } = projectStore;

  useEffect(() => {
    loadProjects();          // Load all projects when the component mounts
    loadSelectedProjects();  // Load selected projects when the component mounts
  }, [loadProjects, loadSelectedProjects]);

  const handleSelect = (project: Project) => {
    if (Array.isArray(selectedProjects) && selectedProjects.some(sp => sp.id === project.id)) {
      // Deselect the project if it is already selected
      deselectProject(project);
    } else {
      // Select the project if it is not selected
      selectProject(project);
    }
  };

  return (
    <div className="project-selector-container">
      <h2>Select Projects</h2>
      <ul className="project-list">
        {projects.map((project) => {
          const isSelected = Array.isArray(selectedProjects) && selectedProjects.some(sp => sp.id === project.id);
          const order = isSelected ? selectedProjects.findIndex(sp => sp.id === project.id) + 1 : null;

          return (
            <li key={project.id} className="project-list-item">
              <label>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleSelect(project)}
                />
                {order && <span className="order-number">{order}</span>}
                {project.title}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default observer(SelectProjects);