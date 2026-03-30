export const mockUser = {
  name: "Jimmy Chu",
  role: "resident",
  age: 34,
  mrn: "100456",
  allergies: ["Penicillin", "Dust", "Peanuts"],
  conditions: ["Asthma", "Environmental & Food"]
};

export const appointments = [
  {
    id: 1,
    doctor: "Dr. John Smith",
    date: "Thursday, Apr 25",
    time: "10:30 AM",
    location: "Monterey Clinic",
  },
  {
    id: 2,
    doctor: "Dr. John Smith",
    date: "Thursday, Apr 25",
    time: "10:30 AM",
    location: "Monterey Clinic",
  }
];

export const vitals = {
  bloodPressure: "120/80 mmHg",
  heartRate: "74 bpm",
  bmi: "17.1 lbs",
  respirationRate: "60 bpm"
};

export const diagnosisProblems = [
  { id: 1, name: "Depression", onset: "2023", status: "Active" },
  { id: 2, name: "Degenerative Arthritis", type: "Chronic", status: "Chronic" },
  { id: 3, name: "Skin Reactions", type: "Recurrent", status: "Recurrent" },
  { id: 4, name: "Skin Reactions", type: "Buccal mucosal apthous", status: "Recurrent" }
];

export const medications = [
  { id: 1, name: "Lisinopril", dose: "20 mg", details: "20 MG • Oral • Daily", status: "Active" },
  { id: 2, name: "Abacavir Sulfate", dose: "", details: "300 MG • Oral • Daily", status: "Active" },
  { id: 3, name: "Abelcet Injection", dose: "", details: "5 MG/KG • IV • As needed", status: "Active" },
  { id: 4, name: "Abelcet (Injection)", dose: "", details: "21 Jan 2024 • Mark Lewis, MD", status: "Active" }
];

export const assignedForms = [
  { id: 1, name: "Annual Health Assessment", status: "Pending" },
  { id: 2, name: "Medication Consent Form", status: "Signed" }
];

export const recentDocuments = [
  { id: 1, name: "Lab Report - December 10", date: "22 Feb 2024" },
  { id: 2, name: "Insurance Documentation", date: "02 Jan 2024" },
  { id: 3, name: "Previous Treatment Plan", date: "02 Jan 2024" }
];

export const billingDetails = {
  balanceDue: 250.00,
  lastPayment: { amount: 30.00, date: "20 Mar 2024" },
  progress: 60
};
