import { useCallback } from "react";
import { getAppointmentsByPatientId } from "../services/appointmentService";
import { getDentists } from "../services/dentistService";
import { getAllPatients, getPatientById } from "../services/patientService";
import type { Appointment } from "../types/Appointment";
import type { Patient, PatientOverview } from "../types/Patient";
import { useFetchFactory } from "./useFetchFactory";

export const usePatient = (id: number) => {
  //Wrapping the fetcher functions in useCallback since they are a dependency for the useCallback inside the fetcher factory
  const fetcher = useCallback(() => getPatientById(id), [id]);
  return useFetchFactory<Patient>(fetcher);
};

export const useAllPatients = () => {
  const fetcher = useCallback(() => getAllPatients(), []);
  return useFetchFactory<PatientOverview[]>(fetcher);
};

export const useAppointments = (patientId: number) => {
  const fetcher = useCallback(() => getAppointmentsByPatientId(patientId), [patientId]);
  return useFetchFactory<Appointment[]>(fetcher);
};

export const useDentists = () => {
  const fetcher = useCallback(() => getDentists(), []);
  return useFetchFactory<string[]>(fetcher);
};