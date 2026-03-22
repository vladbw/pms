//Prod
// const API_BASE = 'https://pms-production-8f21.up.railway.app/api';

//Local
const API_BASE = 'http://localhost:5104/api';

const patients = [
  { fullName: 'James Whitfield', address: 'Keizersgracht 123, 1015 CJ Amsterdam' },
  { fullName: 'Sofia Brennan but it is a very long name ', address: 'Herengracht 456, 1017 BX Amsterdam' },
  { fullName: 'Marcus Chen', address: 'Prinsengracht 789, 1016 HT Amsterdam' },
  { fullName: 'Isabelle Fontaine', address: 'Overtoom 234, 1054 HW Amsterdam' },
  { fullName: 'Oliver Strawn', address: 'Vondelstraat 56, 1054 GE Amsterdam' },
  { fullName: 'Natasha Volkov', address: 'Leidsestraat 12, 1017 PA Amsterdam' },
  { fullName: 'Diego Reyes', address: 'Reguliersdwarsstraat 89, 1017 BK Amsterdam' },
  { fullName: 'Amelia Hartley', address: 'Spuistraat 145, 1012 SZ Amsterdam' },
  { fullName: 'Ethan Blackwood which is honestly a long name lets display it', address: 'Nieuwendijk 67, 1012 MC Amsterdam' },
  { fullName: 'Chloe Beaumont', address: 'Damrak 234, 1012 LK Amsterdam' },
  { fullName: 'Viktor Hoffman', address: 'Binnenhof 1, 2513 AA Den Haag' },
  { fullName: 'Layla Hassan', address: 'Lange Voorhout 34, 2514 EG Den Haag' },
  { fullName: 'Connor Murphy', address: 'Nobelstraat 12, 2513 BC Den Haag' },
  { fullName: 'Priya Sharma', address: 'Frederikstraat 56, 2514 LK Den Haag' },
  { fullName: 'Felix Wagner', address: 'Denneweg 78, 2514 CG Den Haag' },
  { fullName: 'Zoe Andersen', address: 'Javastraat 90, 2585 AL Den Haag' },
  { fullName: 'Rafael Costa', address: 'Mauritskade 45, 2514 HG Den Haag' },
  { fullName: 'Hannah Sterling', address: 'Parkstraat 23, 2514 JK Den Haag' },
  { fullName: 'Lucas Petrov', address: 'Koninginnegracht 67, 2514 AB Den Haag' },
  { fullName: 'Mia Nakamura', address: 'Alexanderstraat 89, 2514 JL Den Haag' },
  { fullName: 'Adrian Kowalski', address: 'Coolsingel 123, 3011 AG Rotterdam' },
  { fullName: 'Elena Marchetti', address: 'Witte de Withstraat 45, 3012 BN Rotterdam' },
  { fullName: 'Samuel Okafor', address: 'Meent 67, 3011 JG Rotterdam' },
  { fullName: 'Ingrid Solberg', address: 'Blaak 234, 3011 TA Rotterdam' },
  { fullName: 'Thomas Garrett', address: 'Pannekoekstraat 56, 3011 LL Rotterdam' },
  { fullName: 'Valentina Cruz', address: 'Hoogstraat 78, 3011 PJ Rotterdam' },
  { fullName: 'Noah Eriksson', address: 'Goudsesingel 90, 3031 EG Rotterdam' },
  { fullName: 'Aisha Diallo', address: 'Nieuwe Binnenweg 12, 3015 BA Rotterdam' },
  { fullName: 'Patrick Donovan', address: 'Schiedamse Vest 34, 3012 BA Rotterdam' },
  { fullName: 'Yuki Tanaka', address: 'Mauritsweg 56, 3012 JS Rotterdam' },
  { fullName: 'Sebastian Müller', address: 'Oudegracht 123, 3511 AE Utrecht' },
  { fullName: 'Freya Lindqvist', address: 'Voorstraat 45, 3512 AK Utrecht' },
  { fullName: 'Damian Nowak', address: 'Nobelstraat 67, 3512 EN Utrecht' },
  { fullName: 'Clara Dubois', address: 'Wittevrouwenstraat 89, 3512 CS Utrecht' },
  { fullName: 'Ravi Patel', address: 'Springweg 12, 3511 VT Utrecht' },
  { fullName: 'Astrid Bergström', address: 'Lange Nieuwstraat 34, 3512 PB Utrecht' },
  { fullName: 'Julian Baxter', address: 'Hamburgerstraat 56, 3512 NS Utrecht' },
  { fullName: 'Nora Fitzgerald', address: 'Mariaplaats 78, 3511 LL Utrecht' },
  { fullName: 'Ivan Sokolov', address: 'Domstraat 90, 3512 JC Utrecht' },
  { fullName: 'Carmen Vega', address: 'Servetstraat 12, 3512 HA Utrecht' },
  { fullName: 'Aaron Fletcher', address: 'Vestdijk 123, 5611 CA Eindhoven' },
  { fullName: 'Mei Lin Zhou', address: 'Rechtestraat 45, 5611 GS Eindhoven' },
  { fullName: 'Tobias Richter', address: 'Stratumseind 67, 5611 ET Eindhoven' },
  { fullName: 'Leila Mansouri', address: 'Kleine Berg 89, 5611 JS Eindhoven' },
  { fullName: 'Callum Reid', address: 'Bergstraat 12, 5611 KP Eindhoven' },
  { fullName: 'Simone Laurent', address: 'Wilhelminaplein 34, 5611 HE Eindhoven' },
  { fullName: 'Omar Khalil', address: 'Paradijslaan 56, 5611 KN Eindhoven' },
  { fullName: 'Grace Oconnell', address: 'Dommelstraat 78, 5611 CK Eindhoven' },
  { fullName: 'Henrik Larsen', address: 'Mathildelaan 90, 5611 BD Eindhoven' },
  { fullName: 'Bianca Romano', address: 'Fellenoord 12, 5611 ZB Eindhoven' },
];

