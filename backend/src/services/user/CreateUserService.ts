import prismaClient from '../../prisma'
import {  hash } from 'bcryptjs'

interface UserRequest {
    name: string
    email: string
    password: string
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        // Temos que verificar se o email foi enviado
        if (!email) {
            throw new Error("Email incorrect")
        }

        // Verificar se o email enviado já está cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
           where: {
            email: email
           } 
        })

        if (userAlreadyExists) {
            throw new Error("User already exists")
        }

        const passwordHash = await hash(password, 8) // criptografia da senha

        // Cadastro de usuário
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },
            select: {
                id: true,
                email: true,
                name: true,
            }
        })
        return user
    }
}

export { CreateUserService }