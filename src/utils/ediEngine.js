/**
 * ANSI X12 837P Claims Engine
 * Implements Phase 1: Data Extraction, Assembly, Validation, and Serialization
 */

export const ediEngine = {
  /**
   * Layer 1 & 2: Data Extraction & Claim Assembly
   * Assembles internal CMS-1500 logical model from encounter data
   */
  assembleClaim: (encounter, provider, patient) => {
    return {
      header: {
        controlNumber: Math.floor(Math.random() * 1000000).toString().padStart(9, '0'),
        timestamp: new Date().toISOString(),
      },
      billingProvider: {
        name: provider.name,
        npi: provider.npi,
        taxId: 'XX-XXXXXXX',
        address: provider.address,
      },
      subscriber: {
        name: patient.name,
        id: 'MEM-987654',
        payer: patient.payer,
      },
      claim: {
        dos: encounter.dos,
        pos: '11',
        diagnosisCodes: encounter.diagnoses.map(d => d.code),
        totalCharge: encounter.procedures.reduce((sum, p) => sum + parseFloat(p.amount.replace('$', '')), 0),
        lines: encounter.procedures.map(p => ({
          cpt: p.code,
          units: p.qty,
          charge: p.amount,
          dxPointer: '1'
        }))
      }
    };
  },

  /**
   * Layer 3: Validation & Rule Engine
   */
  validateClaim: (claimModel) => {
    const errors = [];
    
    // NPI Validation
    if (!claimModel.billingProvider.npi || claimModel.billingProvider.npi.length < 10) {
      errors.push({ code: 'E01', message: 'Invalid or Missing Billing Provider NPI' });
    }

    // ICD-10 Compatibility
    if (claimModel.claim.diagnosisCodes.length === 0) {
      errors.push({ code: 'E02', message: 'At least one ICD-10 diagnosis code required' });
    }

    // Service Line Checks
    claimModel.claim.lines.forEach((line, index) => {
      if (!line.cpt) errors.push({ code: 'E03', message: `Line ${index + 1}: Missing CPT code` });
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Layer 4: EDI Serialization Layer (837P)
   * Generates ANSI X12 compliant segments
   */
  serialize837P: (model) => {
    const segments = [];
    const ctrl = model.header.controlNumber;

    // ISA - Interchange Control Header
    segments.push(`ISA*00*          *00*          *ZZ*SUBMITTERID    *ZZ*RECEIVERID     *240101*1200*^*00501*${ctrl}*0*T*:~`);
    
    // GS - Functional Group Header
    segments.push(`GS*HC*SUBMITTER*RECEIVER*20240101*1200*${ctrl}*X*005010X222A1~`);

    // ST - Transaction Set Header
    segments.push(`ST*837*0001*005010X222A1~`);

    // BHT - Beginning of Hierarchical Transaction
    segments.push(`BHT*0019*00*${ctrl}*20240101*1200*CH~`);

    // 1000A - Submitter Name
    segments.push(`NM1*41*2*HEALTHCARE ADMIN*****46*SUBMITTERID~`);

    // 1000B - Receiver Name
    segments.push(`NM1*40*2*CHANGE HEALTHCARE*****46*CHID~`);

    // 2000A - Billing Provider Hierarchical Level
    segments.push(`HL*1**20*1~`);
    segments.push(`NM1*85*2*${model.billingProvider.name.toUpperCase()}*****XX*${model.billingProvider.npi}~`);
    segments.push(`N3*${model.billingProvider.address.split(',')[0]}~`);
    segments.push(`N4*AUSTIN*TX*78701~`);

    // 2000B - Subscriber Hierarchical Level
    segments.push(`HL*2*1*22*0~`);
    segments.push(`SBR*P*18*******CI~`);
    segments.push(`NM1*IL*1*${model.subscriber.name.split(' ')[1]}*${model.subscriber.name.split(' ')[0]}****MI*${model.subscriber.id}~`);
    
    // 2300 - Claim Information
    segments.push(`CLM*${model.header.controlNumber}*${model.claim.totalCharge}***11:B:1*Y*A*Y*Y~`);
    model.claim.diagnosisCodes.forEach((code, i) => {
      segments.push(`HI*BK:${code.replace('.', '')}~`);
    });

    // 2400 - Service Lines
    model.claim.lines.forEach((line, i) => {
      segments.push(`LX*${i + 1}~`);
      segments.push(`SV1*HC:${line.cpt}*${line.charge.replace('$', '')}*UN*${line.units}***1~`);
      segments.push(`DTP*472*D8*20240101~`);
    });

    // SE, GE, IEA - Footers
    segments.push(`SE*${segments.length - 2}*0001~`);
    segments.push(`GE*1*${ctrl}~`);
    segments.push(`IEA*1*${ctrl}~`);

    return segments.join('\n');
  }
};
