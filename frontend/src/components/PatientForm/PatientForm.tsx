import "./PatientForm.css";
import { useState, useCallback } from "react";
import type { CreatePatientDto } from "../../types/Patient";
import {
  ValidationService,
  type ValidationErrors,
} from "../../services/validation/validationService";
import { patientSchema } from "../../services/validation/validationSchemas";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface PatientFormComponentProps {
  onSubmit: (dto: CreatePatientDto) => Promise<void>;
  onCancel: () => void;
}

const PatientFormComponent = ({
  onSubmit,
  onCancel,
}: PatientFormComponentProps) => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  // I used two error states, one for the validation errors coming from the external validator, and one for
  // general errors with the submission of the form
  const [errors, setErrors] = useState<ValidationErrors<CreatePatientDto>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPhotoFile(e.target.files?.[0] ?? null);
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    const dto = { fullName, address };
    const validationErrors = ValidationService.validate(dto, patientSchema);
    const fileError = ValidationService.validateFile(photoFile);

    if (ValidationService.hasErrors(validationErrors) || fileError) {
      setErrors(validationErrors);
      if (fileError) {
        setSubmitError(fileError);
      }
      return;
    }

    let photoBase64: string | null = null;
    if (photoFile) {
      photoBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(photoFile);
      });
    }

    try {
      setIsSubmitting(true);
      setErrors({});
      setSubmitError(null);
      await onSubmit({ fullName, address, photoBase64 });
    } catch {
      setSubmitError("Failed to create patient. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [fullName, address, photoFile, onSubmit]);

  return (
    <form
      className="patient-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {submitError && <ErrorMessage message={submitError} />}
      <div className="form-field">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          maxLength={100}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Joop de Boer"
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          aria-invalid={errors.fullName !== undefined}
        />
        {errors.fullName && (
          <span id="fullName-error" className="field-error">
            {errors.fullName}
          </span>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          maxLength={250}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Kalverstraat 123"
          aria-describedby={
            errors.address !== undefined ? "address-error" : undefined
          }
          aria-invalid={errors.address !== undefined}
        />
        {errors.address && (
          <span id="address-error" className="field-error">
            {errors.address}
          </span>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="photo">Photo (optional)</label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
        />
      </div>
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating new patient..." : "Create Patient"}
        </button>
      </div>
    </form>
  );
};

export default PatientFormComponent;
