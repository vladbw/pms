namespace Pms.Api.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public string DentistName { get; set; } = string.Empty;
        public Treatment? Treatment { get; set; }
        public int DurationMinutes { get; set; }
        public int PatientId { get; set; }
        public Patient Patient { get; set; } = null!;
        }
}