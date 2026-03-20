namespace Pms.Api.DTOs
{
    public record CreatePatientDto(
        string FullName,
        string Address,
        string? PhotoBase64
    );

    public record PatientDetailDto(
        int Id,
        string FullName,
        string Address,
        string? PhotoBase64,
        List<AppointmentDto> Appointments
    );

    //In the home dashboard, we dont need to show complete information for all patients right away (before selecting a specific patient)
    //So this overview is enough, we do not wanna bring in the appointments/address/photo for all users from the start due to performance concerns
    public record PatientOverviewDto(
        int Id,
        string FullName
    );
}

