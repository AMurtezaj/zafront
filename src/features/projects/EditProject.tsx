import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Project } from '../../app/models/Project';

const EditProject: React.FC = () => {
  const { projectStore } = useStore();
  const { loadProject, updateProject, selectedProject } = projectStore;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  useEffect(() => {
    if (id) {
      loadProject(id);
    }
  }, [id, loadProject]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (values: Project) => {
    const formData = new FormData();
    formData.append('id', id || '');
    formData.append('title', values.title);
    formData.append('description', values.description);
    if (file) {
      formData.append('image', file);
    } 
    formData.append('Selected', String(values.Selected));

    try {
      if(id){
        await updateProject(formData);
        navigate(`/admin/manage-projects`);
      }
    } catch (error: any) {
      console.error("Error updating news:", error);
      setFormError(error.message || 'An error occurred');
    }
  };

  if (!selectedProject) return <div>Loading...</div>;

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Edit Project</h2>
        <Formik
          initialValues={selectedProject}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
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
                  as="select"
                  id="Selected"
                  name="Selected"
                  className="input-field"
                >
                  <option value="false">NO</option>
                  <option value="true">YES</option>
                </Field>
                <ErrorMessage name="Selected" component="div" className="error-message" />
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

export default observer(EditProject);
