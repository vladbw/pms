import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/Spinner/Spinner';

const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const PatientDetailPage = lazy(() => import('./components/PatientDetailsPage/PatientDetailsPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patients/:id" element={<PatientDetailPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;