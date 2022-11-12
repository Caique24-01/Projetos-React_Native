const { createContext } = require("react");

export const GlobalContext = createContext({})

export function InfoProvider({ children }) {
    const valor = 2;
    return (
        <GlobalContext.Provider
            value={{ valor }}
        >
            {children}
        </GlobalContext.Provider>
    )
}