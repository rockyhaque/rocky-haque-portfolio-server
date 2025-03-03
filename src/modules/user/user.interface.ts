export interface IUser {
    name: string
    age?: number
    role: 'customer' | 'admin'
    email: string
    password: string
    photoURL?: string | null
    userStatus: 'active' | 'inactive'
    isBlocked: boolean
  }
  