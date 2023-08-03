import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { fetchProducts } from "../store/productSlice";
import { STATUSES } from "../store/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.products);

  // const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAdd = (prod) => {
    dispatch(addToCart(prod));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading...</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something Went Wrong!</h2>;
  }

  return (
    <div className="productsWrapper">
      {data.map((prod) => {
        return (
          <div className="card" key={prod.id}>
            <img src={prod.image} alt="Product" />
            <h4>{prod.title}</h4>
            <h5>{prod.price}</h5>
            <button onClick={() => handleAdd(prod)} className="btn">
              Add To Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
