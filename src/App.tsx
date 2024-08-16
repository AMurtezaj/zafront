import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './features/projects/ProjectList';
import NewsList from './features/news/NewsList';
import ManageNews from './features/admins/ManageNews';
import ManageTeamMembers from './features/admins/ManageTeamMembers';
import ProtectedRoute from './app/layout/ProtectedRoute';
import AdminDashboard from './features/admins/AdminDashboard';
import AdminLogIn from './features/admins/AdminLogin';
import ManageProjects from './features/admins/ManageProjects';
import Navbar from './app/layout/Navbar';
import Footer from './app/layout/Footer';
import { store, StoreContext, useStore } from './app/stores/store';
import MainPage from './app/layout/MainPage';
import ContactUs from './app/layout/ContactUs';
import AboutCompany from './features/AboutCompanyUs/AboutCompany';
import AboutUs from './features/AboutCompanyUs/AboutUs';
import AddTheNews from './features/news/AddTheNews';
import EditTheNews from './features/news/EditTheNews';
import TeamMemberList from './features/teammember/TeamMemberList';
import AddTheTeamMember from './features/teammember/AddTheTeamMember';
import AddTheProject from './features/projects/AddTheProject';
import EditProject from './features/projects/EditProject';
import EditTeamMember from './features/teammember/EditTeamMember';
import ProjectDetailsForm from './features/projectdetails/ProjectDetailsForm';
import ManageProjectDetails from './features/admins/ManageProjectDetails';
import EditProjectDetails from './features/projectdetails/EditProjectDetails';
import ProjectDetailsList from './features/projectdetails/ProjectDetailsList';
import SelectProjects from './features/projects/SelectProjects';
import ProjectList2 from './features/projects/ProjectList2';
import SelectedProjectsList from './features/projects/SelectedProjectsList';


function App() {
  return (
    <StoreContext.Provider value={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/projects" element={<ProjectList/>} />
          <Route path="/projects2" element={<ProjectList2/>} />
          <Route path="/selectedprojectslist" element={<SelectedProjectsList/>} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/selectproject" element={<SelectProjects />} />
          <Route path="/project/:id" element={<ProjectDetailsList />} />
          <Route path="/teammember" element={<TeamMemberList />} />
          <Route path="/aboutcompany" element={<AboutCompany />} /> 
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/projectdetails" element={<ProjectDetailsForm />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin/login" element={<AdminLogIn />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute component={AdminDashboard} />
            }
          />
          <Route
            path="/admin/manage-projects"
            element={
              <ProtectedRoute component={ManageProjects} />
            }
          />
          
          <Route
            path="/admin/manage-project-details"
            element={
              <ProtectedRoute component={ManageProjectDetails} />
            }
          />
          
          <Route
            path="/admin/manage-news"
            element={
              <ProtectedRoute component={ManageNews} />
            }
          />
          <Route
            path="/admin/manage-team-members"
            element={
              <ProtectedRoute component={ManageTeamMembers} />
            }
          />
          <Route
            path="/admin/add-project"
            element={
              <ProtectedRoute component={AddTheProject} />
            }
          />
        
        <Route
          path="/admin/edit-project/:id"
          element={
            <ProtectedRoute component={EditProject} />
          }
        />        
        <Route
          path="/admin/add-news"
          element={
            <ProtectedRoute component={AddTheNews} />
          }
        />
        <Route
          path="/admin/edit-news/:id"
          element={
            <ProtectedRoute component={EditTheNews} />
          } 
        /> 
        <Route
          path="/admin/edit-team-member/:id"
          element={
            <ProtectedRoute component={EditTeamMember} />
          } 
        /> 
        <Route
          path="/admin/add-team-member"
          element={
            <ProtectedRoute component={AddTheTeamMember} />
          }
        />
        <Route
          path="/admin/edit-projectdetail/:id"
          element={
            <ProtectedRoute component={EditProjectDetails} />
          }
        />
        <Route
          path="/admin/add-projectdetails"
          element={
            <ProtectedRoute component={ProjectDetailsForm} />
          }
        />
        
        </Routes>
        <Footer />
      </Router>
    </StoreContext.Provider>
  );
}

export default App;
