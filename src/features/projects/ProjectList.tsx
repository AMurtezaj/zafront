import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const { projectStore } = useStore();
  const { projects, loadProjects, loading, error } = projectStore;
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 4500); 

    return () => clearInterval(interval);
  }, [projects.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="project-carousel">
      {projects.length > 0 && (
        <div
          className="project-slide"
          style={{ backgroundImage: `url(${projects[currentIndex].image})` }}
          onClick={() => handleProjectClick(projects[currentIndex].id)}
        >
          <div className="project-title">
            <p>{projects[currentIndex].title}</p>
          </div>
        </div>
      )}
      <div className="carousel-dots">
        {projects.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default observer(ProjectList);