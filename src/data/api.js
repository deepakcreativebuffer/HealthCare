// src/data/api.js
import { mockData } from './mockData';

const KEYS = {
  RESIDENTS: 'healthcare_residents',
  USERS: 'healthcare_users',
  LOGS: 'healthcare_logs'
};

const getStoredData = (key, defaultValue) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

const setStoredData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const simulateAPI = (data) => new Promise(resolve => setTimeout(() => resolve(data), 300));

export const api = {
  // Authentication
  login: async (email, password) => {
    // Admin check
    if (email === 'admin@care.com' && password === 'Admin@123') {
      const user = { id: 'admin', name: 'Admin User', role: 'admin', email: 'admin' };
      localStorage.setItem('user', JSON.stringify(user));
      return simulateAPI({ user });
    }

    // Resident check
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const residentFound = residents.find(r => r.email === email && r.password === password);

    if (residentFound) {
      const user = { 
        id: residentFound.id, 
        name: residentFound.name, 
        role: 'resident', 
        email: residentFound.email,
        photo: residentFound.photo
      };
      localStorage.setItem('user', JSON.stringify(user));
      return simulateAPI({ user });
    }

    throw new Error('Invalid email or password');
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  // Activities / Logs
  getActivity: () => {
    const logs = mockData.activityLogs.map(log => ({
      ...log,
      user: log.userName // Map userName to user for component compatibility
    }));
    return simulateAPI(logs);
  },

  getStaff: () => simulateAPI(mockData.staff),

  getStats: () => simulateAPI(mockData.mainStats),

  getDashboardStats: () => {
    const stats = [
      { title: "Total Residents", value: mockData.dashboardStats.totalResidents, icon: "Users", trend: "12%", trendUp: true },
      { title: "Occupancy Rate", value: mockData.dashboardStats.occupancyRate, icon: "UserCheck", trend: "5%", trendUp: true },
      { title: "Revenue", value: mockData.dashboardStats.monthlyRevenue, icon: "FileText", trend: "8%", trendUp: true },
      { title: "Pending", value: mockData.dashboardStats.pendingPayments, icon: "CalendarClock", trend: "3%", trendUp: false },
      { title: "Staff", value: mockData.dashboardStats.staffOnDuty, icon: "Stethoscope", trend: "2%", trendUp: true },
      { title: "Admissions", value: mockData.dashboardStats.recentAdmissions, icon: "CalendarDays", trend: "15%", trendUp: true },
    ];
    return simulateAPI(stats);
  },

  getBillingData: () => {
    const data = {
      metrics: [
        { label: "Total Claims", value: "105", icon: "FileText", color: "green" },
        { label: "Submitted Today", value: "14", icon: "FileUp", color: "blue" },
        { label: "Pending Review", value: "12", icon: "Clock", color: "orange" },
        { label: "Rejected", value: "3", icon: "AlertCircle", color: "red" },
        { label: "Revenue MTD", value: "$64k", icon: "DollarSign", color: "blue" },
        { label: "Avg Days", value: "18", icon: "Clock3", color: "green" },
      ],
      recentClaims: [
        { id: "CLM-00123", patient: "Maria Johnson", payer: "Medicare", amount: "$1,250.00", status: "Submitted" },
        { id: "CLM-00124", patient: "James Williams", payer: "BlueCross", amount: "$850.00", status: "Paid" },
        { id: "CLM-00125", patient: "Sarah Miller", payer: "Aetna", amount: "$2,100.00", status: "Denied" },
        { id: "CLM-00126", patient: "Robert Jones", payer: "Medicare", amount: "$1,500.00", status: "Pending" },
        { id: "CLM-00127", patient: "Emily Davis", payer: "UnitedHealth", amount: "$980.00", status: "Submitted" },
      ],
      submissionHistory: [
        { id: "CLM-00120", patient: "Barbara Taylor", payer: "Medicare", submitted: "2 hours ago", status: "Accepted" },
        { id: "CLM-00121", patient: "William Anderson", payer: "BlueCross", submitted: "5 hours ago", status: "Pending" },
        { id: "CLM-00122", patient: "Elizabeth Thomas", payer: "Aetna", submitted: "1 day ago", status: "Rejected" },
      ],
      revenueTrend: {
        totalRevenue: "$152K",
        outstanding: "$24.3K",
      },
      statusBreakdown: [
        { label: "Paid", percentage: 65, color: "#10B981" },
        { label: "Pending", percentage: 15, color: "#F59E0B" },
        { label: "Denied", percentage: 12, color: "#EF4444" },
        { label: "Rejected", percentage: 8, color: "#94A3B8" },
      ],
      provider: {
        name: "Subodh Pal",
        npi: "1234567890",
        address: "742 Evergreen Terrace, Springfield",
        phone: "(555) 123-4567",
      },
      locations: [
        { name: "Main Facility", address: "123 Healthcare Blvd", npi: "9876543210", pos: "11" },
        { name: "West Wing Clinic", address: "456 Wellness Way", npi: "8765432109", pos: "11" },
      ],
      encounter: {
        patient: "Maria Johnson",
        provider: "Dr. Emily Roberts",
        facility: "Main Facility",
        dos: "03/28/2024",
        diagnoses: [
          { code: "I10", description: "Essential hypertension" },
          { code: "E11.9", description: "Type 2 diabetes mellitus" },
        ],
        procedures: [
          { code: "99214", qty: 1, amount: "$150.00" },
          { code: "80053", qty: 1, amount: "$45.00" },
        ],
      },
    };
    return simulateAPI(data);
  },

  updateClaimStatus: (claimId, status) => {
    return simulateAPI({ success: true });
  },

  getPTO: () => simulateAPI(mockData.ptoRequests),

  getSickLeave: () => simulateAPI(mockData.sickLeave),

  getAppointments: () => simulateAPI(mockData.appointments),

  addActivity: (action, category, user = 'Admin') => {
    const logs = getStoredData(KEYS.LOGS, mockData.activityLogs);
    const newLog = { 
      action, 
      category, 
      userName: user, 
      time: 'Just now', 
      status: 'Created', 
      date: new Date().toISOString().split('T')[0] 
    };
    logs.unshift(newLog);
    setStoredData(KEYS.LOGS, logs);
    return simulateAPI(newLog);
  },

  // Residents
  getResidents: () => simulateAPI(getStoredData(KEYS.RESIDENTS, mockData.residents)),

  getResidentData: (id) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const resident = residents.find(r => r.id === id) || residents[0];
    
    // Seeded randomness helper based on ID
    const getSeed = (str) => {
      let seed = 0;
      if (!str) return 0;
      for (let i = 0; i < str.length; i++) seed += str.charCodeAt(i);
      return seed;
    };
    const seed = getSeed(resident.id);
    
    // Ensure all shared base fields exist
    if (!resident.mrn) resident.mrn = `MRN-${10000 + (seed % 90000)}-X`;
    if (!resident.dob) resident.dob = `03/${15 + (seed % 10)}/19${50 + (seed % 40)}`;
    if (!resident.gender) resident.gender = seed % 2 === 0 ? "Female" : "Male";
    if (!resident.status) resident.status = "Active";
    if (!resident.provider) resident.provider = seed % 2 === 0 ? "Dr. Emily Roberts" : "Dr. John Chen";
    if (!resident.condition) resident.condition = seed % 2 === 0 ? "Hypertension, Type 2 Diabetes" : "Dementia, Arthritis";
    if (!resident.room) resident.room = `Room ${100 + (seed % 500)}-${seed % 2 === 0 ? 'A' : 'B'}`;
    if (!resident.phone) resident.phone = `(555) ${100 + (seed % 900)}-${1000 + (seed % 9000)}`;
    if (!resident.address) resident.address = `${100 + (seed % 900)} Healthcare Blvd, Springfield, IL`;
    if (!resident.emergencyContactName) resident.emergencyContactName = seed % 2 === 0 ? "Mary Smith" : "Robert Wilson";
    if (!resident.emergencyContactPhone) resident.emergencyContactPhone = `(555) ${100 + (seed % 900)}-${1000 + (seed % 9000)}`;
    if (!resident.clinicalAccess) resident.clinicalAccess = seed % 3 === 0 ? "Full Assist, Interpreter Req" : seed % 3 === 1 ? "Independent, English" : "Partial Assist";
    if (!resident.levelOfCare) resident.levelOfCare = seed % 3 === 0 ? "Skilled Care" : seed % 3 === 1 ? "Assisted Living" : "Memory Care";
    if (!resident.admissionDate) resident.admissionDate = `01/${10 + (seed % 15)}/2022`;
    if (!resident.patientGoal) resident.patientGoal = seed % 2 === 0 ? "Maintain current mobility levels." : "Improve cognitive engagement through activities.";
    
    if (!resident.insurance) {
      resident.insurance = { 
        provider: seed % 2 === 0 ? "Medicare" : "BlueCross BlueShield", 
        plan: "Plan G", 
        subscriber: resident.name, 
        groupId: `HC-${100000 + (seed % 900000)}` 
      };
    }
    
    if (!resident.allergy) resident.allergy = seed % 2 === 0 ? "Penicillin, Peanuts" : "Sulfa Drugs, Shellfish";
    if (!resident.allergies || resident.allergies.length === 0) {
       resident.allergies = [
         { id: 1, name: seed % 2 === 0 ? 'Penicillin' : 'Sulfa Drugs', reaction: seed % 2 === 0 ? 'Anaphylaxis' : 'Hives', severity: 'Severe', color: 'red' },
         { id: 2, name: seed % 2 === 0 ? 'Peanuts' : 'Shellfish', reaction: 'Skin Rash', severity: 'Moderate', color: 'orange' }
       ];
    }

    // 1. Visit History (Admin and Resident usage)
    if (!resident.visits || resident.visits.length === 0) {
      resident.visits = [
        { 
          id: 1, 
          visitDate: seed % 2 === 0 ? '11/20/2022' : '01/15/2023', 
          visitType: seed % 2 === 0 ? 'Office Visit' : 'Follow-up', 
          providerName: resident.provider, 
          chiefComplaint: seed % 2 === 0 ? 'Chest Pain' : 'Joint Stiffness', 
          diagnosis: seed % 2 === 0 ? 'I20.9 - Angina Pectoris' : 'M19.9 - Osteoarthritis', 
          procedure: seed % 2 === 0 ? '93000 - ECG' : '99214 - Office Level 4', 
          bp: seed % 2 === 0 ? '120/80' : '135/85', 
          pulse: seed % 2 === 0 ? '72' : '68', 
          temp: '98.6°F', 
          weight: seed % 2 === 0 ? '185 lbs' : '172 lbs', 
          notes: seed % 2 === 0 ? 'Patient presented with chest pain. ECG shows minor changes.' : 'Patient reports morning stiffness in knees.',
          historyOfPresentIllness: seed % 2 === 0 ? 'Chronic condition management.' : 'Acute onset of symptoms in recent days.',
          reviewOfSystems: 'Assessments indicate stable condition within normal limits for age.'
        }
      ];
    }

    // 2. Billing Records
    if (!resident.billingRecords || resident.billingRecords.length === 0) {
      resident.billingRecords = [
        { id: 1, invoiceNumber: `INV-${100 + (seed % 900)}`, serviceDate: '03/01/2024', charges: '$300.00', balance: '$300.00', status: 'Pending' }
      ];
    }
    
    if (!resident.billing) {
       resident.billing = {
          totalBalance: 350.00,
          records: [
             { id: `INV-${100 + (seed % 900)}`, date: '2024-03-01', amount: 300.00, status: 'PENDING' },
             { id: `INV-${100 + (seed % 890)}`, date: '2024-02-15', amount: 50.00, status: 'PAID' }
          ]
       };
    }

    // 3. Medical History / Diagnosis Problems
    if (!resident.medicalHistory || resident.medicalHistory.length === 0) {
      resident.medicalHistory = seed % 2 === 0 ? [
        { id: 1, Condition: 'Atrial fibrillation', 'Diagnosis Date': '2018', Status: 'Chronic' }
      ] : [
        { id: 1, Condition: 'Dementia', 'Diagnosis Date': '2021', Status: 'Chronic' }
      ];
    }
    
    if (!resident.diagnosisProblems || resident.diagnosisProblems.length === 0) {
      resident.diagnosisProblems = resident.medicalHistory.map(m => ({
        id: m.id,
        name: m.Condition,
        onset: m['Diagnosis Date'],
        status: m.Status,
        date: m['Diagnosis Date'], // for resident dashboard mapping
        notes: "Historical record."
      }));
    }

    // 3a. Surgical History (Shared)
    if (!resident.surgicalHistory || resident.surgicalHistory.length === 0) {
       resident.surgicalHistory = [
          { id: 1, name: seed % 2 === 0 ? "Appendectomy" : "Knee Arthroscopy", date: seed % 2 === 0 ? "05/12/2010" : "09/20/2015", location: "Springfield Gen.", notes: "No complications." },
          { id: 2, name: seed % 2 === 0 ? "Cataract Surgery" : "Hernia Repair", date: seed % 2 === 0 ? "11/02/2019" : "03/15/2018", location: "Ophthal Center", notes: "Routine procedure." }
       ];
    }

    // 4. Lab Results
    if (!resident.labResults || resident.labResults.length === 0) {
      resident.labResults = [
        { id: 1, name: 'HbA1c', value: seed % 2 === 0 ? '6.4%' : '6.8%', status: 'Stable', date: '11/15/2022', range: '4.0-5.6%', orderedDate: '11/15/2022' },
        { id: 2, name: 'LDL Cholesterol', value: seed % 2 === 0 ? '135 mg/dL' : '142 mg/dL', status: 'High', date: '11/15/2022', range: '<100 mg/dL', orderedDate: '11/15/2022' }
      ];
    }

    // 5. Documents / Recent Documents
    if (!resident.recentDocuments || resident.recentDocuments.length === 0) {
      resident.recentDocuments = [
        { name: "Discharge Summary", status: "Signed", date: "11/18/2022", type: "PDF" },
        { name: "EKG Waveform Trace", status: "Defined", date: "11/20/2022", type: "Image" }
      ];
    }

    // 6. Care Plan & Social History
    if (!resident.carePlan || resident.carePlan.length === 0) {
      resident.carePlan = [
        { title: "Cardiac Output Management", instruction: "Monitor BP daily. Report weight gain > 2 lbs/day.", icon: "Activity", priority: "High" },
        { title: "Mobility Assist", instruction: "Use walker for all ambulation.", icon: "UserCheck", priority: "Medium" }
      ];
    }

    if (!resident.socialHistory || (typeof resident.socialHistory === 'object' && Object.keys(resident.socialHistory).length === 0)) {
       resident.socialHistory = {
          tobacco: seed % 2 === 0 ? "Former Smoker (Quit 2012)" : "Never Smoked",
          alcohol: seed % 2 === 0 ? "Occasional" : "None",
          diet: seed % 2 === 0 ? "Low Sodium" : "Regular",
          exercise: "Light Walk",
          sleep: "7-8 hours/night",
          living: "Assisted Living",
          occupation: "Retired",
          pets: "None"
       };
    }

    // 7. Vitals Context
    if (!resident.vitalsHistory) {
       const latestVisit = resident.visits[0] || {};
       resident.vitalsHistory = {
          bp: latestVisit.bp || (seed % 2 === 0 ? "120/80" : "135/85"),
          hr: latestVisit.pulse || (seed % 2 === 0 ? "72" : "68"),
          temp: latestVisit.temp || "98.6°F",
          o2: "98%",
          weight: latestVisit.weight || (seed % 2 === 0 ? "185 lbs" : "172 lbs"),
          height: "5'10\"",
          bmi: "26.5"
       };
    }

    // 8. Care Team & Pharmacy
    if (!resident.careTeam || resident.careTeam.length === 0) {
       resident.careTeam = [
          { name: "Dr. Emily Roberts", role: "CARDIOLOGIST", phone: "(555) 444-3322", email: "e.roberts@care.com", specialty: 'Cardiology' },
          { name: "Dr. John Chen", role: "PRIMARY CARE", phone: "(555) 111-2233", email: "j.chen@care.com", specialty: 'Primary Care' }
       ];
    }

    if (!resident.pharmacy) {
       resident.pharmacy = {
          name: "CVS Pharmacy #1234",
          address: "123 Main St, Springfield IL",
          phone: "(555) 987-6543",
          hours: "Open 24 Hours"
       };
    }

    // 9. Specific Admin Page Sections (Audit, Safety, Mobility, Comm)
    if (!resident.communication || resident.communication.length === 0) {
      resident.communication = { language: 'English', interpreter: 'Not Required', hearing: 'Normal', vision: 'Normal' };
    }
    if (!resident.mobility || resident.mobility.length === 0) {
      resident.mobility = [{ assist: seed % 2 === 0 ? 'One-Person' : 'Independent', devices: 'Walker', fallRisk: seed % 2 === 0 ? 'High Risk' : 'Low Risk', status: 'Active' }];
    }
    if (!resident.safety || resident.safety.length === 0) {
      resident.safety = { security: 'Wander Guard Active', accessLevel: 'Standard Access' };
    }
    if (!resident.auditTrail || resident.auditTrail.length === 0) {
      resident.auditTrail = [
        { date: '11/20/2022', text: 'EHR: Updated Diagnosis', user: 'Dr. Roberts', color: 'bg-blue-500' },
        { date: '11/15/2022', text: 'Insurance: Verified Plan', user: 'Admin', color: 'bg-emerald-500' }
      ];
    }
    if (!resident.dischargeSummary) {
      resident.dischargeSummary = { status: 'Stable / Discharged', instruction: 'Patient advised to maintain light activity. Specialist follow-up required within 2 weeks.' };
    }
    if (!resident.advanceDirectives) {
      resident.advanceDirectives = { dnrStatus: 'Active (DNR)', dniStatus: 'Active (DNI)', date: '02/2024' };
    }
    if (!resident.immunizations || resident.immunizations.length === 0) {
      resident.immunizations = [
        { name: 'Influenza (Flu)', date: '10/12/2023', status: 'Up-to-date', provider: 'Monterey Clinic' },
        { name: 'Pneumococcal', date: '05/20/2022', status: 'Up-to-date', provider: 'General Hospital' }
      ];
    }
    if (!resident.activities || resident.activities.length === 0) {
      resident.activities = [
        { id: 1, type: 'Medication', name: 'Lisinopril 20mg Admin.', date: '08:00 AM Today', status: 'Completed' },
        { id: 2, type: 'Vitals', name: 'Morning Vitals Check', date: '07:30 AM Today', status: 'Completed' }
      ];
    }
    if (!resident.medicationsList || resident.medicationsList.length === 0) {
      resident.medicationsList = [
        { id: 1, name: "Lisinopril", dose: "10mg", instructions: "1 Tablet PO DAILY", type: "Antihypertensive" },
        { id: 2, name: "Atorvastatin", dose: "40mg", instructions: "1 Tablet PO AT BEDTIME", type: "Statin" }
      ];
    }
    if (!resident.faxLogs || resident.faxLogs.length === 0) {
       resident.faxLogs = [
          { name: "Inbound: Radiology Report", date: "11/20/2022", from: "City Radiology", status: "Success" },
          { name: "Outbound: Referral", date: "11/18/2022", to: "Dr. Roberts", status: "Sent" }
       ];
    }

    return simulateAPI(resident);
  },

  updateResident: (residentId, updates) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const updated = residents.map(r => 
      r.id === residentId ? { ...r, ...updates } : r
    );
    setStoredData(KEYS.RESIDENTS, updated);
    return simulateAPI({ success: true });
  },

  updateResidentSubData: (residentId, key, itemId, updates) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const updated = residents.map(r => {
      if (r.id === residentId) {
        const subData = Array.isArray(r[key]) ? r[key].map(item => item.id === itemId ? { ...item, ...updates } : item) : { ...r[key], ...updates };
        return { ...r, [key]: subData };
      }
      return r;
    });
    setStoredData(KEYS.RESIDENTS, updated);
    return simulateAPI({ success: true });
  },

  addResidentSubData: (residentId, key, data) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const updated = residents.map(r => {
      if (r.id === residentId) {
        const subData = Array.isArray(r[key]) ? [...r[key], { ...data, id: Date.now() }] : { ...r[key], ...data };
        return { ...r, [key]: subData };
      }
      return r;
    });
    setStoredData(KEYS.RESIDENTS, updated);
    return simulateAPI({ success: true });
  },

  deleteResidentSubData: (residentId, key, itemId) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const updated = residents.map(r => {
      if (r.id === residentId && Array.isArray(r[key])) {
        const subData = r[key].filter(item => item.id !== itemId);
        return { ...r, [key]: subData };
      }
      return r;
    });
    setStoredData(KEYS.RESIDENTS, updated);
    return simulateAPI({ success: true });
  },

  addResident: (resident) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const newResident = { ...resident, id: `RES${Date.now()}` };
    residents.push(newResident);
    setStoredData(KEYS.RESIDENTS, residents);
    return simulateAPI(newResident);
  },

  deleteResident: (id) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const updated = residents.filter(r => r.id !== id);
    setStoredData(KEYS.RESIDENTS, updated);
    return simulateAPI({ success: true });
  }
};
