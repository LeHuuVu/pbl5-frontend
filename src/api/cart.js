import instance from './axios'

//get Order in Cart
export const orderList = async (argument) => instance.post('/v1/getCart',argument)

//add product to cart
export const addProdToCart = async (argument) => instance.post('/v1/addToCart',argument)

//delete product in cart after buy or when click button delete
export const deleteProdFromCart = async (argument) => instance.post('/v1/takeOutFromCart',argument)
