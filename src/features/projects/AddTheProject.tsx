// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { observer } from 'mobx-react-lite';
// import { useStore } from '../../app/stores/store';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Project } from '../../app/models/Project';

// const AddTheProject: React.FC = () => {
//   const { projectStore } = useStore();
//   const { createProject } = projectStore;
//   const navigate = useNavigate();
//   const [file, setFile] = useState<File | null>(null);

//   const initialValues: Project = { id: '', title: '', description: '', image: '' };

//   const validationSchema = Yup.object({
//     title: Yup.string().required('Title is required'),
//     description: Yup.string().required('Description is required'),
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (values: Project) => {
//     const formData = new FormData();
//     formData.append('title', values.title);
//     formData.append('description', values.description);

//     if (file) {
//       formData.append('file', file);
//     } else {
//       formData.append('file', new Blob());  // Adding an empty Blob if no file is selected
//     }

//     try {
//       await createProject(formData);
//       navigate(`/admin/manage-projects`);
//     } catch (error) {
//       console.error('Failed to create project:');
//     }
//   };

//   return (
//     <div className="form-container">
//       <div className="form-card">
//         <h2>Add New Project</h2>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form className="mt-6">
//               <div className="mb-4">
//                 <label htmlFor="title" className="label">Title</label>
//                 <Field
//                   type="text"
//                   id="title"
//                   name="title"
//                   placeholder="Enter project title"
//                   className="input-field"
//                 />
//                 <ErrorMessage name="title" component="div" className="error-message" />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="description" className="label">Description</label>
//                 <Field
//                   as="textarea"
//                   id="description"
//                   name="description"
//                   placeholder="Enter project description"
//                   className="textarea-field"
//                 />
//                 <ErrorMessage name="description" component="div" className="error-message" />
//               </div>
              
//               <div className="mb-4">
//                 <label htmlFor="file" className="label">Image</label>
//                 <input
//                   type="file"
//                   id="file"
//                   onChange={handleFileChange}
//                   className="input-field"
//                 />
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
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default observer(AddTheProject);
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Project } from '../../app/models/Project';
import imageCompression from 'browser-image-compression'; // Import the compression library

const AddTheProject: React.FC = () => {
  const { projectStore } = useStore();
  const { createProject } = projectStore;
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const initialValues: Project = { id: '', title: '', description: '', Selected: false, image: ''};

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      
      try {
        const options = {
          maxSizeMB: 1,  
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(selectedFile, options);
        setFile(compressedFile);

      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  };

  const handleSubmit = async (values: Project) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('Selected', String(values.Selected));

    if (file) {
      formData.append('file', file);
    } else {
      formData.append('file', new Blob());  // Adding an empty Blob if no file is selected
    }

    try {
      await createProject(formData);
      navigate(`/admin/manage-projects`);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Add New Project</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6">
              <div className="mb-4">
                <label htmlFor="title" className="label">Title</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter project title"
                  className="input-field"
                />
                <ErrorMessage name="title" component="div" className="error-message" />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="label">Description</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Enter project description"
                  className="textarea-field"
                />
                <ErrorMessage name="description" component="div" className="error-message" />
              </div>
              
              <div className="mb-4">
                <label htmlFor="file" className="label">Image</label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="input-field"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="Selected" className="label">Mark as Selected</label>
                <Field
                  type="checkbox"
                  id="Selected"
                  name="Selected"
                  className="input-checkbox"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default observer(AddTheProject);
