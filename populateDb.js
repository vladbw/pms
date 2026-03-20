//Prod
// const API_BASE = 'https://pms-production-8f21.up.railway.app/api';

//Local
const API_BASE = 'http://localhost:5104/api';

const patients = [
  { fullName: 'Jan van der Berg', address: 'Keizersgracht 123, 1015 CJ Amsterdam' },
  { fullName: 'Marieke de Vries', address: 'Herengracht 456, 1017 BX Amsterdam' },
  { fullName: 'Pieter Janssen', address: 'Prinsengracht 789, 1016 HT Amsterdam' },
  { fullName: 'Anneliese Bakker', address: 'Overtoom 234, 1054 HW Amsterdam' },
  { fullName: 'Hendrik Visser', address: 'Vondelstraat 56, 1054 GE Amsterdam' },
  { fullName: 'Sofie van den Hoek', address: 'Leidsestraat 12, 1017 PA Amsterdam' },
  { fullName: 'Willem Smit', address: 'Reguliersdwarsstraat 89, 1017 BK Amsterdam' },
  { fullName: 'Lotte Meijer', address: 'Spuistraat 145, 1012 SZ Amsterdam' },
  { fullName: 'Dirk Mulder', address: 'Nieuwendijk 67, 1012 MC Amsterdam' },
  { fullName: 'Emma Dekker', address: 'Damrak 234, 1012 LK Amsterdam' },
  { fullName: 'Klaas van Dijk', address: 'Binnenhof 1, 2513 AA Den Haag' },
  { fullName: 'Roos Hermans', address: 'Lange Voorhout 34, 2514 EG Den Haag' },
  { fullName: 'Gerrit Postma', address: 'Nobelstraat 12, 2513 BC Den Haag' },
  { fullName: 'Liesbeth Kuiper', address: 'Frederikstraat 56, 2514 LK Den Haag' },
  { fullName: 'Arjan Kok', address: 'Denneweg 78, 2514 CG Den Haag' },
  { fullName: 'Tineke Bosman', address: 'Javastraat 90, 2585 AL Den Haag' },
  { fullName: 'Bart van Leeuwen', address: 'Mauritskade 45, 2514 HG Den Haag' },
  { fullName: 'Ingrid Brouwer', address: 'Parkstraat 23, 2514 JK Den Haag' },
  { fullName: 'Sjoerd Hendriks', address: 'Koninginnegracht 67, 2514 AB Den Haag' },
  { fullName: 'Mirjam Vos', address: 'Alexanderstraat 89, 2514 JL Den Haag' },
  { fullName: 'Floris de Boer', address: 'Coolsingel 123, 3011 AG Rotterdam' },
  { fullName: 'Yvonne van Dam', address: 'Witte de Withstraat 45, 3012 BN Rotterdam' },
  { fullName: 'Thijs Vermeer', address: 'Meent 67, 3011 JG Rotterdam' },
  { fullName: 'Hanneke Willems', address: 'Blaak 234, 3011 TA Rotterdam' },
  { fullName: 'Niels Jacobs', address: 'Pannekoekstraat 56, 3011 LL Rotterdam' },
  { fullName: 'Anouk van Loon', address: 'Hoogstraat 78, 3011 PJ Rotterdam' },
  { fullName: 'Rutger Peters', address: 'Goudsesingel 90, 3031 EG Rotterdam' },
  { fullName: 'Claudia Prins', address: 'Nieuwe Binnenweg 12, 3015 BA Rotterdam' },
  { fullName: 'Jeroen Vogel', address: 'Schiedamse Vest 34, 3012 BA Rotterdam' },
  { fullName: 'Bianca Scholten', address: 'Mauritsweg 56, 3012 JS Rotterdam' },
  { fullName: 'Wouter van Beek', address: 'Oudegracht 123, 3511 AE Utrecht' },
  { fullName: 'Sandra Groen', address: 'Voorstraat 45, 3512 AK Utrecht' },
  { fullName: 'Michiel Huisman', address: 'Nobelstraat 67, 3512 EN Utrecht' },
  { fullName: 'Petra Jonker', address: 'Wittevrouwenstraat 89, 3512 CS Utrecht' },
  { fullName: 'Erik Timmermans', address: 'Springweg 12, 3511 VT Utrecht' },
  { fullName: 'Monique van Rijn', address: 'Lange Nieuwstraat 34, 3512 PB Utrecht' },
  { fullName: 'Sebastiaan Blom', address: 'Hamburgerstraat 56, 3512 NS Utrecht' },
  { fullName: 'Annelies Koster', address: 'Mariaplaats 78, 3511 LL Utrecht' },
  { fullName: 'Raymond Wolff', address: 'Domstraat 90, 3512 JC Utrecht' },
  { fullName: 'Chantal de Graaf', address: 'Servetstraat 12, 3512 HA Utrecht' },
  { fullName: 'Martijn van Os', address: 'Vestdijk 123, 5611 CA Eindhoven' },
  { fullName: 'Esther Lammers', address: 'Rechtestraat 45, 5611 GS Eindhoven' },
  { fullName: 'Dennis Peeters', address: 'Stratumseind 67, 5611 ET Eindhoven' },
  { fullName: 'Marjolein van Wijk', address: 'Kleine Berg 89, 5611 JS Eindhoven' },
  { fullName: 'Patrick Hofman', address: 'Bergstraat 12, 5611 KP Eindhoven' },
  { fullName: 'Nathalie Kuijpers', address: 'Wilhelminaplein 34, 5611 HE Eindhoven' },
  { fullName: 'Joost van den Brink', address: 'Paradijslaan 56, 5611 KN Eindhoven' },
  { fullName: 'Wendy Schouten', address: 'Dommelstraat 78, 5611 CK Eindhoven' },
  { fullName: 'Frank Dijkstra', address: 'Mathildelaan 90, 5611 BD Eindhoven' },
  { fullName: 'Corine van der Meer', address: 'Fellenoord 12, 5611 ZB Eindhoven' },
  { fullName: 'Arno Steenbergen', address: 'Groote Markt 1, 9711 LV Groningen' },
  { fullName: 'Lisette Boers', address: 'Herestraat 23, 9711 LM Groningen' },
  { fullName: 'Thomas van Essen', address: 'Folkingestraat 45, 9711 JW Groningen' },
  { fullName: 'Marleen Bergsma', address: 'Oosterstraat 67, 9711 NR Groningen' },
  { fullName: 'Remco Veenstra', address: 'Zwanestraat 89, 9712 CK Groningen' },
  { fullName: 'Inge Hoekstra', address: 'Gelkingestraat 12, 9711 NB Groningen' },
  { fullName: 'Hans de Wit', address: 'Nieuwe Ebbingestraat 34, 9712 NH Groningen' },
  { fullName: 'Astrid Smeets', address: 'Carolieweg 56, 9713 AM Groningen' },
  { fullName: 'Kevin Nooij', address: 'Paterswoldseweg 78, 9726 AE Groningen' },
  { fullName: 'Eline van der Wal', address: 'Trompsingel 90, 9724 DA Groningen' },
  { fullName: 'Victor Hendriksen', address: 'Nieuwstad 12, 8911 AC Leeuwarden' },
  { fullName: 'Marianne Bouma', address: 'Voorstreek 34, 8911 JT Leeuwarden' },
  { fullName: 'Stefan Dijkema', address: 'Wirdumerdijk 56, 8911 CD Leeuwarden' },
  { fullName: 'Anita Terpstra', address: 'Nieuwestad 78, 8911 HV Leeuwarden' },
  { fullName: 'Rene van der Molen', address: 'Sophialaan 90, 8911 AE Leeuwarden' },
  { fullName: 'Carla Visser', address: 'Tweebaksmarkt 12, 8911 KZ Leeuwarden' },
  { fullName: 'Michel Koopman', address: 'Tuinen 34, 8911 KS Leeuwarden' },
  { fullName: 'Ingeborg Hiemstra', address: 'Bagijnestraat 56, 8911 CS Leeuwarden' },
  { fullName: 'Leon Oosterhout', address: 'Haniasteeg 78, 8911 BX Leeuwarden' },
  { fullName: 'Saskia van der Heide', address: 'Gouverneursplein 90, 8911 EL Leeuwarden' },
  { fullName: 'Paul Verhoeven', address: 'Langestraat 12, 1811 JC Alkmaar' },
  { fullName: 'Nicole Admiraal', address: 'Fnidsen 34, 1811 LR Alkmaar' },
  { fullName: 'Marco Ruiter', address: 'Mient 56, 1811 ER Alkmaar' },
  { fullName: 'Suzanne van Vliet', address: 'Laat 78, 1811 EK Alkmaar' },
  { fullName: 'Gerard Schreur', address: 'Verdronkenoord 90, 1811 PD Alkmaar' },
  { fullName: 'Moniek Bruin', address: 'Ridderstraat 12, 1811 KD Alkmaar' },
  { fullName: 'Laurens Bos', address: 'Kennemerstraatweg 34, 1851 BC Heiloo' },
  { fullName: 'Danielle van Zanten', address: 'Stationsweg 56, 1851 AX Heiloo' },
  { fullName: 'Tim Reijnen', address: 'Zeestraat 78, 1971 HD IJmuiden' },
  { fullName: 'Femke Groot', address: 'Kennemerlaan 90, 1971 JA IJmuiden' },
  { fullName: 'Alexander van Kampen', address: 'Markt 12, 5211 JX Den Bosch' },
  { fullName: 'Manon Claassen', address: 'Hinthamerstraat 34, 5211 MH Den Bosch' },
  { fullName: 'Roland Aarts', address: 'Kerkstraat 56, 5211 KG Den Bosch' },
  { fullName: 'Ilse van den Berg', address: 'Pensmarkt 78, 5211 KH Den Bosch' },
  { fullName: 'Daan Verbeek', address: 'Vughterstraat 90, 5211 GH Den Bosch' },
  { fullName: 'Rianne Hubers', address: 'Uilenburg 12, 5211 AK Den Bosch' },
  { fullName: 'Mark Bongers', address: 'Visstraat 34, 5211 AJ Den Bosch' },
  { fullName: 'Hanneke van Geel', address: 'Kolperstraat 56, 5211 WX Den Bosch' },
  { fullName: 'Oscar Willems', address: 'Parallelweg 78, 5223 AL Den Bosch' },
  { fullName: 'Lisanne de Jong', address: 'Europalaan 90, 5232 BC Den Bosch' },
  { fullName: 'Bram van der Linden', address: 'Molenstraat 12, 6211 JS Maastricht' },
  { fullName: 'Nienke Janssen', address: 'Rechtstraat 34, 6221 EG Maastricht' },
  { fullName: 'Stijn Puts', address: 'Vrijthof 56, 6211 LE Maastricht' },
  { fullName: 'Amber Cremers', address: 'Sint Servaasklooster 78, 6211 TE Maastricht' },
  { fullName: 'Tijs van der Laan', address: 'Grote Staat 90, 6211 CV Maastricht' },
  { fullName: 'Dorien Smolders', address: 'Bredestraat 12, 6211 HA Maastricht' },
  { fullName: 'Quinten Franssen', address: 'Wolfstraat 34, 6211 CV Maastricht' },
  { fullName: 'Lieke Nijssen', address: 'Muntstraat 56, 6211 EW Maastricht' },
];

