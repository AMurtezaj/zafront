// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
// import { useTranslation } from 'react-i18next';  // Import the useTranslation hook
// import '../../App1.css';

// const ContactUs = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState('skenderaj'); // State to track selected location
//   const { t } = useTranslation();  // Initialize the translation function

//   const handleGetInTouch = (contactOption: string, location: string) => {
//     setSelectedLocation(location); // Set the selected location
//     if (contactOption === 'email') {
//       window.location.href = 'mailto:info@zabeliarchitects.com';
//     } else if (contactOption === 'phone') {
//       setShowModal(true); // Show the modal
//     }
//   };

//   const handleWhatsAppClick = () => {
//     const whatsappNumber = selectedLocation === 'germany' ? '+491777741989' : '+38349756199';
//     window.open(`https://wa.me/${whatsappNumber}`, '_blank'); // Open WhatsApp link
//   };

//   const handlePhoneCallClick = () => {
//     const phoneNumber = selectedLocation === 'germany' ? '+491777741989' : '+38349756199';
//     window.location.href = `tel:${phoneNumber}`; // Direct phone call
//   };

//   return (
//     <Container className="contact-us-section py-5">
//       <Row className="text-center mb-4">
//         <Col>
//           <h2 className="font-weight-bold">{t('contact_us')}</h2>  {/* Replace static text with translation key */}
//           <p className="text-muted1">
//             {t('contact_us_message')}  {/* Replace static text with translation key */}
//           </p>
//         </Col>
//       </Row>
//       <Row className="justify-content-center">
//         <Col md={6} className="mb-4">
//           <Card className="h-100 text-center shadow-sm">
//             <Card.Body>
//               <Card.Title>{t('location_skenderaj')}</Card.Title> 
//               <Card.Text>
//                 Zabeli Architects + Partners L.L.C<br />
//                 17 Shkurti, Rukolli 6<br />
//                 41000 Skenderaj<br />
//                 Tel:. +383 49 756 199
//               </Card.Text>
//               <FontAwesomeIcon
//                 icon={faEnvelope}
//                 size="2x"
//                 className="cursor-pointer icon-spacing"
//                 onClick={() => handleGetInTouch('email', 'skenderaj')}
//                 style={{ cursor: 'pointer', color: '#007bff' }}
//                 title={t('contact_via_email')} 
//               />
//               <FontAwesomeIcon
//                 icon={faPhone}
//                 size="2x"
//                 className="cursor-pointer"
//                 onClick={() => handleGetInTouch('phone', 'skenderaj')}
//                 style={{ cursor: 'pointer', color: '#6c757d' }}
//                 title={t('contact_via_phone')}  
//               />
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* New location: Standort Deutschland */}
//         <Col md={6} className="mb-4">
//           <Card className="h-100 text-center shadow-sm">
//             <Card.Body>
//               <Card.Title>{t('location_germany')}</Card.Title> 
//               <Card.Text>
//                 Zabeli Architects + Partners L.L.C<br />
//                 Ringstraße 17<br />
//                 83224 Grassau<br />
//                 Tel:. +49 177 7741989<br />
//               </Card.Text>
//               <FontAwesomeIcon
//                 icon={faEnvelope}
//                 size="2x"
//                 className="cursor-pointer icon-spacing"
//                 onClick={() => handleGetInTouch('email', 'germany')}
//                 style={{ cursor: 'pointer', color: '#007bff' }}
//                 title={t('contact_via_email')} 
//               />
//               <FontAwesomeIcon
//                 icon={faPhone}
//                 size="2x"
//                 className="cursor-pointer"
//                 onClick={() => handleGetInTouch('phone', 'germany')}
//                 style={{ cursor: 'pointer', color: '#6c757d' }}
//                 title={t('contact_via_phone')}  
//               />
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//       <Row className="text-center mt-4">
//         <Col>
//           <h4 className="font-weight-bold">{t('email_us')}</h4>  {/* Replace static text with translation key */}
//           <p>info@zabeliarchitects.com</p>
//         </Col>
//       </Row>

