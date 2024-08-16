// import React, { useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import { Link, useNavigate } from 'react-router-dom';
// import { useStore } from '../../app/stores/store';
// import '../../App1.css';

// const ManageProjectDetails = () => {
//   const { projectDetailsStore } = useStore();
//   const { loadProjectDetails, projectDetailsById, deleteProjectDetail, loadingInitial, error } = projectDetailsStore;
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadProjectDetails();
//   }, [loadProjectDetails]);

//   if (loadingInitial) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
// 
//   return (
//     <div className="management-container">
//       <h2 className="management-title">Manage Project Details</h2>
//       <button onClick={() => navigate('/admin/add-project-details')}>Add Project Details</button>
//       <div className="row">
//         {projectDetailsById.map(projectDetail => (
//           <div className="col-md-4" key={projectDetail.id}>
//             <div className="card mb-4 shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title">Project ID: {projectDetail.projectId}</h5>
//                 <p className="card-text">Location: {projectDetail.location}</p>
//                 <p className="card-text">Year: {projectDetail.year}</p>
//                 <p className="card-text">Status: {projectDetail.status}</p>
//                 {projectDetail.video && (
//                   <div className="mb-2">
//                     <a href={projectDetail.video} target="_blank" rel="noopener noreferrer">View Video</a>
//                   </div>
//                 )}
//                 <ul>
//                   {projectDetail.images.map((image, index) => (
//                     <li key={index}>
//                       <a href={image} target="_blank" rel="noopener noreferrer">Image {index + 1}</a>
//                     </li>
//                   ))}
//                 </ul>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => deleteProjectDetail(projectDetail.id)}
//                 >
//                   Delete
//                 </button>
//                 <Link
//                   className="btn btn-primary"
//                   to={`/admin/edit-project-details/${projectDetail.id}`}
//                 >
//                   Edit
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default observer(ManageProjectDetails);
// File: src/features/admins/ManageProjectDetails.tsx

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Link, useNavigate } from 'react-router-dom';
import '../../App1.css'; // Import styles
import { ProjectDetails } from '../../app/models/ProjectDetails';

const ManageProjectDetails: React.FC = () => {
  const { projectDetailsStore } = useStore();
  const { loadProjectDetails, projectDetailsById, deleteProjectDetail, loadingInitial, error } = projectDetailsStore;
  const navigate = useNavigate();

  useEffect(() => {
    loadProjectDetails(); // Load project details on component mount
  }, [loadProjectDetails]);

  // Handle loading and error states
  if (loadingInitial) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h2 className="content">Manage Project Details</h2>
      <button onClick={() => navigate('/admin/add-projectdetails')} className="btn btn-primary mb-3">
        Add Project Detail
      </button>
      <div className="row">
        {projectDetailsById.map((projectDetail: ProjectDetails) => (
          <div className="col-md-4" key={projectDetail.id}>
            <div className="card mb-4 shadow-sm">
              {projectDetail.images.length > 0 && (
                <img src={projectDetail.images[0]} className="card-img-top" alt="Project" />
              )}
              <div className="card-body">
                <h5 className="card-title">{projectDetail.location}</h5>
                <p className="card-text">Year: {projectDetail.year}</p>
                <p className="card-text">Status: {projectDetail.status}</p>
                <p className="card-text">Status: {projectDetail.projectId}</p>
                {projectDetail.video && (
                  <video controls width="100%">
                    <source src={projectDetail.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProjectDetail(projectDetail.id)}
                  >
                    Delete
                  </button>
                  <Link className="btn btn-primary" to={`/admin/edit-projectdetail/${projectDetail.id}`}>
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(ManageProjectDetails);
