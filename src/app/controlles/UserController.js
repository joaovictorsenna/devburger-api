import { v4 } from 'uuid'

import *as Yup from 'yup'

import User from '../models/User'

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password_hash: Yup.string().required().min(6),
            admin: Yup.boolean(),
        })

        try {
            schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: 'Falha na validação', messages: err.errors })
        }

        const { name, email, password_hash, admin } = req.body

        const userExists = await User.findOne({ where: { email } })
        if (userExists) {
            return res.status(400).json({ error: 'Usuário já existe' })
        }

        console.log(userExists)

        const user = await User.create({
            id: v4(),
            name,
            email,
            password_hash,
            admin,
        })

        return res.status(201).json({
            id: user.id,
            name,
            email,
        })
    }
}

export default new UserController()