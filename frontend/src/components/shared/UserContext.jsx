import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userName, setUserName, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