//       {/* Modal for Contact Options */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{t('contact_options')}</Modal.Title>  {/* Replace static text with translation key */}
//         </Modal.Header>
//         <Modal.Body>
//           <Button
//             variant="success"
//             className="w-100 mb-3"
//             onClick={handleWhatsAppClick}
//           >
//             {t('contact_via_whatsapp')}  {/* Replace static text with translation key */}
//           </Button>
//           <Button variant="primary" className="w-100" onClick={handlePhoneCallClick}>
//             {t('call_directly')}  {/* Replace static text with translation key */}
//           </Button>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default ContactUs;


import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';  // Import the useTranslation hook
import '../../App1.css';

const ContactUs = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('skenderaj'); // State to track selected location
  const { t } = useTranslation();  // Initialize the translation function

  const handleGetInTouch = (contactOption: string, location: string) => {
    setSelectedLocation(location); // Set the selected location
    if (contactOption === 'email') {
      window.location.href = 'mailto:info@zabeliarchitects.com';
    } else if (contactOption === 'phone') {
      setShowModal(true); // Show the modal
    }
  };

  const handleWhatsAppClick = () => {
    const whatsappNumber = selectedLocation === 'germany' ? '+491777741989' : '+38349756199';
    window.open(`https://wa.me/${whatsappNumber}`, '_blank'); // Open WhatsApp link
  };

  const handlePhoneCallClick = () => {
    const phoneNumber = selectedLocation === 'germany' ? '+491777741989' : '+38349756199';
    window.location.href = `tel:${phoneNumber}`; // Direct phone call
  };

  return (
    <Container className="contact-us-section py-5">
      <Row className="text-center mb-4">
        <Col>
          <h2 className="font-weight-bold">{t('contact_us')}</h2>  {/* Replace static text with translation key */}
          <p className="text-muted1">
            {t('contact_us_message')}  {/* Replace static text with translation key */}
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="mb-4">
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <Card.Title>{t('location_skenderaj')}</Card.Title> 
              <Card.Text>
                Zabeli Architects + Partners L.L.C<br />
                17 Shkurti, Rukolli 6<br />
                41000 Skenderaj<br />
                Tel:. +383 49 756 199
              </Card.Text>
              <div className="icon-container">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size="1x"
                  className="cursor-pointer"
                  onClick={() => handleGetInTouch('email', 'skenderaj')}
                  style={{ cursor: 'pointer', color: '#007bff' }}
                  title={t('contact_via_email')} 
                />
                <FontAwesomeIcon
                  icon={faPhone}
                  size="1x"
                  className="cursor-pointer"
                  onClick={() => handleGetInTouch('phone', 'skenderaj')}
                  style={{ cursor: 'pointer', color: '#6c757d', marginLeft: '10px' }} // Added space
                  title={t('contact_via_phone')}  
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* New location: Standort Deutschland */}
        <Col md={6} className="mb-4">
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <Card.Title>{t('location_germany')}</Card.Title> 
              <Card.Text>
                Zabeli Architects + Partners L.L.C<br />
                Ringstraße 17<br />
                83224 Grassau<br />
                Tel:. +49 177 7741989<br />
              </Card.Text>
              <div className="icon-container">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size="1x"
                  className="cursor-pointer"
                  onClick={() => handleGetInTouch('email', 'germany')}
                  style={{ cursor: 'pointer', color: '#007bff' }}
                  title={t('contact_via_email')} 
                />
                <FontAwesomeIcon
                  icon={faPhone}
                  size="1x"
                  className="cursor-pointer"
                  onClick={() => handleGetInTouch('phone', 'germany')}
                  style={{ cursor: 'pointer', color: '#6c757d', marginLeft: '10px' }} // Added space
                  title={t('contact_via_phone')}  
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="text-center mt-4">
        <Col>
          <h4 className="font-weight-bold">{t('email_us')}</h4>  {/* Replace static text with translation key */}
          <p>info@zabeliarchitects.com</p>
        </Col>
      </Row>

      {/* Modal for Contact Options */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('contact_options')}</Modal.Title>  {/* Replace static text with translation key */}
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="success"
            className="w-100 mb-3"
            onClick={handleWhatsAppClick}
          >
            {t('contact_via_whatsapp')}  {/* Replace static text with translation key */}
          </Button>
          <Button variant="primary" className="w-100" onClick={handlePhoneCallClick}>
            {t('call_directly')}  {/* Replace static text with translation key */}
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ContactUs;