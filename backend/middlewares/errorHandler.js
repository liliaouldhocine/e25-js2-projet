import ErrorResponse from "../utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log pour le développement
  console.log(err.stack.red);

  // Erreur Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Ressource introuvable avec l'id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Erreur Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Valeur dupliquée entrée";
    error = new ErrorResponse(message, 400);
  }

  // Erreur Mongoose validation
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Erreur serveur",
  });
};

export default errorHandler;
