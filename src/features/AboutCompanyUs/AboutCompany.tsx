import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';  // Import the useTranslation hook
import '../../App.css';

const AboutCompany = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();  // Initialize the translation function

  const handleNavigateToAboutUs = () => {
    navigate('/aboutus');
  };

  return (
    <section id="about-company" className="about-company-section py-5">
      <Container className="text-center">
        <Row className="mb-4">
          <Col>
            <h6 className="text-muted">
              {t('zabeliArchitects_description')}  
            </h6>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <p className="about-company-text">
              {t('about_company_text')}  
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <p className="about-company-text">
              {t('mission_statement')}  
            </p>
          </Col>
        </Row>
        <Row className="text-center mt-4">
          <Col>
            <button 
              className="btn meet-our-team-btn" 
              onClick={handleNavigateToAboutUs}
            >
              {t('about_us_button_text')} 
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutCompany;
