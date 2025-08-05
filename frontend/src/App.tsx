import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import ChatbotManagement from './pages/ChatbotManagement';
import ConversationManagement from './pages/ConversationManagement';
import PaymentsAndBilling from './pages/PaymentsAndBilling';
import QuotaAndAddon from './pages/QuotaAndAddon';
import AnalyticsAndReports from './pages/AnalyticsAndReports';
import SystemSettings from './pages/SystemSettings';
import SupportTools from './pages/SupportTools';
import ChannelIntegrations from './pages/ChannelIntegrations';
import AdminAccounts from './pages/AdminAccounts';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <Sidebar />
          </nav>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/users/admins" element={<AdminAccounts />} />
              <Route path="/users/*" element={<UserManagement />} />
              <Route path="/chatbots/channels" element={<ChannelIntegrations />} />
              <Route path="/chatbots/*" element={<ChatbotManagement />} />
              <Route path="/conversations/*" element={<ConversationManagement />} />
              <Route path="/billing/*" element={<PaymentsAndBilling />} />
              <Route path="/quota/*" element={<QuotaAndAddon />} />
              <Route path="/analytics/*" element={<AnalyticsAndReports />} />
              <Route path="/settings/*" element={<SystemSettings />} />
              <Route path="/support/*" element={<SupportTools />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;