const dentists = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown'];
const treatments = ['Cleaning', 'Filling', 'Extraction', 'Whitening', 'Consultation', 'Cavity'];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomDateTimeInNextMonth = () => {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * 30) + 1);
  date.setHours(8 + Math.floor(Math.random() * 9));
  date.setMinutes(Math.random() > 0.5 ? 30 : 0);
  date.setSeconds(0);
  return date.toISOString().slice(0, 19);
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
  const parts = fullName.split(' ').filter(p => !['van', 'de', 'der', 'den', 'het', 'van'].includes(p.toLowerCase()));
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
  console.log(`Seeding database at ${API_BASE}...\n`);

  for (let i = 0; i < patients.length; i++) {
    const patient = patients[i];
    const includePhoto = i < 10;
    const created = await createPatient(patient, includePhoto);
    console.log(`✓ Created patient: ${created.fullName} (id: ${created.id})${includePhoto ? ' [with photo]' : ''}`);

    const appointmentCount = Math.floor(Math.random() * 4) + 1;
    for (let j = 0; j < appointmentCount; j++) {
      const appointment = await createAppointment(created.id);
      console.log(`  ✓ Added appointment: ${appointment.treatment} with ${appointment.dentistName}`);
    }
  }

  console.log('\nDone!');
};

seed().catch(console.error);