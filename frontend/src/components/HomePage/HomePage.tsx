import "./HomePage.css";
import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createPatient } from "../../services/patientService";
import type { CreatePatientDto } from "../../types/Patient";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Modal from "../Modal/Modal";
import PatientForm from "../PatientForm/PatientForm";
import { useAllPatients } from "../../hooks/pmsHooks";
import SpinnerComponent from "../Spinner/Spinner";
import PatientOverviewCard from "../PatientOverview/PatientOverviewCard";

const HomePageComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data: patients, isLoading, error, fetchCallback } = useAllPatients();

  const filteredPatients = useMemo(
    () =>
      patients?.filter((p) =>
        p.fullName.toLowerCase().includes(search.toLowerCase()),
      ) ?? [],
    [patients, search],
  );

  const handleCreatePatient = useCallback(
    async (dto: CreatePatientDto) => {
      await createPatient(dto);
      await fetchCallback();
      setIsModalOpen(false);
    },
    [fetchCallback],
  );

  const handlePatientClick = useCallback(
    (id: number) => {
      navigate(`/patients/${id}`);
    },
    [navigate],
  );

  //TODO: In a production app, we should likely debounce the search, so that the filtering doesnt trigger immediately after every press
  return (
    <div className="patient-list-page">
      <div className="page-header">
        <h1>Patients</h1>
        <button onClick={() => setIsModalOpen(true)}>+ New Patient</button>
      </div>
      <input
        className="search-input"
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {isLoading && <SpinnerComponent />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <div className="patient-list">
          {filteredPatients.length === 0 ? (
            <p className="empty-state">No patients found.</p>
          ) : (
            filteredPatients.map((patient) => (
              <PatientOverviewCard
                key={patient.id}
                patient={patient}
                onClick={handlePatientClick}
              />
            ))
          )}
        </div>
      )}
      {isModalOpen && (
        <Modal title="New Patient" onClose={() => setIsModalOpen(false)}>
          <PatientForm
            onSubmit={handleCreatePatient}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default HomePageComponent;
