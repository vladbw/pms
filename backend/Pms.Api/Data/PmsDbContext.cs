using Microsoft.EntityFrameworkCore;
using Pms.Api.Models;

namespace Pms.Api.Data;

public class PmsDbContext : DbContext
{
    public PmsDbContext(DbContextOptions<PmsDbContext> options) : base(options) { }

    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<Appointment> Appointments => Set<Appointment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        ConfigurePatientEntity(modelBuilder);
        ConfigureAppointmentEntity(modelBuilder);
    }

    private static void ConfigurePatientEntity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Patient>(entity =>
        {
            entity.Property(p => p.FullName).HasMaxLength(100);
            entity.Property(p => p.Address).HasMaxLength(250);
        });
    }

    private static void ConfigureAppointmentEntity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.Property(a => a.DentistName).HasMaxLength(100);
            entity.Property(a => a.Treatment).HasConversion<string>();

            entity.HasOne(a => a.Patient)
                  .WithMany(p => p.Appointments)
                  .HasForeignKey(a => a.PatientId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }
}