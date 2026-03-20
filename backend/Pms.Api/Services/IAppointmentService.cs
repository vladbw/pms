using Pms.Api.DTOs;

namespace Pms.Api.Services;

public interface IAppointmentService
{
    Task<List<AppointmentDto>> GetAppointmentsByPatientIdAsync(int patientId);
    Task<AppointmentDto> CreateAppointmentAsync(CreateAppointmentDto dto);
}