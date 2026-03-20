using Microsoft.EntityFrameworkCore;
using Pms.Api.Data;
using Pms.Api.DTOs;
using Pms.Api.Models;

namespace Pms.Api.Services;

public class AppointmentService : IAppointmentService
{
    private readonly PmsDbContext _context;

    // TODO: In a production system, treatment durations would likely be sourced
    // from a configuration service or database table, allowing clinic staff to
    // manage them without requiring a code change or redeployment.
    private static readonly Dictionary<Treatment, int> TreatmentDurations = new()
    {
        {Treatment.Cleaning, 30},
        {Treatment.Filling, 60},
        {Treatment.Extraction, 120},
        {Treatment.Whitening, 90},
        {Treatment.Cavity, 60},
        {Treatment.Consultation, 60}
    };

    public AppointmentService(PmsDbContext context)
    {
        _context = context;
    }

    public async Task<List<AppointmentDto>> GetAppointmentsByPatientIdAsync(int patientId)
    {
        return await _context.Appointments
            .Where(a => a.PatientId == patientId)
            .Select(a => new AppointmentDto(
                a.Id,
                a.DateTime,
                a.DentistName,
                a.Treatment,
                a.DurationMinutes
            ))
            .ToListAsync();
    }

    public async Task<AppointmentDto> CreateAppointmentAsync(CreateAppointmentDto dto)
    {
        var patientExists = await _context.Patients.AnyAsync(p => p.Id == dto.PatientId);

        if (!patientExists)
        {
            throw new KeyNotFoundException($"Patient with id {dto.PatientId} does not exist.");
        }

        // TODO: In production, we must make sure the lock does not lock the wholw db
        using var transaction = await _context.Database.BeginTransactionAsync(
            System.Data.IsolationLevel.Serializable
        );

        try
        {   //TODO: In production, there would be some serious Dentist entity/service which handled doctor schedules and made sure doctors are booked for the appropriate timeslots only
            var hasConflict = await _context.Appointments
                .AnyAsync(a =>
                    a.DentistName == dto.DentistName &&
                    a.DateTime == dto.DateTime);

            if (hasConflict)
            {
                throw new InvalidOperationException("This dentist has a conflicting appointment at the selected time.");
            }

            var duration = dto.Treatment.HasValue
                ? TreatmentDurations.GetValueOrDefault(dto.Treatment.Value, 30)
                : 30;

            var appointment = new Appointment
            {
                PatientId = dto.PatientId,
                DateTime = dto.DateTime,
                DentistName = dto.DentistName,
                Treatment = dto.Treatment,
                DurationMinutes = duration
            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return new AppointmentDto(
                appointment.Id,
                appointment.DateTime,
                appointment.DentistName,
                appointment.Treatment,
                appointment.DurationMinutes
            );
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}