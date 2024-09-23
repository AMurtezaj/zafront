import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { TeamMember } from '../../app/models/TeamMember';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddTheTeamMember: React.FC = () => {
  const { teamMemberStore } = useStore();
  const { createTeamMember } = teamMemberStore;
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const initialValues: TeamMember = { id: '', name: '', title: '', position: '', image: '' };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (values: TeamMember) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('title', values.title);
    formData.append('position', values.position);
    if (file) {
      formData.append('file', file);
    }

    await createTeamMember(formData);
    navigate('/admin/manage-team-members');
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Add New Team Member</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6">
              <div className="mb-4">
                <label htmlFor="name" className="label">Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter team member name"
                  className="input-field"
                />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="label">Title</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter team member title"
                  className="input-field"
                />
                <ErrorMessage name="title" component="div" className="error-message" />
              </div>
              <div className="mb-4">
                <label htmlFor="position" className="label">Position</label>
                <Field
                  type="text"
                  id="position"
                  name="position"
                  placeholder="Enter team member position"
                  className="input-field"
                />
                <ErrorMessage name="position" component="div" className="error-message" />
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

export default observer(AddTheTeamMember);
