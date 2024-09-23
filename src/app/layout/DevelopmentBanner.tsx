import React from 'react';

const DevelopmentBanner: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.text}>We are on development</h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  text: {
    color: '#333',
    fontSize: '24px',
    fontFamily: 'Arial, sans-serif',
  },
};

export default DevelopmentBanner;
