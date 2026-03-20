using Microsoft.AspNetCore.Mvc;
using Pms.Api.DTOs;
using Pms.Api.Services;

namespace Pms.Api.Controllers;

[ApiController]
[Route("api/patients")]
public class PatientsController : ControllerBase
{
    private readonly IPatientService _patientService;

    public PatientsController(IPatientService patientService)
    {
        _patientService = patientService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllPatients()
    {
        var patients = await _patientService.GetAllPatientsAsync();
        return Ok(patients);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPatientById(int id)
    {
        var patient = await _patientService.GetPatientByIdAsync(id);
        return patient is null ? NotFound(new { error = $"Patient with id {id} was not found." }) : Ok(patient);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePatient([FromBody] CreatePatientDto dto)
    {
        if (dto.FullName.Length > 100)
            return BadRequest(new { error = "Full name cannot exceed 100 characters." });

        if (dto.Address.Length > 250)
            return BadRequest(new { error = "Address cannot exceed 250 characters." });

        if (string.IsNullOrWhiteSpace(dto.FullName))
            return BadRequest(new { error = "Full name is required." });

        if (string.IsNullOrWhiteSpace(dto.Address))
            return BadRequest(new { error = "Address is required." });

        var patient = await _patientService.CreatePatientAsync(dto);

        return CreatedAtAction(nameof(GetPatientById), new { id = patient.Id }, patient);
    }
}