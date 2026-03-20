using Pms.Api.DTOs;
namespace Pms.Api.Services
{
    public interface IPatientService
    {
        Task<PatientDetailDto?> GetPatientByIdAsync(int id);
        Task<PatientDetailDto> CreatePatientAsync(CreatePatientDto dto);
        Task<List<PatientOverviewDto>> GetAllPatientsAsync();
    }
}

