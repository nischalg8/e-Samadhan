import { AuthProvider, useAuth } from './auth/AuthContext';
import { I18nProvider } from './i18n/I18nContext';
import LoginPage from './auth/LoginPage';
import MainLayout from './layout/MainLayout';

// This component decides which view to show based on login
function Router() {
  const { user } = useAuth(); // ✅ user is defined here
  return user ? <MainLayout /> : <LoginPage />;
}

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <Router />  {/* ✅ use Router here */}
      </AuthProvider>
    </I18nProvider>
  );
}
