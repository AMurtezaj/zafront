import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../App1.css';  

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
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
