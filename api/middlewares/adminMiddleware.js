import jwt from 'jsonwebtoken'

export const isAdmin = (req, res, next) => {
  
  try{
  
    const { authorization } = req.headers
      
    const [_, token] = authorization.split(' ')
  
    const { id, rol } = jwt.verify(token, process.env.JWT_SECRET)
  
    req.user = { id, rol }
  
    if(rol != 'admin'){

      throw new Error('Acceso no autorizado');

    }

    next()
  
  }catch (error) {
      
    if(error.message === 'Acceso no autorizado'){

      return    res.status(403).json({
  
        message: 'Se requieren permisos de administrador',
  
        data: error.message
  
      })
    }
    else{

      return    res.status(401).json({
  
        message: 'Debe iniciar sesion',
  
        data: error.message
  
      })
    }      
  }
};