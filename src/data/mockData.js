export const mockData = {
  residents: [
    {
      id: "RES001",
      name: "Maria Johnson",
      age: 72,
      gender: "Female",
      roomNumber: "101",
      admissionDate: "2023-11-12",
      status: "Active",
      email: "maria.j@example.com",
      phone: "555-0101",
      medicalConditions: ["Hypertension", "Type 2 Diabetes"],
      medications: ["Lisinopril 20mg", "Metformin 500mg"],
      allergies: ["Penicillin"],
      emergencyContact: { name: "Robert Johnson", relation: "Son", phone: "555-0123" },
      insurance: { provider: "Medicare", id: "MC123456789" },
      vitals: { bp: "135/85", bloodSugar: "110 mg/dL", weight: 65, heartRate: 72 },
      visits: [
        { id: 1, visitDate: '11/20/2022', visitType: 'Office Visit', providerName: 'Dr. Emily Roberts', chiefComplaint: 'Chest Pain', diagnosis: 'I20.9 - Angina Pectoris', procedure: '93000 - ECG', bp: '120/80', pulse: '72', temp: '98.6°F', weight: '185 lbs', notes: 'Patient presented with independent chest pain. ECG shows minor changes. RADIATING TO LEFT ARM.' }
      ],
      diagnosisProblems: [
        { id: 1, name: 'Atrial Fibrillation', onset: '2018', type: 'Chronic', status: 'Active', notes: 'Managed with anticoagulants.' },
        { id: 2, name: 'Hypertension', onset: '2015', type: 'Chronic', status: 'Controlled', notes: 'Stable on Lisinopril.' }
      ],
      labResults: [
        { id: 1, name: 'Comprehensive Metabolic Panel', date: '12/10/2022', value: 'Normal', flag: 'N', status: 'Final' },
        { id: 2, name: 'Lipid Panel', date: '12/10/2022', value: 'High', flag: 'H', status: 'Final' }
      ],
      medicationsList: [
        { id: 1, name: 'Lisinopril', dose: '10mg', details: '1 PO Daily', status: 'Active' },
        { id: 2, name: 'Atorvastatin', dose: '40mg', details: '1 PO QHS', status: 'Active' },
        { id: 3, name: 'Metformin', dose: '500mg', details: '1 PO BID w/ meals', status: 'Active' }
      ],
      appointments: [
        { id: 1, date: '12/10/2022', time: '10:00 AM', reason: 'Regular Checkup', doctor: 'Dr. Emily Roberts', location: 'Room 402', status: 'Scheduled' }
      ],
      allergies: [
        { id: 1, name: 'Penicillin', reaction: 'Anaphylaxis', severity: 'Severe', status: 'Active' },
        { id: 2, name: 'Peanuts', reaction: 'Hives', severity: 'Moderate', status: 'Active' }
      ],
      billingRecords: [
        { id: 1, invoiceNumber: 'INV-98765', serviceDate: '11/20/2022', charges: '$300.00', balance: '$300.00', status: 'Pending' },
        { id: 2, invoiceNumber: 'INV-98764', serviceDate: '11/15/2022', charges: '$150.00', balance: '$50.00', status: 'Partial' }
      ],
      medicalHistory: [
        { id: 1, Condition: 'Unspecified atrial fibrillation', 'Diagnosis Date': '2018' },
        { id: 2, Condition: 'Essential (primary) hypertension', 'Diagnosis Date': '2015' }
      ],
      activities: [
        { id: 1, type: 'Medication', name: 'Lisinopril 20mg Admin.', date: '08:00 AM Today', status: 'Completed' },
        { id: 2, type: 'Vitals', name: 'Morning Vitals Check', date: '07:30 AM Today', status: 'Completed' },
        { id: 3, type: 'Social', name: 'Art Therapy Session', date: '02:00 PM Today', status: 'Pending' }
      ]
    },
    {
      id: "RES002",
      name: "James Williams",
      age: 85,
      gender: "Male",
      roomNumber: "104",
      admissionDate: "2023-08-05",
      status: "Active",
      email: "james.w@example.com",
      phone: "555-0102",
      medicalConditions: ["Dementia", "Arthritis"],
      medications: ["Donepezil 10mg", "Celecoxib 200mg"],
      allergies: ["Sulfa Drugs"],
      emergencyContact: { name: "Sarah Williams", relation: "Daughter", phone: "555-0124" },
      insurance: { provider: "Aetna", id: "AE987654321" },
      vitals: { bp: "128/80", bloodSugar: "95 mg/dL", weight: 78, heartRate: 68 },
      visits: [
        { id: 1, visitDate: '11/15/2022', visitType: 'Follow-up', providerName: 'Dr. John Chen', chiefComplaint: 'Memory Fog', diagnosis: 'F03.90 - Dementia', bp: '130/80', pulse: '68', temp: '98.4°F', weight: '172 lbs', notes: 'Daughter reports increasing confusion in evenings.' }
      ],
      diagnosisProblems: [
        { id: 1, name: 'Dementia', onset: '2021', type: 'Progressive', status: 'Active' },
        { id: 2, name: 'Osteoarthritis', onset: '2019', type: 'Chronic', status: 'Stable' }
      ],
      medicationsList: [
        { id: 1, name: 'Donepezil', dose: '10mg', details: '1 PO Daily', status: 'Active' },
        { id: 2, name: 'Celecoxib', dose: '200mg', details: '1 PO Daily', status: 'Active' }
      ],
      billingRecords: [
        { id: 1, invoiceNumber: 'INV002', serviceDate: '03/05/2024', charges: '$2400.00', balance: '$1400.00', status: 'Pending' }
      ],
      allergies: [
        { id: 1, name: 'Sulfa Drugs', reaction: 'Skin Rash', severity: 'Moderate', status: 'Active' }
      ]
    },
    {
      id: "RES003",
      name: "Sarah Miller",
      age: 68,
      gender: "Female",
      roomNumber: "202",
      admissionDate: "2024-01-15",
      status: "Active",
      email: "sarah.m@example.com",
      phone: "555-0103",
      medicalConditions: ["Asthma", "Osteoporosis"],
      medications: ["Albuterol Inhaler", "Alendronate 70mg"],
      allergies: ["Peanuts", "Dust"],
      emergencyContact: { name: "David Miller", relation: "Spouse", phone: "555-0125" },
      insurance: { provider: "Blue Cross Blue Shield", id: "BC112233445" },
      vitals: { bp: "120/75", bloodSugar: "90 mg/dL", weight: 60, heartRate: 70 },
      visits: [
        { id: 1, visitDate: '01/10/2024', visitType: 'Specialist', providerName: 'Dr. Sarah Smith', chiefComplaint: 'Joint Pain', diagnosis: 'M81.0 - Osteoporosis', bp: '118/76', pulse: '70', temp: '98.8°F', weight: '135 lbs', notes: 'Scheduled for bone density scan.' }
      ],
      diagnosisProblems: [
        { id: 1, name: 'Asthma', onset: '2010', type: 'Intermittent', status: 'Active' },
        { id: 2, name: 'Osteoporosis', onset: '2022', type: 'Chronic', status: 'Active' }
      ],
      medicationsList: [
        { id: 1, name: 'Albuterol', dose: 'Inhaler', details: '2 Puffs PRN', status: 'Active' },
        { id: 2, name: 'Alendronate', dose: '70mg', details: '1 PO Weekly', status: 'Active' }
      ],
      billingRecords: [
        { id: 1, invoiceNumber: 'INV004', serviceDate: '03/10/2024', charges: '$1500.00', balance: '$0.00', status: 'Paid' }
      ],
      allergies: [
        { id: 1, name: 'Peanuts', reaction: 'Swelling', severity: 'Severe', status: 'Active' },
        { id: 2, name: 'Dust', reaction: 'Sneezing', severity: 'Mild', status: 'Active' }
      ]
    },
    {
      id: "RES004",
      name: "Robert Jones",
      age: 79,
      gender: "Male",
      roomNumber: "205",
      admissionDate: "2023-12-01",
      status: "Active",
      medicalConditions: ["Chronic Kidney Disease", "Heart Failure"],
      medications: ["Furosemide 40mg", "Enalapril 5mg"],
      allergies: ["Aspirin"],
      emergencyContact: { name: "Mary Jones", relation: "Spouse", phone: "555-0126" },
      insurance: { provider: "Cigna", id: "CI556677889" },
      vitals: { bp: "140/90", bloodSugar: "105 mg/dL", weight: 82, heartRate: 76 }
    },
    {
      id: "RES005",
      name: "Emily Davis",
      age: 75,
      gender: "Female",
      roomNumber: "301",
      admissionDate: "2024-02-10",
      status: "Active",
      medicalConditions: ["COPD", "Anxiety"],
      medications: ["Spiolto Respimat", "Sertraline 50mg"],
      allergies: ["Shellfish"],
      emergencyContact: { name: "John Davis", relation: "Son", phone: "555-0127" },
      insurance: { provider: "UnitedHealthcare", id: "UH998877665" },
      vitals: { bp: "130/82", bloodSugar: "98 mg/dL", weight: 58, heartRate: 74 }
    },
    {
      id: "RES006",
      name: "Michael Wilson",
      age: 82,
      gender: "Male",
      roomNumber: "303",
      admissionDate: "2023-09-20",
      status: "Discharged",
      medicalConditions: ["Post-Stroke Recovery"],
      medications: ["Clopidogrel 75mg", "Atorvastatin 40mg"],
      allergies: ["None"],
      emergencyContact: { name: "Linda Wilson", relation: "Spouse", phone: "555-0128" },
      insurance: { provider: "Humana", id: "HU443322110" },
      vitals: { bp: "125/78", bloodSugar: "94 mg/dL", weight: 75, heartRate: 65 }
    },
    { id: "RES007", name: "Barbara Taylor", age: 70, gender: "Female", roomNumber: "102", admissionDate: "2023-11-25", status: "Active" },
    { id: "RES008", name: "William Anderson", age: 88, gender: "Male", roomNumber: "105", admissionDate: "2023-07-14", status: "Active" },
    { id: "RES009", name: "Elizabeth Thomas", age: 74, gender: "Female", roomNumber: "201", admissionDate: "2024-03-05", status: "Under Observation" },
    { id: "RES010", name: "Richard Moore", age: 81, gender: "Male", roomNumber: "204", admissionDate: "2023-10-18", status: "Active" },
    { id: "RES011", name: "Dorothy Jackson", age: 77, gender: "Female", roomNumber: "302", admissionDate: "2024-01-22", status: "Active" },
    { id: "RES012", name: "Charles White", age: 84, gender: "Male", roomNumber: "305", admissionDate: "2023-08-30", status: "Active" },
    { id: "RES013", name: "Patricia Harris", age: 69, gender: "Female", roomNumber: "103", admissionDate: "2023-12-15", status: "Active" },
    { id: "RES014", name: "Christopher Martin", age: 73, gender: "Male", roomNumber: "203", admissionDate: "2024-02-28", status: "Active" },
    { id: "RES015", name: "Margaret Thompson", age: 90, gender: "Female", roomNumber: "304", admissionDate: "2023-06-10", status: "Active" },
    { id: "RES016", name: "Anthony Garcia", age: 71, gender: "Male", roomNumber: "106", admissionDate: "2023-11-02", status: "Discharged" },
    { id: "RES017", name: "Susan Martinez", age: 76, gender: "Female", roomNumber: "206", admissionDate: "2024-01-10", status: "Active" },
    { id: "RES018", name: "Ronald Robinson", age: 83, gender: "Male", roomNumber: "306", admissionDate: "2023-09-05", status: "Active" },
    { id: "RES019", name: "Betty Clark", age: 78, gender: "Female", roomNumber: "107", admissionDate: "2023-10-25", status: "Active" },
    { id: "RES020", name: "Thomas Rodriguez", age: 80, gender: "Male", roomNumber: "207", admissionDate: "2024-02-15", status: "Active" }
  ],
  staff: [
    { id: "STF001", name: "Dr. Amanda Roberts", role: "Doctor", shift: "Morning", department: "Clinical", contact: "amanda@care.com", phone: "555-1001", status: "Active", joinDate: "2022-01-15" },
    { id: "STF002", name: "Nurse Sarah Mitchell", role: "Nurse", shift: "Morning", department: "Nursing", contact: "sarah@care.com", phone: "555-1002", status: "Active", joinDate: "2022-03-20" },
    { id: "STF003", name: "Admin Subodh Pal", role: "Admin", shift: "General", department: "Administration", contact: "subodh@care.com", phone: "555-1003", status: "Active", joinDate: "2021-06-10" },
    { id: "STF004", name: "Dr. Lisa Chen", role: "Doctor", shift: "Afternoon", department: "Therapy", contact: "lisa@care.com", phone: "555-1004", status: "Inactive", joinDate: "2022-11-05" },
    { id: "STF005", name: "Caretaker Mike Ross", role: "Caretaker", shift: "Night", department: "Nursing", contact: "mike@care.com", phone: "555-1005", status: "Active", joinDate: "2023-01-12" },
    { id: "STF006", name: "Nurse Amy Torres", role: "Nurse", shift: "Afternoon", department: "Nursing", contact: "amy@care.com", phone: "555-1006", status: "Active", joinDate: "2023-04-18" },
    { id: "STF007", name: "Dr. James Williams", role: "Doctor", shift: "Morning", department: "Clinical", contact: "james@care.com", phone: "555-1007", status: "Active", joinDate: "2021-09-22" },
    { id: "STF008", name: "Caretaker Linda Park", role: "Caretaker", shift: "Evening", department: "Social", contact: "linda@care.com", phone: "555-1008", status: "Inactive", joinDate: "2023-07-30" },
    { id: "STF009", name: "Admin John Doe", role: "Admin", shift: "General", department: "Finance", contact: "john@care.com", phone: "555-1009", status: "Active", joinDate: "2022-08-14" },
    { id: "STF010", name: "Staff Emma Watson", role: "Nurse", shift: "Night", department: "Clinical", contact: "emma@care.com", phone: "555-1010", status: "Active", joinDate: "2023-02-25" }
  ],
  billing: [
    { invoiceId: "INV001", residentId: "RES001", date: "2024-03-01", totalAmount: 1250.00, paidAmount: 1250.00, status: "Paid", method: "Insurance" },
    { invoiceId: "INV002", residentId: "RES002", date: "2024-03-05", totalAmount: 2400.00, paidAmount: 1000.00, status: "Pending", method: "Card" },
    { invoiceId: "INV003", residentId: "RES004", date: "2024-02-20", totalAmount: 950.00, paidAmount: 0.00, status: "Overdue", method: "None" },
    { invoiceId: "INV004", residentId: "RES003", date: "2024-03-10", totalAmount: 1500.00, paidAmount: 1500.00, status: "Paid", method: "Cash" },
    { invoiceId: "INV005", residentId: "RES005", date: "2024-03-12", totalAmount: 3200.00, paidAmount: 3200.00, status: "Paid", method: "Insurance" },
    { invoiceId: "INV006", residentId: "RES001", date: "2024-02-01", totalAmount: 1100.00, paidAmount: 1100.00, status: "Paid", method: "Insurance" },
    { invoiceId: "INV007", residentId: "RES007", date: "2024-03-15", totalAmount: 1800.00, paidAmount: 0.00, status: "Pending", method: "None" },
    { invoiceId: "INV008", residentId: "RES008", date: "2024-03-18", totalAmount: 2100.00, paidAmount: 2100.00, status: "Paid", method: "Card" },
    { invoiceId: "INV009", residentId: "RES010", date: "2024-02-28", totalAmount: 1450.00, paidAmount: 0.00, status: "Overdue", method: "None" },
    { invoiceId: "INV010", residentId: "RES011", date: "2024-03-20", totalAmount: 2700.00, paidAmount: 1500.00, status: "Pending", method: "Insurance" }
  ],
  activityLog: [
    { id: 1, type: "Admission", message: "New resident Maria Johnson admitted to Room 101", user: "Admin Subodh", status: "Approved", time: "1 hr ago", timestamp: "2024-03-31T09:00:00Z" },
    { id: 2, type: "Payment", message: "Payment of $1250 received for Invoice INV001", user: "System", status: "Created", time: "2 hr ago", timestamp: "2024-03-31T10:15:00Z" },
    { id: 3, type: "Clinical", message: "Progress note updated for James Williams", user: "Dr. Roberts", status: "Updated", time: "3 hr ago", timestamp: "2024-03-31T11:30:00Z" },
    { id: 4, type: "Medication", message: "Medication reminder for Emily Davis (Room 301)", user: "Nurse Sarah", status: "Pending", time: "4 hr ago", timestamp: "2024-03-31T12:00:00Z" },
    { id: 5, type: "Compliance", message: "Missing Notes (3) detected", user: "System", status: "Missing Notes (3)", time: "5 hr ago", timestamp: "2024-03-31T14:00:00Z" }
  ],
  dashboardStats: {
    totalResidents: 128,
    occupancyRate: "85%",
    monthlyRevenue: "$45,200",
    pendingPayments: "$12,400",
    staffOnDuty: 8,
    recentAdmissions: 5
  },
  alerts: [
    { id: 1, type: "Medication", message: "Room 204 - Medication due at 3PM", severity: "high" },
    { id: 2, type: "Billing", message: "3 invoices are overdue for Richard Moore", severity: "medium" },
    { id: 3, type: "System", message: "Staff meeting at 4PM in Conference Hall", severity: "low" }
  ],
  ptoRequests: [
    { id: "PTO-001", staffName: "Nurse Sarah Mitchell", department: "Nursing", startDate: "2024-04-10", endDate: "2024-04-12", status: "Pending", reason: "Family Event" },
    { id: "PTO-002", staffName: "Dr. Lisa Chen", department: "Therapy", startDate: "2024-04-15", endDate: "2024-04-15", status: "Pending", reason: "Medical Appointment" },
    { id: "PTO-003", staffName: "Mike Ross", department: "Nursing", startDate: "2024-04-20", endDate: "2024-04-25", status: "Approved", reason: "Vacation" },
    { id: "PTO-004", staffName: "Emma Watson", department: "Clinical", startDate: "2024-04-05", endDate: "2024-04-06", status: "Pending", reason: "Personal" }
  ],
  sickLeave: [
    { id: "SICK-001", staffName: "Amy Torres", department: "Nursing", date: "2024-03-31", status: "Active", reason: "Flu" },
    { id: "SICK-002", staffName: "James Williams", department: "Clinical", date: "2024-03-31", status: "Active", reason: "Fever" },
    { id: "SICK-003", staffName: "Linda Park", department: "Social", date: "2024-03-30", status: "Recovered", reason: "Headache" }
  ],
  appointments: [
    { id: "APT-001", name: "Maria Johnson", doctor: "Dr. Amanda Roberts", date: "2024-03-31", time: "10:00 AM", phone: "555-0101", duration: "30 min", type: "General Check-up", reason: "Follow up on hypertension", status: "Scheduled" },
    { id: "APT-002", name: "James Williams", doctor: "Dr. Lisa Chen", date: "2024-04-01", time: "11:30 AM", phone: "555-0102", duration: "45 min", type: "Therapy Session", reason: "Physical therapy for arthritis", status: "In-Progress" },
    { id: "APT-003", name: "Sarah Miller", doctor: "Dr. James Williams", date: "2024-04-02", time: "02:00 PM", phone: "555-0103", duration: "1 hr", type: "Specialist Visit", reason: "Orthopedic consultation", status: "Scheduled" },
    { id: "APT-004", name: "Robert Jones", doctor: "Dr. Amanda Roberts", date: "2024-04-03", time: "03:45 PM", phone: "555-0104", duration: "30 min", type: "Diagnostic", reason: "Monthly blood work", status: "Scheduled" }
  ],
  mainStats: [
    { value: "124", label: "Total Resident Census", color: "blue" },
    { value: "88%", label: "Current Occupancy %", color: "orange" },
    { value: "24", label: "Pending Refills", color: "green" },
    { value: "96%", label: "Documentation Compliance", color: "sky" }
  ],
  activityLogs: [
    { category: "Admission", action: "New resident Maria Johnson admitted to Room 101", status: "Approved", userName: "Admin Subodh", statusColor: "emerald", time: "1 hr ago", date: "2024-03-31" },
    { category: "Payment", action: "Payment of $1250 received for Invoice INV001", status: "Created", userName: "System", statusColor: "blue", time: "2 hr ago", date: "2024-03-31" },
    { category: "Clinical", action: "Progress note updated for James Williams", status: "Updated", userName: "Dr. Roberts", statusColor: "sky", time: "3 hr ago", date: "2024-03-31" },
    { category: "Medication", action: "Medication reminder for Emily Davis (Room 301)", status: "Pending", userName: "Nurse Sarah", statusColor: "amber", time: "4 hr ago", date: "2024-03-31" },
    { category: "Compliance", action: "Missing Notes (3) detected", status: "Missing Notes (3)", userName: "System", statusColor: "red", time: "5 hr ago", date: "2024-03-31" }
  ],
  staffSchedule: [
    { count: 12, facility: "Main", color: "blue" },
    { count: 8, facility: "Care", color: "green" },
    { count: 4, facility: "Main", color: "orange" }
  ],
  specialNotes: [
    { category: "Nurse Alert", patient: "Maria Johnson", note: "High Fall Risk - Bed alarm activated", time: "10:30 AM", date: "2024-03-31", color: "red" },
    { category: "Care Note", patient: "James Williams", note: "Wound Care dressing change due at 2PM", time: "11:45 AM", date: "2024-03-31", color: "orange" },
    { category: "General", patient: "Sarah Miller", note: "Family visiting at 5PM in Lounge A", time: "01:15 PM", date: "2024-03-31", color: "teal" }
  ],
  staffShifts: [
    { id: "SFT-001", staffName: "Dr. Amanda Roberts", day: "Monday", date: "2024-03-31", time: "08:00 AM - 04:00 PM", shiftType: "Morning Shift", facility: "Main Facility" },
    { id: "SFT-002", staffName: "Nurse Sarah Mitchell", day: "Monday", date: "2024-03-31", time: "07:00 AM - 03:00 PM", shiftType: "Morning Shift", facility: "Care Facility" },
    { id: "SFT-003", staffName: "Dr. Lisa Chen", day: "Monday", date: "2024-03-31", time: "01:00 PM - 09:00 PM", shiftType: "Afternoon Shift", facility: "Main Facility" },
    { id: "SFT-004", staffName: "Mike Ross", day: "Monday", date: "2024-03-31", time: "11:00 PM - 07:00 AM", shiftType: "Night Shift", facility: "Care Facility" },
    { id: "SFT-005", staffName: "Amy Torres", day: "Tuesday", date: "2024-04-01", time: "03:00 PM - 11:00 PM", shiftType: "Evening Shift", facility: "Main Facility" }
  ]
};
