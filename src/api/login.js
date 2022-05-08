import instance from './axios'
//login v1
export const login = async (argument) => instance.post('/v1/login', argument)

export const register = async () => instance.post('/register')