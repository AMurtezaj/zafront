import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useNavigate } from 'react-router-dom';
import '../../App1.css';
import { useTranslation } from 'react-i18next';

const ProjectList2 = () => {
    const { t } = useTranslation(); 
  const { projectStore } = useStore();
  const { projects, loadProjects, loading, error } = projectStore;
  const navigate = useNavigate();
  

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
        <h2>{t('projects')}</h2>
        <div className="projects-grid">
      {projects.map((project) => (
        <div
          key={project.id}
          className="project-tile"
          onClick={() => handleProjectClick(project.id)}
        >
          <div
            className="project-image"
            style={{ backgroundImage: `url(${project.image})` }}
          ></div>
          <div className="project-title-overlay">
            <p>{project.title}</p>
          </div>
        </div>
      ))}
    </div>


    </div>
    
  );
};

export default observer(ProjectList2);
