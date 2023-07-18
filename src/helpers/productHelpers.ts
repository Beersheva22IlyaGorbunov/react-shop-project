import ProductQuantity from "../model/ProductQuantity";

export function getProductsPrice(products: ProductQuantity[]): number {
 return products.reduce((accum, item) => (accum += item.price * item.quantity), 0);
}