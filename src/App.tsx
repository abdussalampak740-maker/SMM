/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateContent from './pages/CreateContent';
import Calendar from './pages/Calendar';
import MediaLibrary from './pages/MediaLibrary';
import Automation from './pages/Automation';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import MockAuth from './pages/MockAuth';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/mock-auth" element={<MockAuth />} />
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<CreateContent />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/media" element={<MediaLibrary />} />
              <Route path="/automation" element={<Automation />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}
