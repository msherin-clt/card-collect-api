// middleware for admin only routes
//this is mainly a placeholder

const protect = (req, res, next) => {
  // TODO: Logic to verify JWT token
  //If valid, attach user to req (e.g., req.user = decodedToken)
  //If not valid, res.status(401).json({ message: 'Not authorized' })
  console.log('Protecting route...');
  next();
};

// 'isAdmin' checks the user's role
const isAdmin = (req, res, next) => {
  // This assumes 'protect' middleware ran first and attached req.user
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

export { protect, isAdmin };