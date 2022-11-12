import { createContext, useState } from "react";

export const AutenticacaoContext = createContext({})

export function AutenticacaoProvider( {children} ) {

    const [usuario, setUsuario] = useState({})

    function login(email, senha) {
        if(email == '123' 
        && senha == 123) {
            setUsuario({
                nome: 'Caique',
                email: email,
                endereco: 'Av. Paulista',
                telefone: '(11) 99999-9999'
            })
            return 'ok'
        } else {
            return 'Email ou senha incorretos'
        }
    }
    return (
        <AutenticacaoContext.Provider
            value={{ usuario, login}}>
            { children }
        </AutenticacaoContext.Provider>
    )
}