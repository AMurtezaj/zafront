import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NewsUpdateDto } from '../../app/models/NewsUpdateDto';

const EditTheNews = () => {
  const { newsStore } = useStore();
  const { updateNews, loadNewsItem, selectedNews } = newsStore;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadNewsItem(id);
    }
  }, [id, loadNewsItem]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    link: Yup.string().required('Link is required'),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (values: NewsUpdateDto) => {
    const formData = new FormData();
    formData.append('id', id || '');
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('link', values.link);
    if (file) {
      formData.append('file', file); 
    }


    try {
      if (id) {
        await updateNews(formData);
        navigate('/admin/manage-news');
      }
    } catch (error: any) {
      console.error("Error updating news:", error);
      setFormError(error.message || 'An error occurred');
    }
  };

  if (!selectedNews) return <div>Loading...</div>;

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Edit News</h2>
        <Formik
          initialValues={{
            title: selectedNews?.title || '',
            description: selectedNews?.description || '',
            link: selectedNews?.link || ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
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
        {formError && <div className="error-message">{formError}</div>}
      </div>
    </div>
  );
};

export default observer(EditTheNews);
