using Microsoft.AspNetCore.Mvc;
using Pms.Api.DTOs;
using Pms.Api.Services;

namespace Pms.Api.Controllers
{
    [ApiController]
    [Route("api/appointments")]
    public class AppointmentsController : ControllerBase
    {
        private readonly IAppointmentService _appointmentService;

        public AppointmentsController(IAppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [HttpGet("{patientId}")]
        public async Task<IActionResult> GetByPatientId(int patientId)
        {
            var appointments = await _appointmentService.GetAppointmentsByPatientIdAsync(patientId);
            return Ok(appointments);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateAppointmentDto dto)
        {
            if (dto.PatientId <= 0)
                return BadRequest(new { error = "A valid patient id is required." });

            if (string.IsNullOrWhiteSpace(dto.DentistName))
                return BadRequest(new { error = "Dentist name is required." });

            if (dto.Treatment is null)
                return BadRequest(new { error = "Treatment is required." });

            if (dto.DateTime < DateTime.UtcNow)
                return BadRequest(new { error = "Cannot create an appoinment for a past date." });

            if (dto.DateTime == default)
                return BadRequest(new { error = "A valid appointment date and time is required." });

            try
            {
                var appointment = await _appointmentService.CreateAppointmentAsync(dto);
                return CreatedAtAction(nameof(GetByPatientId), new { patientId = dto.PatientId }, appointment);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { error = ex.Message }); // No matching patient
            }
            catch (InvalidOperationException e)
            {
                return Conflict(new { error = e.Message }); // There is already a doctor booked at that time
            }
        }
    }
}