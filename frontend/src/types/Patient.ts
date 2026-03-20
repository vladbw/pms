import type { Appointment } from "./Appointment";

export interface Patient {
  id: number;
  fullName: string;
  address: string;
  photoBase64: string | null;
  appointments: Appointment[];
}

export interface PatientOverview {
  id: number;
  fullName: string;
}

export interface CreatePatientDto {
  fullName: string;
  address: string;
  photoBase64: string | null;
}