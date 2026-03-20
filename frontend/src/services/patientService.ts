import API_BASE_URL from "../constants/api_base_url";
import type {
  CreatePatientDto,
  Patient,
  PatientOverview,
} from "../types/Patient";

export const getPatientById = async (id: number): Promise<Patient> => {
  const response = await fetch(`${API_BASE_URL}/patients/${id}`);

  if (response.status === 404) {
    throw new Error('Patient not found.');
  }
  
  if (!response.ok) {
    throw new Error("Error while fetching patient");
  }
  return response.json();
};

export const getAllPatients = async (): Promise<PatientOverview[]> => {
  const response = await fetch(`${API_BASE_URL}/patients`);
  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }
  return response.json();
};

export const createPatient = async (
  dto: CreatePatientDto,
): Promise<Patient> => {
  const response = await fetch(`${API_BASE_URL}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!response.ok) {
    throw new Error("Error while creating the new patient");
  }
  return response.json();
};
