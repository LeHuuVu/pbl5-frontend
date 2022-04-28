import instance from './axios'

export const login = async () => instance.post('/login')

export const register = async () => instance.post('/register')