import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';  // Import the useTranslation hook
import { Carousel } from 'react-bootstrap';

const ProjectDetailsList = () => {
  const { t } = useTranslation();  // Initialize the translation function
  const { id } = useParams<{ id: string }>();
  const { projectDetailsStore } = useStore();
  const { selectedProjectDetails, loadProjectDetailsById, loadingInitial, error } = projectDetailsStore;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (id) {
      loadProjectDetailsById(id);
    }
  }, [id, loadProjectDetailsById]);

  useEffect(() => {
    const interval = setInterval(() => {
      const images = selectedProjectDetails?.images || [];
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 25000);
    return () => clearInterval(interval);
  }, [selectedProjectDetails]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (loadingInitial) return <div>{t('loading')}</div>;  // Replace static text with translation key
  if (error) return <div>{t('error_message', { error })}</div>;  // Replace static text with translation key
  if (!selectedProjectDetails) return <div>{t('no_project_details')}</div>;  // Replace static text with translation key

  const { video, location, year, status, images } = selectedProjectDetails;

  return (
    <div className="project-details-list-container">
      {video && (
        <div className="project-details-video-container">
          <video src={video} controls className="project-details-video" />
        </div>
      )}
      <div className="project-details-info">
        <div className="project-details-title">
          <h6>{t('location')}: {location}</h6>  {/* Replace static text with translation key */}
          <h6>{t('year')}: {year}</h6>  {/* Replace static text with translation key */}
          <h6>{t('status')}: {status}</h6>  {/* Replace static text with translation key */}
        </div>
      </div>
      {images.length > 0 && (
        <div className="project-details-images-container">
          <Carousel interval={2500} indicators={false} controls={false}>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100 project-detail-image" src={image} alt={`Slide ${index}`} />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default observer(ProjectDetailsList);


// import React, { useEffect, useState } from 'react';
// import { observer } from 'mobx-react-lite';
// import { useStore } from '../../app/stores/store';
// import { useParams } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';  // Import the useTranslation hook

// const ProjectDetailsList = () => {
//   const { t } = useTranslation();  // Initialize the translation function
//   const { id } = useParams<{ id: string }>();
//   const { projectDetailsStore } = useStore();
//   const { selectedProjectDetails, loadProjectDetailsById, loadingInitial, error } = projectDetailsStore;
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     if (id) {
//       loadProjectDetailsById(id);
//     }
//   }, [id, loadProjectDetailsById]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const images = selectedProjectDetails?.images || [];
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 25000);
//     return () => clearInterval(interval);
//   }, [selectedProjectDetails]);

//   const handleDotClick = (index: number) => {
//     setCurrentIndex(index);
//   };

//   if (loadingInitial) return <div>{t('loading')}</div>;  // Replace static text with translation key
//   if (error) return <div>{t('error_message', { error })}</div>;  // Replace static text with translation key
//   if (!selectedProjectDetails) return <div>{t('no_project_details')}</div>;  // Replace static text with translation key

//   const { video, location, year, status, images } = selectedProjectDetails;

//   return (
//     <div className="project-details-list-container">
//       {video && video.length > 0 && (
//         <div className="project-details-video-container">
//           {video.map((videoUrl, index) => (
//             <div key={index} className="project-details-video-item">
//               <video src={videoUrl} controls className="project-details-video" />
//             </div>
//           ))}
//         </div>
//       )}
//       <div className="project-details-info">
//         <div className="project-details-title">
//           <h4>{t('location')}: {location}</h4>  {/* Replace static text with translation key */}
//           <h5>{t('year')}: {year}</h5>  {/* Replace static text with translation key */}
//           <h6>{t('status')}: {status}</h6>  {/* Replace static text with translation key */}
//         </div>
//       </div>
//       {images.length > 0 && (
//         <div className="project-details-images-container">
//           {images.map((image, index) => (
//             <img key={index} src={image} className="project-details-image" alt={t('project_image_alt', { index })} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default observer(ProjectDetailsList);
