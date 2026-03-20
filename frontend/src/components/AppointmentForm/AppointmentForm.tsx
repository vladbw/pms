import './AppointmentForm.css';
import { useState, useCallback } from 'react';
import type { CreateAppointmentDto } from '../../types/Appointment';
import { Treatment } from '../../types/Treatment';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useDentists } from '../../hooks/pmsHooks';
import { appointmentSchema } from '../../services/validation/validationSchemas';
import { ValidationService, type ValidationErrors } from '../../services/validation/validationService';
import SpinnerComponent from '../Spinner/Spinner';

interface AppointmentFormProps {
  patientId: number;
  onSubmit: (dto: CreateAppointmentDto) => Promise<void>;
  onCancel: () => void;
}

const AppointmentForm = ({ patientId, onSubmit, onCancel }: AppointmentFormProps) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [dentistName, setDentistName] = useState('');
  const [treatment, setTreatment] = useState('');
  const [errors, setErrors] = useState<ValidationErrors<CreateAppointmentDto>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: dentists, isLoading: dentistsLoading, error: dentistsError } = useDentists();

  const handleSubmit = useCallback(async () => {
    const dto: CreateAppointmentDto = {
      patientId,
      dateTime: date && time ? `${date}T${time}:00` : '',
      dentistName,
      treatment: treatment as Treatment | null,
    };

    const validationErrors = ValidationService.validate(dto, appointmentSchema);

    if (ValidationService.hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});
      setSubmitError(null);
      await onSubmit(dto);
    } catch {
      setSubmitError('Failed to create appointment, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [patientId, date, time, dentistName, treatment, onSubmit]);

  if (dentistsLoading) return <SpinnerComponent />;
  if (dentistsError) return <ErrorMessage message={dentistsError} />;
  
  return (
    <form className="appointment-form" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
      {submitError && <ErrorMessage message={submitError} />}
      <div className="form-field">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          min={new Date().toISOString().split('T')[0]}
          onChange={e => setDate(e.target.value)}
          aria-invalid={errors.dateTime !== undefined}
          aria-describedby={errors.dateTime !== undefined ? 'date-error' : undefined}
        />
        {errors.dateTime && (
          <span id="date-error" className="field-error" role="alert">
            {errors.dateTime}
          </span>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="time">Time</label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="dentist">Dentist</label>
        <select
          id="dentist"
          value={dentistName}
          onChange={e => setDentistName(e.target.value)}
          aria-invalid={errors.dentistName !== undefined}
          aria-describedby={errors.dentistName !== undefined ? 'dentist-error' : undefined}
        >
          <option value="">Select a dentist</option>
          {dentists?.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        {errors.dentistName && (
          <span id="dentist-error" className="field-error" role="alert">
            {errors.dentistName}
          </span>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="treatment">Treatment</label>
        <select
          id="treatment"
          value={treatment}
          onChange={e => setTreatment(e.target.value)}
          aria-invalid={errors.treatment !== undefined}
          aria-describedby={errors.treatment !== undefined ? 'treatment-error' : undefined}
        >
          <option value="">Select a treatment</option>
          {Object.values(Treatment).map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.treatment && (
          <span id="treatment-error" className="field-error" role="alert">
            {errors.treatment}
          </span>
        )}
      </div>
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating the new appointment...' : 'Create Appointment'}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;