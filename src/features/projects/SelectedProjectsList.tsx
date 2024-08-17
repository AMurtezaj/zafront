// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useStore } from "../../app/stores/store";

// const SelectedProjectList = () => {
//   const { projectStore } = useStore();
//   const [displayProject,setdisplayProjec]=useState<any>();
//   const { selectedProjects, loadSelectedProjects, loading, error } = projectStore; 
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   loadSelectedProjects();
//   // }, [loadSelectedProjects]);
//   // console.log("justDebug",displayProject);
//   const getResponse = async()=>{
//     await loadSelectedProjects().then((response)=>{
//       setdisplayProjec(response);
//     })
//   }
//   useEffect(() => {
//     getResponse();
//     // console.log("Selected projects updated:", selectedProjects); // Debug log
//     // if (selectedProjects.length > 0) {
//     //   const interval = setInterval(() => {
//     //     setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedProjects.length);
//     //   }, 4500); 

//     //   return () => clearInterval(interval);
//     // }
//   }, []);
//   const handleDotClick = (index: number) => {
//     setCurrentIndex(index);
//   };

//   const handleProjectClick = (projectId: string) => {
//     navigate(`/project/${projectId}`);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   if (displayProject && !displayProject.$values.length) {
//     return <div>No projects selected</div>;
//   }

//   return (
//     <div className="project-carousel">
//       {displayProject && displayProject.$values.length > 0 && (
//         <div
//           className="project-slide"
//           style={{ backgroundImage: `url(${displayProject.$values[currentIndex].image})` }}
//           onClick={() => handleProjectClick(displayProject.$values[currentIndex].id)}
//         >
//           <div className="project-title">
//             <p>{displayProject.$values[currentIndex].title}</p>
//           </div>
//         </div>
//       )}
//       <div className="carousel-dots">
//         {displayProject && displayProject.$values.map((_:any, index:any) => (
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

// export default(SelectedProjectList);

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../app/stores/store";

const SelectedProjectList = () => {
  const { projectStore } = useStore();
  const [displayProject, setDisplayProject] = useState<any>();
  const { loadSelectedProjects } = projectStore;
  const [currentIndex, setCurrentIndex] = useState(0);
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
      setCurrentIndex((prevIndex) =>
        prevIndex === displayProject?.$values.length - 1 ? 0 : prevIndex + 1
      );
    }, 4500); // Change project every 4.5 seconds

    return () => clearInterval(interval);
  }, [displayProject]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
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
        className="project-slide"
        style={{ backgroundImage: `url(${displayProject.$values[currentIndex].image})` }}
        onClick={() => handleProjectClick(displayProject.$values[currentIndex].id)}
      ></div>
      <div className="project-info">
        <h5 className="title">{displayProject.$values[currentIndex].title}</h5>
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