import { AuthProvider, useAuth } from './auth/AuthContext';
import { I18nProvider } from './i18n/I18nContext';
import LoginPage from './auth/LoginPage';
import MainLayout from './layout/MainLayout';
import ChatBubble from './chat/ChatBubble';

// This component decides which view to show based on login
function Router() {
  const { user } = useAuth(); // ✅ user is defined here
  return user ? <MainLayout /> : <LoginPage />;
}

function AppContent() {
  const { user } = useAuth();

  return (
    <>
      <Router />
      {user && <ChatBubble />}
    </>
  );
}
export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        {/* <Router />  */}
         <AppContent /> {/* ✅ use Router here */}
      </AuthProvider>
    </I18nProvider>
  );
}
