const fhirClient = require('./fhirApi');

class PatientService {
  async create(patientData) {
    return await fhirClient.create('Patient', {
      resourceType: 'Patient',
      ...patientData
    });
  }

  async getById(id) {
    return await fhirClient.read('Patient', id);
  }

  async search(params) {
    return await fhirClient.search('Patient', params);
  }

  async update(id, patientData) {
    return await fhirClient.update('Patient', id, patientData);
  }

  async delete(id) {
    return await fhirClient.delete('Patient', id);
  }
}

module.exports = new PatientService(); 