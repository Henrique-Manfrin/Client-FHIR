class FHIRError extends Error {
  constructor(message, statusCode, operationType, resourceType) {
    super(message);
    this.name = 'FHIRError';
    this.statusCode = statusCode;
    this.operationType = operationType;
    this.resourceType = resourceType;
    this.timestamp = new Date().toISOString();
  }
}

const handleError = (error, operationType, resourceType) => {
  const statusCode = error.response?.status || 500;
  const message = error.response?.data?.issue?.[0]?.diagnostics || error.message;
  
  return new FHIRError(message, statusCode, operationType, resourceType);
};

module.exports = { FHIRError, handleError }; 