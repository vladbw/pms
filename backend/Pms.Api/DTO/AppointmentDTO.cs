using Pms.Api.Models;

namespace Pms.Api.DTOs
{
    public record CreateAppointmentDto(
        int PatientId,
        DateTime DateTime,
        string DentistName,
        Treatment? Treatment
    );

    public record AppointmentDto(
        int Id,
        DateTime DateTime,
        string DentistName,
        Treatment? Treatment,
        int DurationMinutes
    );    
}

