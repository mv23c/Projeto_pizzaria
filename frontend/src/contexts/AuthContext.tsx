import { createContext, ReactNode, useState } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

type AuthContextData = {
    user: UserProps; // As informações do usuário
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>; // Método de login
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>; // Método de cadastro
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    } catch {
        console.log('erro ao deslogar');
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            });
            //console.log(response.data);

            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // Expira em 1 mês
                path: "/" // Quais caminhos terão acesso ao cookie
            });

            setUser({
                id,
                name,
                email,
            });

            // Passar para as próximas requisições o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            // Redirecionar o usuário (user) para '/dashboard'
            Router.push('/dashboard');

        }catch(err) {
            console.log("Erro ao acessar ", err);
        }
    }

    async function signUp({ name, email, password }: SignUpProps) {
        try{
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            console.log('Cadastrado com sucesso!');

            Router.push('/');

        }catch(err){
            console.log("erro ao cadastrar ", err)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}