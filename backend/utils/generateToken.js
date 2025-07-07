import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
      fullName: user.fullName, // Ajout du nom complet
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

export default generateToken;