const dentists = ['Dr. Vlad', 'Dr. Johann', 'Dr. Paul', 'Dr. Nicolas'];
const treatments = ['Cleaning', 'Filling', 'Extraction', 'Whitening', 'Consultation', 'Cavity'];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Track used slots to avoid conflicts
const usedSlots = new Set();

const randomDateTimeInNextMonth = () => {
  let attempts = 0;
  while (attempts < 20) {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 30) + 1);
    date.setHours(8 + Math.floor(Math.random() * 9));
    date.setMinutes(Math.random() > 0.5 ? 30 : 0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const dentist = randomItem(dentists);
    const slot = `${dentist}-${date.toISOString()}`;

    if (!usedSlots.has(slot)) {
      usedSlots.add(slot);
      return { dateTime: date.toISOString().slice(0, 19), dentistName: dentist };
    }
    attempts++;
  }
  return null;
};

const generateAvatarBase64 = (initials) => {
  const colors = ['#2563eb', '#16a34a', '#dc2626', '#9333ea', '#ea580c', '#0891b2', '#65a30d', '#d97706', '#db2777', '#7c3aed'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <circle cx="50" cy="50" r="50" fill="${color}"/>
      <text x="50" y="56" font-family="Arial" font-size="36" font-weight="bold"
        fill="white" text-anchor="middle" dominant-baseline="middle">
        ${initials}
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

const getInitials = (fullName) => {
  const parts = fullName.split(' ').filter(p => !['van', 'de', 'der', 'den', 'het'].includes(p.toLowerCase()));
  return parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : parts[0][0].toUpperCase();
};

const createPatient = async (patient, includePhoto) => {
  const photoBase64 = includePhoto ? generateAvatarBase64(getInitials(patient.fullName)) : null;

  const res = await fetch(`${API_BASE}/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...patient, photoBase64 }),
  });

  if (!res.ok) throw new Error(`Failed to create patient: ${patient.fullName}`);
  return res.json();
};

const createAppointment = async (patientId) => {
  const slot = randomDateTimeInNextMonth();
  if (!slot) {
    console.log(`  ⚠ Could not find a free slot, skipping appointment`);
    return null;
  }

  const res = await fetch(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      patientId,
      dateTime: slot.dateTime,
      dentistName: slot.dentistName,
      treatment: randomItem(treatments),
    }),
  });

  if (!res.ok) {
    console.log(`  ⚠ Failed to create appointment, skipping`);
    return null;
  }

  return res.json();
};

const seed = async () => {
  console.log(`Seeding database at ${API_BASE}...\n`);

  for (let i = 0; i < patients.length; i++) {
    const patient = patients[i];
    const includePhoto = i < 10;
    const created = await createPatient(patient, includePhoto);
    console.log(`✓ Created patient: ${created.fullName} (id: ${created.id})${includePhoto ? ' [with photo]' : ''}`);

    if (i < 15) {
      const appointmentCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < appointmentCount; j++) {
        const appointment = await createAppointment(created.id);
        if (appointment) {
          console.log(`  ✓ Added appointment: ${appointment.treatment} with ${appointment.dentistName}`);
        }
      }
    }
  }

  console.log('\nDone!');
};

seed().catch(console.error);