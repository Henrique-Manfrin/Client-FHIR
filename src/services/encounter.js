const fhirClient = require('./fhirApi');

class EncounterService {
  async create({ practitionerId, patientId, date, type = 'ambulatory' }) {
    const encounterData = {
      resourceType: 'Encounter',
      status: 'finished',
      class: {
        system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
        code: 'AMB',
        display: 'ambulatory'
      },
      subject: {
        reference: `Patient/${patientId}`
      },
      participant: [
        {
          individual: {
            reference: `Practitioner/${practitionerId}`
          }
        }
      ],
      period: {
        start: date.toISOString(),
        end: date.toISOString()
      }
    };

    return await fhirClient.create('Encounter', encounterData);
  }

  async getById(id) {
    return await fhirClient.read('Encounter', id);
  }

  async search(params) {
    return await fhirClient.search('Encounter', params);
  }

  async update(id, encounterData) {
    return await fhirClient.update('Encounter', id, encounterData);
  }

  async delete(id) {
    return await fhirClient.delete('Encounter', id);
  }
}

module.exports = new EncounterService(); 