import { createContext, useContext, useState } from 'react';
import { loginAgency as loginAgencyApi, loginCitizen as loginCitizenApi } from '../api/agencies.api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) return { token, role };
    return null;
  });

  async function loginCitizen(nid, dob) {
    const data = await loginCitizenApi(nid, dob);
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    setUser({ token: data.token, role: data.role });
  }

  async function loginAgency(agencyName, staffId, username, password) {
    const data = await loginAgencyApi(agencyName, staffId, username, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    setUser({ token: data.token, role: data.role });
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loginCitizen, loginAgency, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
