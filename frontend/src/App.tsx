import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/Spinner/Spinner";
import "./App.css"

const HomePage = lazy(() => import("./components/HomePage/HomePage"));
const PatientDetailPage = lazy(
  () => import("./components/PatientDetailsPage/PatientDetailsPage"),
);

function App() {
  return (
    <div className="pms-application-container">
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/patients/:id" element={<PatientDetailPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
