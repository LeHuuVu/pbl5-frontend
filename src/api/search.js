import instance from './axios'

//search
export const listProduct_search = async (argument) => instance.post('/v1/searchProduct',argument)