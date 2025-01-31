const fhirClient = require('./fhirApi');

class PractitionerService {
  async create(practitionerData) {
    return await fhirClient.create('Practitioner', {
      resourceType: 'Practitioner',
      ...practitionerData
    });
  }

  async getById(id) {
    return await fhirClient.read('Practitioner', id);
  }

  async search(params) {
    return await fhirClient.search('Practitioner', params);
  }

  async update(id, practitionerData) {
    return await fhirClient.update('Practitioner', id, practitionerData);
  }

  async delete(id) {
    return await fhirClient.delete('Practitioner', id);
  }
}

module.exports = new PractitionerService(); 