import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center items-center pt-[200px] overflow-hidden h-screen">
      {children}
    </div>
  );
};

export default AuthLayout;
