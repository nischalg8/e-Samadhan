// src/auth/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import { citizenLogin, agencyLogin } from '../api/auth.api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function loginCitizen(nid, dob) {
    const data = await citizenLogin(nid, dob);
    setUser(data);
  }

  async function loginAgency(id, password) {
    const data = await agencyLogin(id, password);
    setUser(data);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loginCitizen, loginAgency, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
