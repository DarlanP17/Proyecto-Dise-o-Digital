import jwt from 'jsonwebtoken'
import argon2 from "argon2"
import { UsuarioModel } from '../models/usuario.js'

export const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    
    try {
        // ✅ VERIFICAR QUE EXISTEN EMAIL Y PASSWORD
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email y contraseña son requeridos'
            })
        }

        const usuario = await UsuarioModel.getUserbyEmail(email)
        
        // ✅ VERIFICAR QUE EL USUARIO EXISTE
        if (!usuario) {
            return res.status(401).json({
                message: 'Usuario o contraseña incorrecta'
            })
        }

        const verify = await argon2.verify(usuario.password, password)

        if (verify) {
            const token = jwt.sign({
                id: usuario.id, 
                rol: usuario.rol
            }, process.env.JWT_SECRET, { 
                expiresIn: '60m' 
            })
            
            return res.status(200).json({
                message: 'Sesion iniciada',
                data: token
            })
        }
        else {
            return res.status(401).json({
                message: 'Usuario o contraseña incorrecta'
            })
        }

    }
    catch(error) {
        console.error('Error en login:', error)
        return res.status(500).json({
            message: 'Error de servicio',
            data: error.message
        })
    }
}

export const newUser = async (req, res) => {
    const user = req.body
    try {
        // ✅ HASH DE LA CONTRASEÑA ANTES DE GUARDAR
        const hashedPassword = await argon2.hash(user.password)
        user.password = hashedPassword
        
        await UsuarioModel.insertUser(user)
        
        return res.status(201).json({
            message: 'Usuario creado con exito',
            data: { nombre: user.nombre, email: user.email }
        })
    }
    catch(error) {
        console.error('Error en registro:', error)
        return res.status(500).json({
            message: 'Error al registrar el usuario',
            data: error.message
        })
    }
}