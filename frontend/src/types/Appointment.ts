import type { Treatment } from "./Treatment";

export interface Appointment {
  id: number;
  dateTime: string;
  dentistName: string;
  treatment: Treatment | null;
  durationMinutes: number;
}

export interface CreateAppointmentDto {
  patientId: number;
  dateTime: string;
  dentistName: string;
  treatment: Treatment | null;
}