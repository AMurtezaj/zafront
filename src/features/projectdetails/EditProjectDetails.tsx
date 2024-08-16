// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { observer } from 'mobx-react-lite';
// import { useStore } from '../../app/stores/store';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { ProjectDetails } from '../../app/models/ProjectDetails';

// const EditProjectDetails: React.FC = () => {
//   const { projectDetailsStore } = useStore();
//   const { loadProjectDetail, updateProjectDetails, selectedProjectDetails, loadProjects, projects } = projectDetailsStore;
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [videoFile, setVideoFile] = useState<File | undefined>(undefined);
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [formError, setFormError] = useState<string | null>(null);

//   useEffect(() => {
//     if (id) {
//       loadProjectDetail(id);
//     }
//     loadProjects(); // Load projects for the dropdown
//   }, [id, loadProjectDetail, loadProjects]);

//   const validationSchema = Yup.object({
//     location: Yup.string().required('Location is required'),
//     year: Yup.string().required('Year is required'),
//     status: Yup.string().required('Status is required'),
//     projectId: Yup.string().required('Project selection is required'),
//   });

//   const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setVideoFile(e.target.files[0]);
//     }
//   };

//   const handleImageFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setImageFiles(Array.from(e.target.files));
//     }
//   };

//   const handleSubmit = async (values: ProjectDetails) => {
//     const formData = new FormData();
//     formData.append('id', id || '');
//     formData.append('location', values.location);
//     formData.append('year', values.year);
//     formData.append('status', values.status);
//     formData.append('projectId', values.projectId);

//     if (videoFile) {
//       formData.append('videoFile', videoFile);
//     }
    
//     imageFiles.forEach(file => {
//       formData.append('ImageFiles', file);
//     });

//     try {
//       if (id) {
//         await updateProjectDetails(formData);
//         navigate('/admin/manage-project-details');
//       }
//     } catch (error: any) {
//       console.error("Error updating project details:", error);
//       setFormError(error.message || 'An error occurred');
//     }
//   };

//   if (!selectedProjectDetails) return <div>Loading...</div>;

//   return (
//     <div className="form-container">
//       <div className="form-card">
//         <h2>Edit Project Details</h2>
//         <Formik
//           initialValues={selectedProjectDetails}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//           enableReinitialize
//         >
//           {({ isSubmitting }) => (
//             <Form className="mt-6">
//               <div className="mb-4">
//                 <label htmlFor="location" className="label">Location</label>
//                 <Field
//                   type="text"
//                   id="location"
//                   name="location"
//                   placeholder="Enter location"
//                   className="input-field"
//                 />
//                 <ErrorMessage name="location" component="div" className="error-message" />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="year" className="label">Year</label>
//                 <Field
//                   type="text"
//                   id="year"
//                   name="year"
//                   placeholder="Enter year"
//                   className="input-field"
//                 />
//                 <ErrorMessage name="year" component="div" className="error-message" />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="status" className="label">Status</label>
//                 <Field
//                   type="text"
//                   id="status"
//                   name="status"
//                   placeholder="Enter status"
//                   className="input-field"
//                 />
//                 <ErrorMessage name="status" component="div" className="error-message" />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="projectId" className="label">Project</label>
//                 <Field as="select" id="projectId" name="projectId" className="input-field">
//                   <option value="">Select a Project</option>
//                   {projects.map((project) => (
//                     <option key={project.id} value={project.id}>
//                       {project.title}
//                     </option>
//                   ))}
//                 </Field>
//                 <ErrorMessage name="projectId" component="div" className="error-message" />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="videoFile" className="label">Upload New Video</label>
//                 <input
//                   type="file"
//                   id="videoFile"
//                   accept="video/*"
//                   onChange={handleVideoFileChange}
//                   className="input-field"
//                 />
//                 {selectedProjectDetails.video && (
//                   <p>
//                     Current video: <a href={selectedProjectDetails.video} target="_blank" rel="noopener noreferrer">{selectedProjectDetails.video}</a>
//                   </p>
//                 )}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="imageFiles" className="label">Upload New Images</label>
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleImageFilesChange}
//                   className="input-field"
//                 />
//                 <p>Current images:</p>
//                 <ul>
//                   {selectedProjectDetails.images.map((image, index) => (
//                     <li key={index}>
//                       <a href={image} target="_blank" rel="noopener noreferrer">{image}</a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="submit"
//                   className="submit-btn"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Submitting...' : 'Submit'}
//                 </button>
//               </div>
//               {formError && <div className="error-message">{formError}</div>}
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default observer(EditProjectDetails);

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useNavigate, useParams } from 'react-router-dom';
import '../../App1.css'; // Import the CSS file for styling
import axios from 'axios';

