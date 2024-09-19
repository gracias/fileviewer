import React from 'react';

const Alert = ({ title, children }) => (
  <div className="alert" role="alert">
    {title && <p className="alert-title">{title}</p>}
    <p>{children}</p>
  </div>
);

export default Alert;