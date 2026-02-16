import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Import de tes pages
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import ProviderList from './pages/ProviderList';
import ProviderProfile from './pages/ProviderProfile';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import CustomerService from './pages/CustomerService';

// Composant pour protéger les pages privées
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex h-screen items-center justify-center">Chargement...</div>;
  return user ? children : <Navigate to="/auth" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* Routes Publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<SearchPage />} />
              <Route path="/providers" element={<ProviderList />} />
              <Route path="/provider/:id" element={<ProviderProfile />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/support" element={<CustomerService />} />

              {/* Routes Protégées */}
              <Route path="/dashboard" element={
                <PrivateRoute><Dashboard /></PrivateRoute>
              } />
              <Route path="/invoices" element={
                <PrivateRoute><Invoices /></PrivateRoute>
              } />

              {/* Redirection si page inconnue */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <Toaster position="top-center" />
        </div>
      </Router>
    </AuthProvider>
  );
}
