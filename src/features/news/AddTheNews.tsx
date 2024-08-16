import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { News } from '../../app/models/News';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddTheNews: React.FC = () => {
  const { newsStore } = useStore();
  const { createNews } = newsStore;
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const initialValues: News = { id: 0, title: '', description: '', image: '', link: '' }; // Initialize link property

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    link: Yup.string().url('Invalid URL format') // Validate link as URL
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (values: News) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('link', values.link); // Append link to FormData
    if (file) {
      formData.append('file', file);
    }

    await createNews(formData);
    navigate('/admin/manage-news');
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Add New News</h2>
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
                  placeholder="Enter news title"
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
                  placeholder="Enter news description"
                  className="textarea-field"
                />
                <ErrorMessage name="description" component="div" className="error-message" />
              </div>
              <div className="mb-4">
                <label htmlFor="link" className="label">Link</label>
                <Field
                  type="text"
                  id="link"
                  name="link"
                  placeholder="Enter news article link"
                  className="input-field"
                />
                <ErrorMessage name="link" component="div" className="error-message" />
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

export default observer(AddTheNews);
