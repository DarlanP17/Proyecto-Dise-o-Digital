import jwt from 'jsonwebtoken'

export const isAuth = (req, res, next) => {
  
  try {

    const { authorization } = req.headers
    
    const [_, token] = authorization.split(' ')

    const { id, rol } = jwt.verify(token, process.env.JWT_SECRET)

    req.user = { id, rol }

    next()

  }catch (error) {

    return    res.status(401).json({

      message: 'Debe iniciar sesion',

      data: error.message

    })
  }
};