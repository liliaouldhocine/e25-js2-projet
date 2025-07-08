import User from "../database/models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Inscription utilisateur
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return next(new ErrorResponse("Cet email est déjà utilisé", 400));
  }

  // Créer l'utilisateur
  const user = await User.create({
    fullName,
    email,
    password,
  });

  // Générer le token JWT
  const token = generateToken(user);

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
});

// @desc    Connexion utilisateur
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Vérifier que l'email et le mot de passe sont fournis
  if (!email || !password) {
    return next(
      new ErrorResponse("Veuillez fournir un email et un mot de passe", 400)
    );
  }

  // Vérifier que l'utilisateur existe
  const user = await User.findByEmail(email);
  if (!user) {
    return next(new ErrorResponse("Identifiants invalides", 401));
  }

  // Vérifier le mot de passe
  const isMatch = await User.comparePassword(password, user.password);
  if (!isMatch) {
    return next(new ErrorResponse("Identifiants invalides", 401));
  }

  // Générer le token JWT
  const token = generateToken(user);
  console.log(user.id, token);
  console.log(user);
  res.status(200).json({
    success: true,
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
});

// @desc    Récupérer l'utilisateur connecté
// @route   GET /api/auth/me
// @access  Privé
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
