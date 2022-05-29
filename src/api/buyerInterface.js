import instance from './axios'
//get all product v1
export const listProduct = async () => instance.get('/v1/getAllProduct')
