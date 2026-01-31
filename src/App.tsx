
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './experience/layouts/MainLayout';
import { Dashboard } from './experience/pages/Dashboard';
import { Companies } from './experience/pages/Companies';
import { CompanyDetail } from './experience/pages/CompanyDetail';

import { Analytics } from './experience/pages/Analytics';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="companies" element={<Companies />} />
        <Route path="companies/:id" element={<CompanyDetail />} />
        <Route path="analytics" element={<Analytics />} />

        {/* Disabled routes shouldn't be accessible normally, but nice to handle */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
