import "./PatientOverviewCard.css";
import { memo } from "react";
import type { PatientOverview } from "../../types/Patient";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

interface PatientCardProps {
  patient: PatientOverview;
  onClick: (id: number) => void;
}

const PatientOverviewCard = memo(({ patient, onClick }: PatientCardProps) => {
  //TODO: In a production app, if we had a real concern about the items that could be rendered, we would likely do implement some
  // virtualization (react-window) to make sure that the components that are far from the viewport are not mounted at all until needed
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
