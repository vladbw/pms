import "./PatientOverviewCard.css";
import { memo } from "react";
import type { PatientOverview } from "../../types/Patient";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

interface PatientCardProps {
  patient: PatientOverview;
  onClick: (id: number) => void;
}

const PatientOverviewCard = memo(({ patient, onClick }: PatientCardProps) => {
  //TODO: In a production app, we would implement pagination on the server so as not to fetch data that might not be seen at all.
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });
  return (
    <div
      ref={ref}
      className={`patient-card ${isVisible ? "visible" : ""}`}
      onClick={() => onClick(patient.id)}
      role="button"
      aria-label={`Details of patient ${patient.fullName}`}
      onKeyDown={(e) => e.key === "Enter" && onClick(patient.id)}
    >
      {isVisible && (
        <>
          <span className="patient-card-id">Patient ID: {patient.id}</span>
          <span className="patient-card-name">{patient.fullName}</span>
        </>
      )}
    </div>
  );
});

export default PatientOverviewCard;
