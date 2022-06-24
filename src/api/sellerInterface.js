import instance from './axios'
//get all selling product v1
export const listSellingProduct = async (argument) => instance.post('/v1/getProductByCompany',argument)
//get sellingproduct detail v1
export const sellingproductDetail = async (argument) => instance.post('/v1/getDetailProduct', argument)
//delete Product
export const delSellingProd = async (argument) => instance.post('/v1/deleteProduct',argument)
//create product
export const createProduct = async (argument) => instance.post('/v1/createNewProduct',argument)
//get company
export const Company = async (argument) => instance.post('/v1/getCompany',argument)
