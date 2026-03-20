import "./PatientOverviewCard.css";
import { memo } from 'react';
import type { PatientOverview } from "../../types/Patient";


interface PatientCardProps {
  patient: PatientOverview;
  onClick: (id: number) => void;
}

const PatientOverviewCard = memo(({ patient, onClick }: PatientCardProps) => {
  console.log(`Rendered patient ${patient.fullName}`);
  return (
    <div
      className="patient-card"
      onClick={() => onClick(patient.id)}
      role="button"
      aria-label={`Details of patient ${patient.fullName}`}
      onKeyDown={(e) => e.key === "Enter" && onClick(patient.id)}
    >
      <span className="patient-card-id">Patient ID: {patient.id}</span>
      <span className="patient-card-name">{patient.fullName}</span>
    </div>
  );
});

export default PatientOverviewCard;
