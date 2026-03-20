const API_BASE = 'http://localhost:5104/api';

const patients = [
  { fullName: 'James Anderson', address: '12 Oak Street, Amsterdam' },
  { fullName: 'Sarah Mitchell', address: '45 Maple Avenue, Rotterdam' },
  { fullName: 'David Thornton', address: '8 Elm Road, Utrecht' },
  { fullName: 'Emma van der Berg', address: '23 Linden Lane, Den Haag' },
  { fullName: 'Michael Roberts', address: '67 Pine Street, Eindhoven' },
];

const dentists = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown'];
const treatments = ['Cleaning', 'Filling', 'Extraction', 'Whitening'];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomDateTimeInNextMonth = () => {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * 30) + 1);
  date.setHours(8 + Math.floor(Math.random() * 9));
  date.setMinutes(Math.random() > 0.5 ? 30 : 0);
  date.setSeconds(0);
  return date.toISOString().slice(0, 19);
};

const createPatient = async (patient) => {
  const res = await fetch(`${API_BASE}/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...patient, photoBase64: null }),
  });
  if (!res.ok) throw new Error(`Failed to create patient: ${patient.fullName}`);
  return res.json();
};

const createAppointment = async (patientId) => {
  const res = await fetch(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      patientId,
      dateTime: randomDateTimeInNextMonth(),
      dentistName: randomItem(dentists),
      treatment: randomItem(treatments),
    }),
  });
  if (!res.ok) throw new Error(`Failed to create appointment for patient ${patientId}`);
  return res.json();
};

const seed = async () => {
  console.log('Seeding database...\n');

  for (const patient of patients) {
    const created = await createPatient(patient);
    console.log(`✓ Created patient: ${created.fullName} (id: ${created.id})`);

    const appointmentCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < appointmentCount; i++) {
      const appointment = await createAppointment(created.id);
      console.log(`  ✓ Added appointment: ${appointment.treatment} with ${appointment.dentistName}`);
    }
  }

  console.log('\nDone!');
};

seed().catch(console.error);