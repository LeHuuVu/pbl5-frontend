import instance from './axios'

export const login = async () => instance.post('/login')