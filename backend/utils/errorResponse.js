export default class ErrorResponse extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details; // Pour des erreurs de validation détaillées
    this.isOperational = true; // Pour distinguer les erreurs opérationnelles des bugs

    Error.captureStackTrace(this, this.constructor);
  }

  // Méthode statique pour les erreurs de validation
  static validationError(details) {
    return new ErrorResponse("Validation failed", 400, details);
  }
}
