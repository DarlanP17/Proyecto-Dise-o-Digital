import jwt from 'jsonwebtoken'

export const isAuth = (req, res, next) => {
  
  try {

    const { authorization } = req.headers
    
    const [_, token] = authorization.split(' ')

    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.headers.id = id

    next()

  }catch (error) {

    return    res.status(401).json({

      message: 'Debe iniciar sesion',

      data: error

    })
  }
};