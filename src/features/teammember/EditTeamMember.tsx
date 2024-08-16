import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TeamMemberDto } from '../../app/models/TeamMemberDto';

const EditTeamMember = () => {
  const { teamMemberStore } = useStore();
  const { updateTeamMember, loadTeamMember, selectedTeamMember } = teamMemberStore;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadTeamMember(parseInt(id));
    }
  }, [id, loadTeamMember]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (values: TeamMemberDto) => {
    const formData = new FormData();
    formData.append('id', id || '');
    formData.append('name', values.name);
    formData.append('title', values.title);
    formData.append('position', values.position);
    if (file) {
      formData.append('file', file);
    } else {
      formData.append('file', new Blob());
    }

    try {
      if (id) {
        await updateTeamMember(formData);
        navigate('/admin/manage-team-members');
      }
    } catch (error: any) {
      console.error("Error updating team member:", error);
      setFormError(error.message || 'An error occurred');
    }
  };

  if (!selectedTeamMember) return <div>Loading...</div>;

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Edit Team Member</h2>
        <Formik
          initialValues={{
            name: selectedTeamMember.name || '',
            title: selectedTeamMember.title || '',
            position: selectedTeamMember.position || '',
            image: selectedTeamMember.image || ''
          }}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
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

export default observer(EditTeamMember);
