import "./PatientDetailsPage.css";
import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePatient } from "../../hooks/pmsHooks";
import { createAppointment } from "../../services/appointmentService";
import type { CreateAppointmentDto } from "../../types/Appointment";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Modal from "../Modal/Modal";
import SpinnerComponent from "../Spinner/Spinner";
import AppointmentDetailsCard from "../AppointmentDetails/AppointmentDetailsCards";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: patient,
    isLoading,
    error,
    fetchCallback,
  } = usePatient(Number(id));

  const handleCreateAppointment = useCallback(
    async (dto: CreateAppointmentDto) => {
      await createAppointment(dto);
      await fetchCallback();
      setIsModalOpen(false);
    },
    [fetchCallback],
  );

  if (isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <div className="patient-detail-page">
      <button
        aria-label="Go back to the all patient list"
        className="btn-back"
        onClick={() => navigate("/")}
      >
        {"< Back"}
      </button>
      {!error && patient ? (
        <>
          <div className="patient-header">
            {patient.photoBase64 && (
              <img
                className="patient-photo"
                src={patient.photoBase64}
                alt={patient.fullName}
              />
            )}
            <div className="patient-info">
              <h1>{patient.fullName}</h1>
              <p className="patient-address">{patient.address}</p>
            </div>
          </div>
          <div className="appointments-section">
            <div className="appointments-header">
              <h2>Appointments</h2>
              <button onClick={() => setIsModalOpen(true)}>
                New Appointment
              </button>
            </div>
            {patient.appointments.length === 0 ? (
              <p className="empty-state">
                There are no appointments for this patient.
              </p>
            ) : (
              <div className="appointments-list">
                {patient.appointments.map((appointment) => (
                  <AppointmentDetailsCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            )}
          </div>
          {isModalOpen && (
            <Modal
              title={`New Appointment for patient ${patient.fullName}`}
              onClose={() => setIsModalOpen(false)}
            >
              <AppointmentForm
                patientId={Number(id)}
                onSubmit={handleCreateAppointment}
                onCancel={() => setIsModalOpen(false)}
              />
            </Modal>
          )}
        </>
      ) : (
        <ErrorMessage message={error || "Something went wrong"} />
      )}
    </div>
  );
};

export default PatientDetailsPage;
