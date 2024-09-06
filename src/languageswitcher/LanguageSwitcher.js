// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { Dropdown, DropdownButton } from 'react-bootstrap';
// import '../App1.css';  

// const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <DropdownButton
//       id="dropdown-basic-button"
//       title={i18n.language.toUpperCase()}
//       variant="outline-dark"
//       className="language-switcher-dropdown"
//     >
//       <Dropdown.Item onClick={() => changeLanguage('en')}>EN</Dropdown.Item>
//       <Dropdown.Item onClick={() => changeLanguage('de')}>DE</Dropdown.Item>
//     </DropdownButton>
//   );
// };

// export default LanguageSwitcher;


// LanguageSwitcher.js
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../App1.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // Ensure language is fetched from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng); // Update language in localStorage
  };

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={i18n.language.toUpperCase()}
      variant="outline-dark"
      className="language-switcher-dropdown"
    >
      <Dropdown.Item onClick={() => changeLanguage('en')}>EN</Dropdown.Item>
      <Dropdown.Item onClick={() => changeLanguage('de')}>DE</Dropdown.Item>
    </DropdownButton>
  );
};

export default LanguageSwitcher;
