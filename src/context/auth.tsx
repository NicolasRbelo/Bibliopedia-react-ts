import { createContext, useEffect, useState, type ReactNode } from 'react'

// Define a interface para o valor do contexto
interface AuthContextType {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

// Crie o contexto com valor padrão
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Defina a interface para as props do AuthProvider, incluindo o children tipado como ReactNode
interface AuthProviderProps {
  children: ReactNode // Aqui está a tipagem do children
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState()
  useEffect(() => {
    const userToken = localStorage.getItem('user_token')
    const userStorage = localStorage.getItem('users_db')

    if (userToken && userStorage) {
      const hasUser = JSON.parse(userStorage)?.filter(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (user: { email: any }) => user.email === JSON.parse(userToken).email
      )
      if (hasUser) setUser(hasUser[0])
    }
  }, [])

  const login = (email, password) => {
    setIsAuthenticated(true)
    const usersStrorage = JSON.parse(localStorage.getItem('users_db'))

    const hasUser = usersStrorage?.filter(user => user.email === email)

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2)
        localStorage.setItem('user_token', JSON.stringify({ email, token }))
        setUser({ email, password })
        return

        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        return 'email ou senha incorretos'
      }
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      return 'Usuario não cadastrado'
    }
  }

  const signup = (username, email, password) => {
    const userStorage = JSON.parse(localStorage.getItem('users)db'))

    const hasUser = UsersStorage?.filter(user => user.email === email)

    if (hasUser?.length) {
      return 'Já tem uma conta com esse Email'
    }
    let newUser
    if (userStorage) {
      newUser = [...userStorage, { username, email, password }]
    } else {
      newUser = [{ username, email, password }]
    }
    localStorage.setItem('users_db', JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user_token')
    setIsAuthenticated(false)
  }

  const authContextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={{ user, signed: !!user, authContextValue }}>
      {children}
    </AuthContext.Provider>
  )
}
