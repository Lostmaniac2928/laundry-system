const admin = (req, res, next) => {
  // We assume this runs *after* the 'protect' middleware,
  // so req.user should already be populated.
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed to the next function
  } else {
    res.status(403); // 403 Forbidden
    throw new Error('Not authorized as an admin');
  }
};

export { admin };