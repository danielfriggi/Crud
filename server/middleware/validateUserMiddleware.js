const validateUserData = require("../utils/validateUser");

function validateUserMiddleware(mode = "create") {
  return (req, res, next) => {
    const error = validateUserData(req.body, mode);
    if (error) return res.status(400).json({ error });
    next();
  };
}

module.exports = validateUserMiddleware;