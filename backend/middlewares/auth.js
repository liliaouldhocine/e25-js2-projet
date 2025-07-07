import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../database/models/User.js";

// Protéger les routes
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Non autorisé à accéder à cette route", 401));
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse("Non autorisé à accéder à cette route", 401));
  }
};

// middlewares/auth.js
export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Vérifie que l'utilisateur est bien attaché à la requête (via protect)
    if (!req.user?.role) {
      return res.status(401).json({
        error: "Vous devez être connecté pour accéder à cette ressource",
      });
    }

    // 2. Vérifie que le rôle de l'utilisateur est autorisé
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Accès refusé. Rôle requis: ${allowedRoles.join(", ")}`,
      });
    }

    // 3. Si tout est OK, passe à la route suivante
    next();
  };
};
