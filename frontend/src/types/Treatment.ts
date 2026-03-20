export const Treatment = {
  Consulation: "Consultation",
  Cleaning: "Cleaning",
  Filling: "Filling",
  Extraction: "Extraction",
  Whitening: "Whitening",
  Cavity: "Cavity",
} as const;

export type Treatment = (typeof Treatment)[keyof typeof Treatment];
