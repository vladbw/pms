import API_BASE_URL from "../constants/api_base_url";
import type { Appointment, CreateAppointmentDto } from "../types/Appointment";

export const getAppointmentsByPatientId = async (patientId: number): Promise<Appointment[]> => {
  const response = await fetch(`${API_BASE_URL}/appointments/${patientId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch appointments');
  }
  return response.json();
};

export const createAppointment = async (dto: CreateAppointmentDto): Promise<Appointment> => {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  if (!response.ok) {
    throw new Error('Failed to create appointment!');
  }
  return response.json();
}