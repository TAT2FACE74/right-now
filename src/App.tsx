import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Moment } from './pages/Moment';
import { Bible } from './pages/Bible';
import { Pray } from './pages/Pray';
import { Plans } from './pages/Plans';
import { Profile } from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/moment" element={<Moment />} />
          <Route path="/bible" element={<Bible />} />
          <Route path="/pray" element={<Pray />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
