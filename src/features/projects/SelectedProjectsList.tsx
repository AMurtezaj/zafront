import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../app/stores/store";

const SelectedProjectList = () => {
  const { projectStore } = useStore();
  const { selectedProjects, loadSelectedProjects, loading, error } = projectStore; 
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadSelectedProjects();
  }, [loadSelectedProjects]);

  useEffect(() => {
    console.log("Selected projects updated:", selectedProjects); // Debug log
    if (selectedProjects.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedProjects.length);
      }, 4500); 

      return () => clearInterval(interval);
    }
  }, [selectedProjects]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!selectedProjects.length) {
    return <div>No projects selected</div>;
  }

  return (
    <div className="project-carousel">
      {selectedProjects.length > 0 && (
        <div
          className="project-slide"
          style={{ backgroundImage: `url(${selectedProjects[currentIndex].image})` }}
          onClick={() => handleProjectClick(selectedProjects[currentIndex].id)}
        >
          <div className="project-title">
            <p>{selectedProjects[currentIndex].title}</p>
          </div>
        </div>
      )}
      <div className="carousel-dots">
        {selectedProjects.map((_, index) => (
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

export default(SelectedProjectList);



// import React, { useEffect, useState } from 'react';
// import { observer } from 'mobx-react-lite';
// import { useStore } from '../../app/stores/store';
// import { useNavigate } from 'react-router-dom';

// const SelectedProjectList = () => {
//   const { projectStore } = useStore();
//   const { selectedProjects = [], loadSelectedProjects, loading, error } = projectStore; 
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadSelectedProjects();
//   }, [loadSelectedProjects]);

//   useEffect(() => {
//     if (selectedProjects.length > 0) {
//       const interval = setInterval(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedProjects.length);
//       }, 2500);
//       return () => clearInterval(interval);
//     }
//   }, [selectedProjects]);

//   const handleDotClick = (index: number) => {
//     setCurrentIndex(index);
//   };

//   const handleProjectClick = (projectId: string) => {
//     navigate(`/project/${projectId}`);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   if (!selectedProjects.length) {
//     return <div>No projects selected</div>;
//   }

//   console.log("Current image URL:", selectedProjects[currentIndex]?.image);

//   return (
//     <div className="project-carousel">
//       <div
//         className="project-slide"
//         style={{ backgroundImage: `url(${selectedProjects[currentIndex]?.image})` }}
//         onClick={() => handleProjectClick(selectedProjects[currentIndex]?.id)}
//       >
//         <div className="project-title">
//           <p>{selectedProjects[currentIndex]?.title}</p>
//         </div>
//       </div>
//       <div className="carousel-dots">
//         {selectedProjects.map((_, index) => (
//           <span
//             key={index}
//             className={`dot ${currentIndex === index ? 'active' : ''}`}
//             onClick={() => handleDotClick(index)}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default observer(SelectedProjectList);
