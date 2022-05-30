import instance from './axios'
//
// export const login = async (argument) => instance.post('/v1/login', argument)

// export const register = async () => instance.post('/register')

export const getProfile = async (id) => instance.post('/getProfile'+id)

export const getAvatar = async (id) => instance.post('/getAvatar'+id)