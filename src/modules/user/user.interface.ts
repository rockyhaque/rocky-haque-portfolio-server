export interface IUser {
    name: string
    age?: number
    role: 'user' | 'admin'
    email: string
    password: string
    photoURL?: string | null
    userStatus: 'active' | 'inactive'
    isBlocked: boolean
  }
  