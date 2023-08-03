import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const cartProd = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <h3>Cart</h3>
      <div className="cartWrapper">
        {cartProd.map((prod) => {
          return (
            <div className="cartCard" key={prod.id}>
              <img src={prod.image} alt="Prod" />
              <h5>{prod.title}</h5>
              <h5>{prod.price}</h5>
              <button onClick={() => handleRemove(prod.id)} className="btn">
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
