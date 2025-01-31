const axios = require('axios');
const config = require('../config/config');

class FHIRClient {
  constructor() {
    this.baseURL = config.fhirBaseUrl;
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async create(resourceType, resource) {
    try {
      const response = await this.client.post(`/${resourceType}`, resource);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Erro ao criar ${resourceType}`);
    }
  }

  async read(resourceType, id) {
    try {
      const response = await this.client.get(`/${resourceType}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Erro ao ler ${resourceType}`);
    }
  }

  async update(resourceType, id, resource) {
    try {
      const response = await this.client.put(`/${resourceType}/${id}`, resource);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Erro ao atualizar ${resourceType}`);
    }
  }

  async delete(resourceType, id) {
    try {
      const response = await this.client.delete(`/${resourceType}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Erro ao deletar ${resourceType}`);
    }
  }

  async search(resourceType, params) {
    try {
      const response = await this.client.get(`/${resourceType}`, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Erro ao buscar ${resourceType}`);
    }
  }

  handleError(error, message) {
    const errorDetails = error.response?.data || error.message;
    console.error(message, errorDetails);
    return new Error(`${message}: ${errorDetails}`);
  }
}

module.exports = new FHIRClient(); 