import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'; // Ensure this CSS file contains the right styles

const AdminDashboard = () => {
  return (
    <div className="container">
      <h2 className="content">Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Manage Projects</h5>
              <p className="card-text">Add, edit, or delete projects.</p>
              <Link to="/admin/manage-projects" className="btn btn-primary">Go</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Manage Project Details</h5>
              <p className="card-text">Add, edit, or delete project details.</p>
              <Link to="/admin/manage-project-details" className="btn btn-primary">Go</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Manage News</h5>
              <p className="card-text">Add, edit, or delete news articles.</p>
              <Link to="/admin/manage-news" className="btn btn-primary">Go</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Manage Team Members</h5>
              <p className="card-text">Add, edit, or delete team members.</p>
              <Link to="/admin/manage-team-members" className="btn btn-primary">Go</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
