//TEMPORAL: 
export const verifyToken = (req, res, next) => {
  
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    req.user = { 
      id: 'temp-user-id', 
      rol: 'cliente',
      email: 'usuario@temporal.com'
    };
    return next();
  }
  
  req.user = {
    id: 'temp-user-id',
    rol: 'cliente', 
    email: 'usuario@temporal.com'
  };
  
  console.log(' Middleware temporal - Usuario simulado:', req.user);
  next();
};