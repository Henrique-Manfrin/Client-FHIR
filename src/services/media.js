const fhirClient = require('./fhirApi');
const fs = require('fs');
const path = require('path');

class MediaService {
  async create({ encounterId, audioPath, title, description }) {
    try {
      // Primeiro, buscar o encounter para obter a referência correta do paciente
      const encounter = await fhirClient.read('Encounter', encounterId);
      
      // Lê o arquivo de áudio e converte para base64
      const audioBuffer = fs.readFileSync(audioPath);
      const audioBase64 = audioBuffer.toString('base64');

      const mediaData = {
        resourceType: 'Media',
        status: 'completed',
        type: {
          coding: [{
            system: 'http://terminology.hl7.org/CodeSystem/media-type',
            code: 'audio',
            display: 'Audio'
          }]
        },
        content: {
          contentType: 'audio/wav',
          data: audioBase64
        },
        encounter: {
          reference: `Encounter/${encounterId}`
        },
        subject: encounter.subject, // Usa a referência do paciente do encounter
        created: new Date().toISOString(),
        title: title,
        description: description
      };

      return await fhirClient.create('Media', mediaData);
    } catch (error) {
      console.error('Erro ao criar Media:', error);
      throw error;
    }
  }

  async getById(id) {
    return await fhirClient.read('Media', id);
  }

  async search(params) {
    return await fhirClient.search('Media', params);
  }

  async delete(id) {
    return await fhirClient.delete('Media', id);
  }
}

module.exports = new MediaService(); 