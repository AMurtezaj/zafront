import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';  // Import the useTranslation hook
import '../../App1.css';
import TeamMemberList from '../teammember/TeamMemberList';

const AboutUs = () => {
  const [showTeam, setShowTeam] = useState(false);
  const { t } = useTranslation();  // Initialize the translation function

  const handleToggleTeam = () => {
    setShowTeam(!showTeam);
  };

  return (
    <section id="about-us" className="about-us-section py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <img src="/img/OFFICE 3.jpg" alt="Office" className="img-fluid office-image" />
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
        <Row className="mb-4">
          <Col className="text-center">
            <button 
              onClick={handleToggleTeam} 
              className="btn meet-our-team-btn"
            >
              {t('meet_our_team')}  {/* Replace static text with translation key */}
            </button>
          </Col>
        </Row>
        {showTeam && (
          <Row className="mt-4">
            <Col>
              <TeamMemberList />
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default AboutUs;
