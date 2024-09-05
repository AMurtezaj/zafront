// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useStore } from "../../app/stores/store";

// const SelectedProjectList = () => {
//   const { projectStore } = useStore();
//   const [displayProject, setDisplayProject] = useState<any>();
//   const { loadSelectedProjects } = projectStore;
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigate = useNavigate();

//   const getResponse = async () => {
//     await loadSelectedProjects().then((response) => {
//       setDisplayProject(response);
//     });
//   };

//   useEffect(() => {
//     getResponse();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === displayProject?.$values.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 4500); 

//     return () => clearInterval(interval);
//   }, [displayProject]);

//   const handleDotClick = (index: number) => {
//     setCurrentIndex(index);
//   };

//   const handleProjectClick = (projectId: string) => {
//     navigate(`/project/${projectId}`);
//   };

//   if (!displayProject || !displayProject.$values.length) {
//     return <div>No projects selected</div>;
//   }

//   return (
//     <div className="project-carousel">
//       <div
//         className="project-slide"
//         style={{ backgroundImage: `url(${displayProject.$values[currentIndex].image})` }}
//         onClick={() => handleProjectClick(displayProject.$values[currentIndex].id)}
//       ></div>
//       <div className="project-info">
//         <h6 className="title">{displayProject.$values[currentIndex].title}</h6>
//         <div className="carousel-dots">
//           {displayProject.$values.map((_: any, index: number) => (
//             <span
//               key={index}
//               className={`dot ${currentIndex === index ? 'active' : ''}`}
//               onClick={() => handleDotClick(index)}
//             ></span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SelectedProjectList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../app/stores/store";

const SelectedProjectList = () => {
  const { projectStore } = useStore();
  const [displayProject, setDisplayProject] = useState<any>();
  const { loadSelectedProjects } = projectStore;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0); // New state to force re-render
  const navigate = useNavigate();

  const getResponse = async () => {
    await loadSelectedProjects().then((response) => {
      setDisplayProject(response);
    });
  };

  useEffect(() => {
    getResponse();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === displayProject?.$values.length - 1 ? 0 : prevIndex + 1;
        setKey(prev => prev + 1); // Increment key to force re-render
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [displayProject]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setKey(prev => prev + 1); // Force re-render on dot click
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  if (!displayProject || !displayProject.$values.length) {
    return <div>No projects selected</div>;
  }

  return (
    <div className="project-carousel">
      <div
        key={key} // Add key to force re-render and restart animation
        className="project-slide"
        style={{ backgroundImage: `url(${displayProject.$values[currentIndex].image})` }}
        onClick={() => handleProjectClick(displayProject.$values[currentIndex].id)}
      ></div>
      <div className="project-info">
        <h6 className="title">{displayProject.$values[currentIndex].title}</h6>
        <div className="carousel-dots">
          {displayProject.$values.map((_: any, index: number) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectedProjectList;