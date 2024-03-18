import React from "react";
import styled from "styled-components";

const ProductList = styled.div`
  border-top: 1px solid white;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid white;
  padding: 10px 0;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

export default function Cart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  return (
    <div>
      <h1>Mon panier</h1>
      {cart.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <ProductList>
          {cart.map((product) => (
            <Product key={product.id}>
              <ProductImage src={product.image} alt={product.title} />
              <div>{product.title}</div>
              <div>{product.quantity}</div>
              <div>{product.price}</div>
            </Product>
          ))}
        </ProductList>
      )}
    </div>
  );
}