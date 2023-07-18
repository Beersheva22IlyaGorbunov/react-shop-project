import React from 'react'
import ProductQuantity from '../../model/ProductQuantity';


type Props = {
  cartProducts: ProductQuantity;
}

const OrderForm: React.FC<Props> = ({ cartProducts }) => {
  return (
    <div>OrderForm</div>
  )
}

export default OrderForm