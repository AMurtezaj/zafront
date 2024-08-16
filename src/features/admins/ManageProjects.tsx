import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import '../../App1.css'; // Ensure this file includes the new styles

const ManageProjects = () => {
  const { projectStore } = useStore();
  const { loadProjects, projectById, deleteProject, loadingInitial, error } = projectStore;
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  if (loadingInitial) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h2>Manage Projects</h2>
      <button className="btn btn-primary mb-3" onClick={() => navigate('/admin/add-project')}>Add Project</button>
      <div className="row">
        {projectById.map(project => (
          <div className="col-md-4" key={project.id}>
            <div className="card mb-4 shadow-sm">
              <img src={project.image} className="card-img-top" alt={project.title} />
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">{project.description}</p>
                <button className="btn btn-danger" onClick={() => deleteProject(project.id)}>Delete</button>
                <Link className="btn btn-primary" to={`/admin/edit-project/${project.id}`}>Edit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(ManageProjects);

// import React, { useEffect, useState } from 'react';
// import { observer } from 'mobx-react-lite';
// import { Link, useNavigate } from 'react-router-dom';
// import { useStore } from '../../app/stores/store';
// import '../../App1.css'; // Ensure this file includes the new styles

// const ManageProjects = () => {
//   const { projectStore } = useStore();
//   const { loadProjects, projectById, updateProjectOrder, deleteProject, loadingInitial, error } = projectStore;
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     loadProjects().then(() => setProjects(projectById));
//   }, [loadProjects, projectById]);

//   const handlePositionChange = (index, newPosition) => {
//     const updatedProjects = [...projects];
//     updatedProjects[index] = { ...updatedProjects[index], position: newPosition };
//     setProjects(updatedProjects);
//   };

//   const saveOrder = () => {
//     const orderedProjects = projects.map((project, index) => ({
//       ...project,
//       position: parseInt(project.position, 10) || index + 1, // Default to current index if position is invalid
//     }));
//     orderedProjects.sort((a, b) => a.position - b.position); // Ensure the projects are sorted by the position before saving
//     updateProjectOrder(orderedProjects); // Update the order in the store or backend
//   };

//   const renderProject = (project, index) => (
//     <div className="col-md-4 mb-4 shadow-sm" key={project.id}>
//       <div className="card">
//         <img src={project.image} className="card-img-top" alt={project.title} />
//         <div className="card-body">
//           <h5 className="card-title">{project.title}</h5>
//           <p className="card-text">{project.description}</p>
//           <div className="form-group">
//             <label>Position:</label>
//             <input
//               type="number"
//               value={project.position || ''}
//               onChange={(e) => handlePositionChange(index, e.target.value)}
//               className="form-control"
//               min="1"
//             />
//           </div>
//           <button className="btn btn-danger mt-2" onClick={() => deleteProject(project.id)}>Delete</button>
//           <Link className="btn btn-primary mt-2" to={`/admin/edit-project/${project.id}`}>Edit</Link>
//         </div>
//       </div>
//     </div>
//   );

//   if (loadingInitial) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container">
//       <h2>Manage Projects</h2>
//       <button className="btn btn-primary mb-3" onClick={() => navigate('/admin/add-project')}>Add Project</button>
//       <button className="btn btn-success mb-3" onClick={saveOrder}>Save Order</button>
//       <div className="row">
//         {projects.map((project, index) => renderProject(project, index))}
//       </div>
//     </div>
//   );
// };

// export default observer(ManageProjects);