const EditProjectDetails: React.FC = () => {
  const { projectDetailsStore } = useStore();
  const { loadProjectDetail, selectedProjectDetails, loadProjects } = projectDetailsStore;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    id: '',
    location: '',
    year: '',
    status: '',
    projectId: '',
    video: '',
    images: [] as string[],
  });

  const [videoFile, setVideoFile] = useState<File | undefined>(undefined);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await loadProjectDetail(id);
        await loadProjects();
      }
    };

    fetchData();
  }, [id, loadProjectDetail, loadProjects]);

  useEffect(() => {
    if (selectedProjectDetails) {
      setFormValues({
        id: selectedProjectDetails.id,
        location: selectedProjectDetails.location || '',
        year: selectedProjectDetails.year || '',
        status: selectedProjectDetails.status || '',
        projectId: selectedProjectDetails.projectId || '',
        video: selectedProjectDetails.video || '',
        images: selectedProjectDetails.images || [],
      });
    }
  }, [selectedProjectDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const updateProjectDetails = async () => {
    const formData = new FormData();

    // Append video file
    if (videoFile) {
      formData.append('videoFile', videoFile);
    }

    // Append image files
    imageFiles.forEach((file) => {
      formData.append('ImageFiles', file);
    });

    // Append other form data
    if(id){
      formData.append('id', id);
    }
    formData.append('location', formValues.location);
    formData.append('year', formValues.year);
    formData.append('status', formValues.status);
    formData.append('projectId', formValues.projectId);

    try {
      const response = await axios.put(`/videoupload/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error updating project details:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await updateProjectDetails();
      console.log('Update successful:', response);
      navigate('/admin/manage-project-details');
    } catch (error: any) {
      console.error('Error updating project details:', error);
      setFormError(error.message || 'An error occurred');
    }
  };

  if (!selectedProjectDetails) return <div>Loading...</div>;

  return (
    <div className="form-container">
      <h2>Edit Project Details</h2>
      <form onSubmit={handleSubmit} className="project-details-form">
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formValues.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />
        </div>
        <div className="form-group">
          <label>Year</label>
          <input
            type="text"
            name="year"
            value={formValues.year}
            onChange={handleChange}
            placeholder="Year"
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <input
            type="text"
            name="status"
            value={formValues.status}
            onChange={handleChange}
            placeholder="Status"
            required
          />
        </div>
        <div className="form-group">
          <label>Project</label>
          <select
            name="projectId"
            value={formValues.projectId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Project</option>
            {projectDetailsStore.projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Upload New Video</label>
          <input type="file" accept="video/*" onChange={handleFileChange} />
          {formValues.video && (
            <p>
              Current video:{' '}
              <a href={formValues.video} target="_blank" rel="noopener noreferrer">
                {formValues.video}
              </a>
            </p>
          )}
        </div>
        <div className="form-group">
          <label>Upload New Images</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
          <p>Current images:</p>
          <ul>
            {formValues.images.map((image, index) => (
              <li key={index}>
                <a href={image} target="_blank" rel="noopener noreferrer">
                  {image}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {formError && <div className="error-message">{formError}</div>}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default observer(EditProjectDetails);

