import type { CreatePatientDto } from "../../types/Patient";
import type { CreateAppointmentDto } from "../../types/Appointment";
import type { ValidationSchema } from "./validationService";

// The image is validated separately so we can assess its size and type
export const patientSchema: ValidationSchema<Omit<CreatePatientDto, 'photoBase64'>> = {
  fullName: (value) =>
    !String(value).trim() ? "Full name is required." : null,
  address: (value) => (!String(value).trim() ? "Address is required." : null),
};

export const appointmentSchema: ValidationSchema<CreateAppointmentDto> = {
  patientId: () => null,
  dateTime: (value) => {
    if (!value) return "Date and time are required!";
    if (new Date(value as string) < new Date()) return "The appointment must be in the future (starting with today).";
    return null;
  },
  dentistName: (value) => (!value ? "Please select a dentist." : null),
  treatment: (value) => (!value ? "Please select a treatment." : null),
};
