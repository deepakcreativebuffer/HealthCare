export const mockUser = {
  id: "RES001",
  name: "Mariaa Johnson",
  role: "resident",
  age: 51,
  dob: "03/15/1970",
  gender: "Male", // Note: Screenshot shows 'Male' despite name
  mrn: "MRN-28224-X",
  email: "mariaa.johnson@example.com",
  phone: "(555) 123-4567",
  address: "123 Healthcare Blvd, Suite 402, Springfield, IL 62704",
  emergencyContact: {
    name: "Mary Smith",
    phone: "(555) 987-6543",
    relation: "Spouse"
  },
  insurance: {
    provider: "BlueCross BlueShield",
    plan: "PPO Platinum Plus",
    subscriber: "John A. Smith",
    groupId: "ABC123456789",
    status: "Active"
  },
  allergies: [
    { name: "Penicillin", severity: "Severe", reaction: "Anaphylaxis", color: "red" },
    { name: "Peanuts", severity: "Moderate", reaction: "Hives/Swelling", color: "orange" },
    { name: "Latex", severity: "Mild", reaction: "Dermatitis", color: "orange" },
    { name: "Sulfa Drugs", severity: "Moderate", reaction: "Generalized Rash", color: "orange" }
  ],
  conditions: ["Type 2 Diabetes", "Hypertension", "Hyperlipidemia", "GERD", "Stable Angina"],
  activeProblems: 5,
  medicationsCount: 8,
  fallRisk: "High Risk",
  lastVisit: "11/20/2022",
  latestVitals: {
    bp: "120/80",
    hr: "72",
    temp: "98.6°F",
    o2: "98%",
    weight: "185 lbs",
    height: "5'10\"",
    bmi: "26.5"
  },
  upcomingAppointment: {
    date: "12/10/2022",
    time: "10:30 AM",
    type: "Cardiology Follow-up",
    location: "Building B, Room 402",
    followUp: "3 MONTHS",
    provider: "Dr. Emily Roberts"
  },
  recentVisitsHistory: [
    { label: "Internal Medicine", value: "Nov 20, 2022", icon: "Clock" },
    { label: "Cardiology", value: "Oct 15, 2022", icon: "Activity" },
    { label: "Radiology", value: "Sep 22, 2022", icon: "FileText" },
    { label: "Phlebotomy", value: "Sep 10, 2022", icon: "FlaskConical" }
  ],
  diagnoses: [
    { name: "I20.9 - Angina Pectoris, unspecified", date: "11/20/2022", level: "Primary", notes: "Stable presentation, monitoring required." },
    { name: "E11.9 - Type 2 Diabetes w/o complications", date: "10/11/2018", level: "Chronic", notes: "Controlled via Metformin." },
    { name: "I10 - Essential Hypertension", date: "05/12/2016", level: "Chronic", notes: "Stable on Lisinopril." },
    { name: "E78.5 - Hyperlipidemia, unspecified", date: "03/10/2020", level: "Chronic", notes: "Management via Atorvastatin." },
    { name: "K21.9 - GERD without esophagitis", date: "08/14/2021", level: "Active", notes: "PRN antacids." }
  ],
  labResults: [
    { name: "HbA1c", value: "6.4%", status: "Borderline", date: "11/15/2022", range: "4.0-5.6%" },
    { name: "LDL Cholesterol", value: "135 mg/dL", status: "High", date: "11/15/2022", range: "<100 mg/dL" },
    { name: "Hemoglobin", value: "14.2 g/dL", status: "Normal", date: "11/15/2022", range: "13.5-17.5 g/dL" },
    { name: "ALT (Liver Panel)", value: "24 U/L", status: "Normal", date: "11/15/2022", range: "7-55 U/L" },
    { name: "Serum Creatinine", value: "0.9 mg/dL", status: "Normal", date: "11/15/2022", range: "0.7-1.3 mg/dL" },
    { name: "Glucose (Fasting)", value: "105 mg/dL", status: "High", date: "11/15/2022", range: "70-99 mg/dL" }
  ],
  documents: [
    { name: "Discharge Summary - Springfield Med", status: "Signed", date: "11/18/2022", type: "PDF" },
    { name: "EKG Waveform Trace", status: "Defined", date: "11/20/2022", type: "Image" },
    { name: "Chest X-Ray Final Report", status: "Final", date: "11/20/2022", type: "File" },
    { name: "BCBS Insurance Card Scanned", status: "Verified", date: "01/10/2022", type: "Scan" },
    { name: "Annual Wellness Visit Summary", status: "Signed", date: "09/15/2022", type: "PDF" }
  ],
  dischargeSummary: {
    status: "Stable / Discharged",
    instruction: "Patient advised to maintain light activity. Monitor heart rate daily. Specialist follow up required within 2 weeks."
  },
  medicationsList: [
    { id: 1, name: "Lisinopril", dose: "10mg", instructions: "1 Tablet PO DAILY IN MORNING", type: "Antihypertensive" },
    { id: 2, name: "Atorvastatin", dose: "40mg", instructions: "1 Tablet PO QHS (AT BEDTIME)", type: "Statin" },
    { id: 3, name: "Metformin", dose: "500mg", instructions: "1 Tablet PO TID WITH MEALS", type: "Antidiabetic" },
    { id: 4, name: "Aspirin (Low Dose)", dose: "81mg", instructions: "1 Tablet PO DAILY", type: "Antiplatelet" },
    { id: 5, name: "Metoprolol Succinate", dose: "25mg", instructions: "1 Tablet PO BID", type: "Beta Blocker" },
    { id: 6, name: "Omeprazole", dose: "20mg", instructions: "1 Capsule PO DAILY", type: "PPI" }
  ],
  carePlan: [
    { 
      title: "Cardiac Output Management", 
      instruction: "Monitor weight daily. Report weight gain > 2 lbs/day. Restrict sodium to 2g/day",
      icon: "Activity",
      priority: "High"
    },
    { 
      title: "Activity Tolerance", 
      instruction: "Encourage progressive ambulation. Refer to cardio rehab phase ll program",
      icon: "UserCheck",
      priority: "Medium"
    },
    { 
      title: "Glycemic Control", 
      instruction: "Check capillary blood glucose pre-meals and at bedtime. Goal: 80-130 mg/dL.",
      icon: "TrendingUp",
      priority: "High"
    },
    { 
      title: "Medication Adherence", 
      instruction: "Educate on side effects of Beta Blockers. Patient to use pill organizer.",
      icon: "Pill",
      priority: "Medium"
    }
  ],
  socialHistory: {
    tobacco: "Former Smoker (Quit Oct 2012)",
    alcohol: "Occasional (1-2 drinks/mo)",
    diet: "Low Sodium (Cardiac Diet)",
    exercise: "Light Walk (2 days/wk)",
    sleep: "Good (7-8 hours/night)",
    living: "With Spouse (Independent Home)",
    occupation: "Retired School Administrator",
    pets: "One small dog"
  },
  careTeam: [
    { name: "Dr. Emily Roberts", role: "CARDIOLOGIST", initial: "ER", phone: "(555) 444-3322", email: "e.roberts@springfieldmed.org" },
    { name: "Dr. John Chen", role: "PRIMARY CARE", initial: "JC", phone: "(555) 111-2233", email: "j.chen@healthclinic.org" },
    { name: "Sarah Wilson, NP", role: "GERIATRIC NP", initial: "SW", phone: "(555) 888-9900", email: "s.wilson@healthclinic.org" },
    { name: "Mark Thompson, PT", role: "PHYSICAL THERAPIST", initial: "MT", phone: "(555) 222-1111", email: "m.thompson@rehab.org" }
  ],
  pharmacy: {
    name: "CVS Pharmacy #1234",
    address: "492 Pharmacy Ave, Suite B, Springfield, IL 62704",
    phone: "(555) 987-6543",
    hours: "Open 24 Hours"
  },
  billing: {
    totalBalance: 420.00,
    records: [
      { date: "11/20/2022", id: "INV-98765", amount: 200.00, status: "PENDING", service: "Office Visit - Specialist" },
      { date: "11/15/2022", id: "INV-98768", amount: 70.00, status: "UNPAID", service: "Laboratory Panel" },
      { date: "11/10/2022", id: "INV-98763", amount: 150.00, status: "PAID", service: "Standard Wellness Check" },
      { date: "10/22/2022", id: "INV-98512", amount: 1200.00, status: "PAID", service: "Diagnostic MRI" },
      { date: "10/05/2022", id: "INV-98401", amount: 45.00, status: "PAID", service: "Medication Copay" },
      { date: "09/15/2022", id: "INV-98322", amount: 200.00, status: "PAID", service: "Annual Lab Work" }
    ]
  }
};

export const diagnosisProblems = mockUser.diagnoses;
export const medications = mockUser.medicationsList;
export const appointments = [mockUser.upcomingAppointment];
export const assignedForms = [];
export const recentDocuments = mockUser.documents;
export const billingDetails = {
  balanceDue: mockUser.billing.totalBalance,
  lastPayment: { amount: 1200.00, date: "10/22/2022" },
  progress: 85
};
export const vitals = mockUser.latestVitals;
