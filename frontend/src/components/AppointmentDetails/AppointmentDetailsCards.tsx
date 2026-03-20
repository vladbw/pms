import "./AppointmentDetailsCard.css";
import type { Appointment } from "../../types/Appointment";
import { memo } from "react";

interface AppointmentDetailsCardProps {
  appointment: Appointment;
}

const AppointmentDetailsCard = memo(({
  appointment,
}: AppointmentDetailsCardProps) => {
  const date = new Date(appointment.dateTime);

  return (
    <div className="appointment-card">
      <div className="appointment-left">
        <span className="appointment-treatment">{appointment.treatment}</span>
        <span className="appointment-dentist">{appointment.dentistName}</span>
      </div>
      <div className="appointment-right">
        <div className="appointment-datetime">
          <span>
            {date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span>
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <span
          className="appointment-duration-badge"
          aria-label={`Appointment duration: ${appointment.durationMinutes} mins`}
        >
          {appointment.durationMinutes} min
        </span>
      </div>
    </div>
  );
});

export default AppointmentDetailsCard;
