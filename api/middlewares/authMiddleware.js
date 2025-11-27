import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  
  try {

    const { authorization } = req.headers
    
    const [_, token] = authorization.split(' ')

    const { id, rol } = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = { id, rol }

    next()

  }catch (error) {

    return    res.status(401).json({

      message: 'Debe iniciar sesion',

      data: error.message

    })
  }
};