require('dotenv').config();

module.exports = {
  fhirBaseUrl: process.env.FHIR_BASE_URL || 'http://localhost:8080/fhir',
  apiVersion: process.env.API_VERSION || '4.0.1',
  timeout: process.env.TIMEOUT || 10000
}; 