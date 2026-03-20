using Microsoft.EntityFrameworkCore;
using Pms.Api.Data;
using Pms.Api.DTOs;
using Pms.Api.Models;

namespace Pms.Api.Services;

public class PatientService : IPatientService
{
    private readonly PmsDbContext _context;

    public PatientService(PmsDbContext context)
    {
        _context = context;
    }

    public async Task<List<PatientOverviewDto>> GetAllPatientsAsync()
    {
        //Here and also in the method fetching all appointments, a production grade system would probably require pagination (eg first load up first 100 results, then 100-200, etc.)
        return await _context.Patients
            .Select(p => new PatientOverviewDto(
                p.Id,
                p.FullName
            ))
            .ToListAsync();
    }

    public async Task<PatientDetailDto?> GetPatientByIdAsync(int id)
    {
        var patient = await _context.Patients
            .Include(p => p.Appointments)
            .FirstOrDefaultAsync(p => p.Id == id);

        return patient is null ? null : MapToDetailDto(patient);
    }

    public async Task<PatientDetailDto> CreatePatientAsync(CreatePatientDto dto)
    {
        var patient = new Patient
        {
            FullName = dto.FullName,
            Address = dto.Address,
            PhotoBase64 = dto.PhotoBase64
        };

        _context.Patients.Add(patient);
        await _context.SaveChangesAsync();

        return MapToDetailDto(patient);
    }

    private static PatientDetailDto MapToDetailDto(Patient patient)
    {
        //TODO: In a production app, the ordering of the appointments would be done on the db level
        return new PatientDetailDto(
            patient.Id,
            patient.FullName,
            patient.Address,
            patient.PhotoBase64,
            patient.Appointments.OrderBy(a => a.DateTime).Select(a => new AppointmentDto(
                a.Id,
                a.DateTime,
                a.DentistName,
                a.Treatment,
                a.DurationMinutes
            )).ToList()
        );
    }
}