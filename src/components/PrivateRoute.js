// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRole, currentRole }) => {
  if (!currentRole) {
    return <div>Checking role...</div>; // Loading or null state
  }

  if (currentRole !== allowedRole) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;
