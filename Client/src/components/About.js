import React from 'react';

const About = () => {
  const handleClick = () => {
    localStorage.removeItem("token");
  }

  return (
    <div className="about-container">
      <h2>About iNotebook</h2>
      <p>
        Welcome to iNotebook - Your Secret Noteskeeping Companion! iNotebook is a secure
        and feature-rich application designed to help you organize and manage your notes
        with the utmost privacy.
      </p>
      
    </div>
  );
}

export default About;
