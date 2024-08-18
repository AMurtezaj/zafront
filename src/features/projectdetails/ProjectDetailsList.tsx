import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-bootstrap';

const ProjectDetailsList = () => {
  const { t } = useTranslation();
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

  if (loadingInitial) return <div>{t('loading')}</div>;
  if (error) return <div>{t('error_message', { error })}</div>;
  if (!selectedProjectDetails) return <div>{t('no_project_details')}</div>;

  const { video, location, year, status, images } = selectedProjectDetails;

  return (
    <div className="project-details-list-container">
      {video && (
        <div className="project-details-video-container">
          <video src={video} controls className="project-details-video" />
        </div>
      )}
      {images.length > 0 && (
        <div className="project-details-images-container">
          <Carousel interval={2500} indicators={false} controls={false} fade>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100 project-detail-image" src={image} alt={`Slide ${index}`} />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="project-details-info">
            <div className="project-details-title">
              <h6>{t('location')}: {location}</h6>
              <h6>{t('year')}: {year}</h6>
              <h6>{t('status')}: {status}</h6>
            </div>
          </div>
        </div>
        
      )}
      
    </div>
  );
};

export default observer(ProjectDetailsList);

