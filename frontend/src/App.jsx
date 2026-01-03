import { AuthProvider, useAuth } from './auth/AuthContext';
import { I18nProvider } from './i18n/I18nContext';
import LoginPage from './auth/LoginPage';
import MainLayout from './layout/MainLayout';

function Router() {
  const { user } = useAuth();
  return user ? <MainLayout /> : <LoginPage />;
}

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </I18nProvider>
  );
}
