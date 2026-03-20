import type { Treatment } from "../types/Treatment";

// Duration by treatment (in minutes)
const TREATMENT_DURATIONS: Record<Treatment, number> = {
  Cleaning: 30,
  Filling: 60,
  Extraction: 120,
  Whitening: 90,
  Consultation: 60,
  Cavity: 60
};

export default TREATMENT_DURATIONS;