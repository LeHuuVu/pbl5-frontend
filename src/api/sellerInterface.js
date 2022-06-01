import instance from './axios'
//get all selling product v1
export const listSellingProduct = async () => instance.get('/v1/getAllProduct')
//get sellingproduct detail v1
export const sellingproductDetail = async (argument) => instance.post('/v1/getDetailProduct', argument)
//delete Product
export const delSellingProd = async (argument) => instance.post('/v1/delProduct',argument)
//update product
export const updateProduct = async (argument) => instance.post('/v1/delProduct',argument)
