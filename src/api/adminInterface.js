import instance from './axios'

//get All User
export const getAllUser = async (argument) => instance.post('/v1/getAllUser',argument)

//delete user 
export const delUser = async (argument) => instance.post('/v1/deleteUser',argument)

//delete product 
export const delProduct = async (argument) => instance.post('/v1/deleteProduct',argument)

//get all product
export const listProductV2 = async () => instance.get('/v3/getAllProduct')

