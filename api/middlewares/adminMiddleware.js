//TEMPORAL:
export const isAdmin = (req, res, next) => {
  
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Acceso no autorizado'
    });
  }
  req.user.rol = 'admin';
  if (req.user.rol !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Se requieren permisos de administrador'
    });
  }
  
  console.log('Middleware temporal - Acceso admin permitido');
  next();
};

