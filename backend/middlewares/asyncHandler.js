// Middleware pour wrapper les contrôleurs async/await et gérer les erreurs
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
export default asyncHandler;
