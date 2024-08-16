import React from 'react';
import ProjectList from '../../features/projects/ProjectList';
import NewsList from '../../features/news/NewsList';
import ContactUs from './ContactUs';
import AboutCompany from '../../features/AboutCompanyUs/AboutCompany';
import ProjectList2 from '../../features/projects/ProjectList2';

const MainPage = () => {
  return (
    <div>
      <section id="projects">
        <ProjectList />
      </section>
      <section id="aboutus">
        <AboutCompany />
      </section>
      <section id="projects2">
        <ProjectList2 />
      </section>
      <section id="news">
        <NewsList />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
    </div>
  );
};

export default MainPage;
