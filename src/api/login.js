import instance from './axios'
//login v1
export const login = async (argument) => instance.post('/v1/login', argument)

export const register = async (argument) => instance.post('/v1/register',argument)

export const registerV2 = async (argument) => instance.post('/v2/register', argument)

export const registerSeller = async (argument) => instance.post('/v1/registerSeller', argument)