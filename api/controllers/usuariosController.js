import jwt from 'jsonwebtoken'
import argon2 from "argon2"
import { Usuario } from '../models/usuario.js'

export const login = async (req, res) => {
    const email=req.body.email
    const password=req.body.password
    try{
        
        const usuario = await Usuario.getUserbyEmail(email)
        const verify = await argon2.verify(usuario.password,password)

        if(verify){
            const token = jwt.sign({
                id:usuario.id, rol:usuario.rol},
                process.env.JWT_SECRET_KEY, 
                { expiresIn:'60m' 
            })
            return res.status(200).json({
                message:'Sesion iniciada',
                data:token
            })
        }
        else{
            return res.status(401).json({
                message:'Usuario o contraseña incorrecta',
            })
        }

    }
    catch(error){
        return res.status(500).json({
                message:'Error de servicio',
                data:error
            })
    }
    

}
